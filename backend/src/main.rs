use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
use std::sync::{Arc, Mutex};

mod db;
mod auth;
mod models;
mod rag;
mod routes;

use rag::RagSystem;
use routes::AppState;
use crate::models::User;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    // Initialize DB
    let pool = db::init_db().await;

    // Seed Admin
    let admin_email = "mdjobayerarafat@gmail.com";
    let admin_exists = sqlx::query("SELECT id FROM users WHERE email = $1")
        .bind(admin_email)
        .fetch_optional(&pool)
        .await
        .unwrap_or(None);

    if admin_exists.is_none() {
        println!("Seeding Admin User...");
        let id = uuid::Uuid::new_v4().to_string();
        let hash = auth::hash_password("Melucifer2022").unwrap();
        sqlx::query(
            "INSERT INTO users (id, username, password_hash, fullname, email, role, email_verified, subscription_end) VALUES ($1, $2, $3, $4, $5, 'admin', TRUE, $6)",
        )
        .bind(id)
        .bind("admin_jobayer")
        .bind(hash)
        .bind("Jobayer Arafat")
        .bind(admin_email)
        .bind(chrono::Utc::now() + chrono::Duration::days(3650))
        .execute(&pool)
        .await
        .expect("Failed to seed admin");
        println!("Admin User Seeded.");
    }

    // Seed Editor User
    let editor_email = "editor@krypton.local";
    let editor_exists = sqlx::query("SELECT id FROM users WHERE email = $1")
        .bind(editor_email)
        .fetch_optional(&pool)
        .await
        .unwrap_or(None);

    if editor_exists.is_none() {
        println!("Seeding Editor User...");
        let id = uuid::Uuid::new_v4().to_string();
        let hash = auth::hash_password("editor123").unwrap();
        sqlx::query(
            "INSERT INTO users (id, username, password_hash, fullname, email, role, email_verified, subscription_end) VALUES ($1, $2, $3, $4, $5, 'editor', TRUE, $6)",
        )
        .bind(id)
        .bind("editor_user")
        .bind(hash)
        .bind("Editor User")
        .bind(editor_email)
        .bind(chrono::Utc::now() + chrono::Duration::days(3650))
        .execute(&pool)
        .await
        .expect("Failed to seed editor");
        println!("Editor User Seeded.");
    }

    // Seed Default AI Models
    let models_count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM ai_models")
        .fetch_one(&pool)
        .await
        .unwrap_or((0,));

    if models_count.0 == 0 {
        println!("Seeding Default AI Models...");
        let models = vec![
            ("nvidia/nemotron-3-nano-30b-a3b:free", "KrytonX"),
            ("arcee-ai/trinity-mini:free", "KryptonY"),
            ("z-ai/glm-4.5-air:free", "Krypton-OSS"),
            ("deepseek/deepseek-r1-0528:free", "Krypton"),
        ];

        for (api_name, display_name) in models {
            let id = uuid::Uuid::new_v4().to_string();
            sqlx::query(
                "INSERT INTO ai_models (id, api_model_name, display_name, provider, is_active) VALUES ($1, $2, $3, 'openrouter', TRUE)"
            )
            .bind(id)
            .bind(api_name)
            .bind(display_name)
            .execute(&pool)
            .await
            .expect("Failed to seed model");
        }
        println!("Default AI Models Seeded.");
    } else {
        // Ensure default models are aligned with current names
        sqlx::query("UPDATE ai_models SET api_model_name = 'nvidia/nemotron-3-nano-30b-a3b:free' WHERE display_name = 'KrytonX'")
            .execute(&pool)
            .await
            .ok();
        sqlx::query("UPDATE ai_models SET api_model_name = 'arcee-ai/trinity-mini:free' WHERE display_name = 'KryptonY'")
            .execute(&pool)
            .await
            .ok();
        sqlx::query("UPDATE ai_models SET api_model_name = 'z-ai/glm-4.5-air:free' WHERE display_name = 'Krypton-OSS'")
            .execute(&pool)
            .await
            .ok();
        sqlx::query("UPDATE ai_models SET api_model_name = 'deepseek/deepseek-r1-0528:free' WHERE display_name = 'Krypton'")
            .execute(&pool)
            .await
            .ok();
    }

    // Initialize RAG System (Load embedding model)
    println!("Initializing RAG System (Loading Embedding Model)...");
    let rag = Arc::new(RagSystem::new(pool.clone()));
    println!("RAG System Initialized.");

    // Seed Knowledge Base Documents
    let docs_count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM documents")
        .fetch_one(&pool)
        .await
        .unwrap_or((0,));

    println!("Current document count: {}", docs_count.0);

    if docs_count.0 == 0 {
        println!("Seeding Knowledge Base Documents...");
        let demo_docs = vec![
            (
                "Krypton Security Policies: All employees must use 2FA. Passwords must be at least 12 characters long and include special characters. Regular security audits are conducted quarterly.",
                serde_json::json!({"category": "Policy", "author": "CISO"})
            ),
            (
                "CTF Challenge #42 Hint: The flag is hidden in the EXIF data of the image. Use 'exiftool' or similar utilities to extract metadata. Look for the 'Comment' field.",
                serde_json::json!({"category": "CTF", "challenge": "42"})
            ),
            (
                "Incident Response Plan: In case of a confirmed breach, immediately isolate the affected system from the network. Do not power off the machine to preserve RAM artifacts. Contact the security team at security@krypton.local.",
                serde_json::json!({"category": "Procedure", "priority": "High"})
            ),
             (
                "Krypton AI Architecture: The system uses a RAG (Retrieval-Augmented Generation) pipeline. Documents are embedded using AllMiniLML6V2 and stored in SQLite. The chat API retrieves relevant chunks before querying the LLM.",
                serde_json::json!({"category": "Technical", "component": "RAG"})
            ),
        ];

        for (content, metadata) in demo_docs {
            match rag.add_document(content, Some(metadata)).await {
                Ok(id) => println!("Seeded document: {}", id),
                Err(e) => eprintln!("Failed to seed document: {}", e),
            }
        }
        println!("Knowledge Base Documents Seeded.");
    }

    // Seed Chat History for Demo
    println!("Seeding Demo Chat History...");
    let admin_user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE email = 'mdjobayerarafat@gmail.com'")
        .fetch_optional(&pool)
        .await
        .unwrap_or(None);

    if let Some(admin) = admin_user {
        // 1. SQL Injection Analysis
        let sql_session = sqlx::query("SELECT id FROM chat_sessions WHERE title = 'SQL Injection Analysis' AND user_id = $1")
            .bind(&admin.id)
            .fetch_optional(&pool)
            .await
            .unwrap_or(None);
        
        if sql_session.is_none() {
             let sid = uuid::Uuid::new_v4().to_string();
             sqlx::query("INSERT INTO chat_sessions (id, user_id, title) VALUES ($1, $2, 'SQL Injection Analysis')")
                .bind(&sid)
                .bind(&admin.id)
                .execute(&pool)
                .await
                .ok();
            
            // Add messages
            sqlx::query("INSERT INTO chat_messages (id, session_id, role, content) VALUES ($1, $2, 'user', 'Can you explain how SQL injection works?')")
                .bind(uuid::Uuid::new_v4().to_string())
                .bind(&sid)
                .execute(&pool)
                .await.ok();
            
            sqlx::query("INSERT INTO chat_messages (id, session_id, role, content) VALUES ($1, $2, 'assistant', 'SQL injection is a code injection technique...')")
                .bind(uuid::Uuid::new_v4().to_string())
                .bind(&sid)
                .execute(&pool)
                .await.ok();
        }

        // 2. CTF Challenge #42
        let ctf_session = sqlx::query("SELECT id FROM chat_sessions WHERE title = 'CTF Challenge #42' AND user_id = $1")
            .bind(&admin.id)
            .fetch_optional(&pool)
            .await
            .unwrap_or(None);
        
        if ctf_session.is_none() {
             let sid = uuid::Uuid::new_v4().to_string();
             sqlx::query("INSERT INTO chat_sessions (id, user_id, title) VALUES ($1, $2, 'CTF Challenge #42')")
                .bind(&sid)
                .bind(&admin.id)
                .execute(&pool)
                .await
                .ok();
            
            // Add messages
            sqlx::query("INSERT INTO chat_messages (id, session_id, role, content) VALUES ($1, $2, 'user', 'I need help with this binary exploitation challenge.')")
                .bind(uuid::Uuid::new_v4().to_string())
                .bind(&sid)
                .execute(&pool)
                .await.ok();
             
             sqlx::query("INSERT INTO chat_messages (id, session_id, role, content) VALUES ($1, $2, 'assistant', 'Sure, let\'s analyze the binary. What protection mechanisms are enabled?')")
                .bind(uuid::Uuid::new_v4().to_string())
                .bind(&sid)
                .execute(&pool)
                .await.ok();
        }
    }
    println!("Demo Chat History Seeded.");

    let client = reqwest::Client::new();
    let import_status = Arc::new(Mutex::new(models::ImportStatus::default()));
    let app_state = web::Data::new(AppState {
        rag,
        client,
        import_status,
    });

    println!("Starting server at http://0.0.0.0:8080");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .app_data(web::JsonConfig::default().limit(250 * 1024 * 1024)) // 250MB limit for JSON
            .app_data(web::PayloadConfig::new(1024 * 1024 * 1024)) // 1GB limit for Payload (Multipart)
            .service(routes::health_check)
            .service(routes::register)
            .service(routes::login)
            .service(routes::verify_email)
            .service(routes::verify_email_query)
            .service(routes::upload_data)
            .service(routes::list_documents)
            .service(routes::update_document)
            .service(routes::delete_document)
            .service(routes::chat)
            .service(routes::list_chat_sessions)
            .service(routes::get_chat_session)
            .service(routes::delete_chat_session)
            .service(routes::get_profile)
            .service(routes::list_users)
            .service(routes::update_user_role)
            .service(routes::generate_voucher)
            .service(routes::list_vouchers)
            .service(routes::redeem_voucher)
            .service(routes::apply_voucher_request)
            .service(routes::list_voucher_requests)
            .service(routes::approve_voucher_request)
            .service(routes::admin_redeem_voucher_for_user)
            .service(routes::list_models)
            .service(routes::admin_list_models)
            .service(routes::add_model)
            .service(routes::update_model)
            .service(routes::delete_model)
            // Knowledge Base
            .service(routes::upload_file)
            .service(routes::get_import_status)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
