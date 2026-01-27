use fastembed::{EmbeddingModel, InitOptions, TextEmbedding};
use sqlx::Row;
use crate::db::DbPool;
use crate::models::RAGChunk;
use pgvector::Vector;

pub struct RagSystem {
    model: Option<TextEmbedding>,
    pub pool: DbPool,
}

use std::path::PathBuf;

impl RagSystem {
    pub fn new(pool: DbPool) -> Self {
        println!("Initializing RAG System...");
        
        let model = Self::try_init_embedding_model();
        
        match &model {
            Some(_) => println!("✅ RAG System initialized with embedding model"),
            None => println!("⚠️  RAG System initialized without embedding model (search will use basic text matching)"),
        }

        Self { model, pool }
    }

    fn try_init_embedding_model() -> Option<TextEmbedding> {
        // Try to initialize the embedding model, but don't fail if it doesn't work
        let mut options = InitOptions::default();
        options.model_name = EmbeddingModel::AllMiniLML6V2;
        options.show_download_progress = false; // Disable progress to avoid issues

        // Check for pre-downloaded cache
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

        match TextEmbedding::try_new(options) {
            Ok(model) => {
                println!("Successfully loaded embedding model");
                Some(model)
            }
            Err(e) => {
                eprintln!("Failed to load embedding model: {}", e);
                eprintln!("Continuing without embedding model - will use basic text search");
                None
            }
        }
    }

    pub async fn add_document(&self, content: &str, metadata: Option<serde_json::Value>) -> Result<String, Box<dyn std::error::Error>> {
        let id = uuid::Uuid::new_v4().to_string();
        let metadata_str = metadata.map(|m| m.to_string());

        if let Some(model) = &self.model {
            // Use embedding model if available
            let documents = vec![content.to_string()];
            let embeddings = model.embed(documents, None)?;
            let embedding = Vector::from(embeddings[0].clone());

            sqlx::query(
                "INSERT INTO documents (id, content, metadata, embedding) VALUES ($1, $2, $3, $4)",
            )
            .bind(&id)
            .bind(content)
            .bind(metadata_str)
            .bind(embedding)
            .execute(&self.pool)
            .await?;
        } else {
            // Fallback: store without embedding (use zero vector)
            let zero_embedding = Vector::from(vec![0.0; 384]); // 384 dimensions for AllMiniLML6V2

            sqlx::query(
                "INSERT INTO documents (id, content, metadata, embedding) VALUES ($1, $2, $3, $4)",
            )
            .bind(&id)
            .bind(content)
            .bind(metadata_str)
            .bind(zero_embedding)
            .execute(&self.pool)
            .await?;
        }

        Ok(id)
    }

    pub async fn search(&self, query: &str, limit: usize) -> Result<Vec<RAGChunk>, Box<dyn std::error::Error>> {
        if let Some(model) = &self.model {
            // Use embedding-based search if model is available
            let query_embedding = model.embed(vec![query.to_string()], None)?;
            let query_vec = Vector::from(query_embedding[0].clone());

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
        } else {
            // Fallback: use basic text search
            let search_pattern = format!("%{}%", query.to_lowercase());
            let rows = sqlx::query(
                "SELECT id, content, 0.5 as score FROM documents WHERE LOWER(content) LIKE $1 LIMIT $2"
            )
            .bind(search_pattern)
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
        let metadata_str = metadata.map(|m| m.to_string());

        if let Some(model) = &self.model {
            // Use embedding model if available
            let documents = vec![content.to_string()];
            let embeddings = model.embed(documents, None)?;
            let embedding = Vector::from(embeddings[0].clone());

            sqlx::query(
                "UPDATE documents SET content = $1, metadata = $2, embedding = $3 WHERE id = $4"
            )
            .bind(content)
            .bind(metadata_str)
            .bind(embedding)
            .bind(id)
            .execute(&self.pool)
            .await?;
        } else {
            // Fallback: update without changing embedding
            let zero_embedding = Vector::from(vec![0.0; 384]);

            sqlx::query(
                "UPDATE documents SET content = $1, metadata = $2, embedding = $3 WHERE id = $4"
            )
            .bind(content)
            .bind(metadata_str)
            .bind(zero_embedding)
            .bind(id)
            .execute(&self.pool)
            .await?;
        }

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
