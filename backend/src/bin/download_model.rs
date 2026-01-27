use fastembed::{EmbeddingModel, InitOptions, TextEmbedding};
use std::path::PathBuf;

fn main() {
    println!("Downloading embedding model...");
    let cache_dir = PathBuf::from("fastembed_cache");
    
    // Ensure directory exists
    if !cache_dir.exists() {
        std::fs::create_dir_all(&cache_dir).expect("Failed to create cache dir");
    }

    let mut options = InitOptions::default();
    options.model_name = EmbeddingModel::AllMiniLML6V2;
    options.show_download_progress = true;
    options.cache_dir = cache_dir.clone();
    
    // Trigger download
    let _ = TextEmbedding::try_new(options).expect("Failed to download model");
    println!("Model downloaded successfully to {:?}", cache_dir.canonicalize().unwrap());
}
