use serde::{Deserialize, Serialize};
use pgvector::Vector;

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct Document {
    pub id: String,
    pub content: String,
    pub metadata: Option<String>,
    #[serde(skip, default = "default_vector")]
    pub embedding: Vector,
}

#[derive(Debug, serde::Serialize, Clone)]
pub struct ImportStatus {
    pub total_documents: usize,
    pub processed_documents: usize,
    pub errors: usize,
    pub is_processing: bool,
    pub current_file: String,
    pub message: String,
}

impl Default for ImportStatus {
    fn default() -> Self {
        Self {
            total_documents: 0,
            processed_documents: 0,
            errors: 0,
            is_processing: false,
            current_file: String::new(),
            message: String::new(),
        }
    }
}

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct DocumentSummary {
    pub id: String,
    pub content: String,
    pub metadata: Option<String>,
}

fn default_vector() -> Vector {
    Vector::from(vec![])
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateDocumentRequest {
    pub content: String,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ChatRequest {
    pub message: String,
    pub history: Option<Vec<Message>>,
    pub model: Option<String>,
    pub session_id: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone, sqlx::FromRow)]
pub struct Message {
    pub role: String,
    pub content: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ChatResponse {
    pub response: String,
    pub session_id: String,
}

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct ChatSession {
    pub id: String,
    pub user_id: String,
    pub title: Option<String>,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct ChatMessage {
    pub id: String,
    pub session_id: String,
    pub role: String,
    pub content: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RAGChunk {
    pub id: String,
    pub content: String,
    pub score: f32,
}

// Auth Models

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub username: String,
    pub fullname: Option<String>,
    pub email: Option<String>,
    #[serde(skip)]
    pub password_hash: String,
    pub role: String,
    pub email_verified: bool,
    pub subscription_end: Option<chrono::NaiveDateTime>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegisterRequest {
    pub username: String,
    pub password: String,
    pub fullname: String,
    pub email: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthResponse {
    pub token: String,
    pub username: String,
    pub role: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VerifyEmailRequest {
    pub token: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VoucherGenerateRequest {
    pub duration_days: i32,
    pub max_uses: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct Voucher {
    pub id: String,
    pub code: String,
    pub duration_days: i32,
    pub max_uses: i32,
    pub current_uses: i32,
    pub created_by: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct VoucherRequest {
    pub id: String,
    pub user_id: String,
    pub message: Option<String>,
    pub status: String,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VoucherRedeemRequest {
    pub code: String,
}

#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
pub struct AIModel {
    pub id: String,
    pub api_model_name: String,
    pub display_name: String,
    pub provider: String,
    pub is_active: bool,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub system_prompt: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateAIModelRequest {
    pub api_model_name: String,
    pub display_name: String,
    pub provider: Option<String>,
    pub system_prompt: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateAIModelRequest {
    pub api_model_name: Option<String>,
    pub display_name: Option<String>,
    pub provider: Option<String>,
    pub is_active: Option<bool>,
    pub system_prompt: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub username: String,
    pub role: String,
    pub exp: usize,
}
