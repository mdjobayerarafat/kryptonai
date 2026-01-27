use fastembed::{EmbeddingModel, InitOptions, TextEmbedding};
use sqlx::Row;
use crate::db::DbPool;
use crate::models::RAGChunk;
use pgvector::Vector;

pub struct RagSystem {
    model: TextEmbedding,
    pub pool: DbPool,
}

use std::path::PathBuf;

impl RagSystem {
    pub fn new(pool: DbPool) -> Self {
        let mut options = InitOptions::default();
        options.model_name = EmbeddingModel::AllMiniLML6V2;
        options.show_download_progress = true;

        // Check for pre-downloaded cache in Docker or local
        let docker_cache = PathBuf::from("/app/fastembed_cache");
        let local_cache = PathBuf::from(".fastembed_cache");
        let local_cache_alt = PathBuf::from("fastembed_cache");

        if docker_cache.exists() {
            println!("Using pre-downloaded model cache at {:?}", docker_cache);
            options.cache_dir = docker_cache;
        } else if local_cache.exists() {
            println!("Using local model cache at {:?}", local_cache);
            options.cache_dir = local_cache;
        } else if local_cache_alt.exists() {
            println!("Using local model cache at {:?}", local_cache_alt);
            options.cache_dir = local_cache_alt;
        }

        let model = TextEmbedding::try_new(options)
        .expect("Failed to load embedding model");

        Self { model, pool }
    }

    pub async fn add_document(&self, content: &str, metadata: Option<serde_json::Value>) -> Result<String, Box<dyn std::error::Error>> {
        let documents = vec![content.to_string()];
        let embeddings = self.model.embed(documents, None)?;
        let embedding = Vector::from(embeddings[0].clone());

        let id = uuid::Uuid::new_v4().to_string();
        let metadata_str = metadata.map(|m| m.to_string());

        sqlx::query(
            "INSERT INTO documents (id, content, metadata, embedding) VALUES ($1, $2, $3, $4)",
        )
        .bind(&id)
        .bind(content)
        .bind(metadata_str)
        .bind(embedding)
        .execute(&self.pool)
        .await?;

        Ok(id)
    }

    pub async fn search(&self, query: &str, limit: usize) -> Result<Vec<RAGChunk>, Box<dyn std::error::Error>> {
        let query_embedding = self.model.embed(vec![query.to_string()], None)?;
        let query_vec = Vector::from(query_embedding[0].clone());

        // Use pgvector cosine distance operator <=>
        // Distance is 0 to 2. Similarity is roughly 1 - distance (for normalized vectors).
        let rows = sqlx::query(
            "SELECT id, content, 1 - (embedding <=> $1) as score FROM documents ORDER BY embedding <=> $1 LIMIT $2"
        )
        .bind(query_vec)
        .bind(limit as i64)
        .fetch_all(&self.pool)
        .await?;

        let chunks: Vec<RAGChunk> = rows
            .into_iter()
            .map(|row| {
                let id: String = row.get("id");
                let content: String = row.get("content");
                let score: f64 = row.get("score"); 
                RAGChunk { id, content, score: score as f32 }
            })
            .collect();

        Ok(chunks)
    }

    pub async fn list_documents(&self) -> Result<Vec<crate::models::Document>, Box<dyn std::error::Error>> {
        let rows = sqlx::query_as::<_, crate::models::Document>(
            "SELECT id, content, metadata, embedding FROM documents ORDER BY id DESC"
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(rows)
    }

    pub async fn update_document(&self, id: &str, content: &str, metadata: Option<serde_json::Value>) -> Result<(), Box<dyn std::error::Error>> {
        let documents = vec![content.to_string()];
        let embeddings = self.model.embed(documents, None)?;
        let embedding = Vector::from(embeddings[0].clone());
        let metadata_str = metadata.map(|m| m.to_string());

        sqlx::query(
            "UPDATE documents SET content = $1, metadata = $2, embedding = $3 WHERE id = $4"
        )
        .bind(content)
        .bind(metadata_str)
        .bind(embedding)
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    pub async fn delete_document(&self, id: &str) -> Result<(), Box<dyn std::error::Error>> {
        sqlx::query("DELETE FROM documents WHERE id = $1")
            .bind(id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
