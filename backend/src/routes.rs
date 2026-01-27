use actix_web::{get, post, put, delete, web, HttpResponse, Responder};
use actix_multipart::Multipart;
use futures::{StreamExt, TryStreamExt};
use std::io::Write;
use serde_json::json;
use crate::models::{
    ChatRequest, CreateDocumentRequest, ChatResponse, RegisterRequest, LoginRequest, AuthResponse, User,
    VoucherGenerateRequest, VoucherRedeemRequest, Voucher, AIModel, CreateAIModelRequest, UpdateAIModelRequest,
    ChatSession, ChatMessage
};
use crate::rag::RagSystem;
use crate::auth::{self, AuthenticatedUser};
use std::sync::Arc;
use chrono::{Utc, Duration};
use uuid::Uuid;

pub struct AppState {
    pub rag: Arc<RagSystem>,
    pub client: reqwest::Client,
}

#[get("/health")]
async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(json!({"status": "ok"}))
}

#[post("/api/auth/register")]
async fn register(
    state: web::Data<AppState>,
    body: web::Json<RegisterRequest>,
) -> impl Responder {
    let id = uuid::Uuid::new_v4().to_string();
    let hash = match auth::hash_password(&body.password) {
        Ok(h) => h,
        Err(_) => return HttpResponse::InternalServerError().json(json!({"error": "Hashing failed"})),
    };

    let result = sqlx::query(
        "INSERT INTO users (id, username, password_hash, fullname, email, role) VALUES ($1, $2, $3, $4, $5, 'user')",
    )
    .bind(&id)
    .bind(&body.username)
    .bind(&hash)
    .bind(&body.fullname)
    .bind(&body.email)
    .execute(&state.rag.pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({"message": "User registered successfully"})),
        Err(_) => HttpResponse::BadRequest().json(json!({"error": "Username or email already exists"})),
    }
}

#[post("/api/auth/login")]
async fn login(
    state: web::Data<AppState>,
    body: web::Json<LoginRequest>,
) -> impl Responder {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE username = $1 OR email = $2")
        .bind(&body.username)
        .bind(&body.username)
        .fetch_optional(&state.rag.pool)
        .await;

    match user {
        Ok(Some(user)) => {
            if auth::verify_password(&body.password, &user.password_hash) {
                let token = match auth::create_jwt(&user.id, &user.username, &user.role) {
                    Ok(t) => t,
                    Err(_) => return HttpResponse::InternalServerError().json(json!({"error": "Token creation failed"})),
                };
                HttpResponse::Ok().json(AuthResponse {
                    token,
                    username: user.username,
                    role: user.role,
                })
            } else {
                HttpResponse::Unauthorized().json(json!({"error": "Invalid credentials"}))
            }
        },
        Ok(None) => HttpResponse::Unauthorized().json(json!({"error": "Invalid credentials"})),
        Err(_) => HttpResponse::InternalServerError().json(json!({"error": "Database error"})),
    }
}

#[get("/api/profile")]
async fn get_profile(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
) -> impl Responder {
    let user_data = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(&user.id)
        .fetch_optional(&state.rag.pool)
        .await;

    match user_data {
        Ok(Some(u)) => HttpResponse::Ok().json(u),
        Ok(None) => HttpResponse::NotFound().json(json!({"error": "User not found"})),
        Err(_) => HttpResponse::InternalServerError().json(json!({"error": "Database error"})),
    }
}

#[get("/api/admin/users")]
async fn list_users(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
) -> impl Responder {
    if user.role != "admin" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin access required"}));
    }

    let users = sqlx::query_as::<_, User>("SELECT * FROM users")
        .fetch_all(&state.rag.pool)
        .await;

    match users {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_) => HttpResponse::InternalServerError().json(json!({"error": "Database error"})),
    }
}

#[post("/api/admin/users/{id}/role")]
async fn update_user_role(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    path: web::Path<String>,
    body: web::Json<serde_json::Value>,
) -> impl Responder {
    if user.role != "admin" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin access required"}));
    }

    let user_id = path.into_inner();
    let new_role = body["role"].as_str().unwrap_or("user");

    let result = sqlx::query("UPDATE users SET role = $1 WHERE id = $2")
        .bind(new_role)
        .bind(user_id)
        .execute(&state.rag.pool)
        .await;

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({"message": "User role updated"})),
        Err(_) => HttpResponse::InternalServerError().json(json!({"error": "Database error"})),
    }
}

#[post("/api/vouchers/generate")]
async fn generate_voucher(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    body: web::Json<VoucherGenerateRequest>,
) -> impl Responder {
    if user.role != "admin" && user.role != "editor" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin or Editor access required"}));
    }

    let code = uuid::Uuid::new_v4().to_string()[..8].to_uppercase();
    let id = uuid::Uuid::new_v4().to_string();
    let max_uses = body.max_uses.unwrap_or(1);

    let result = sqlx::query(
        "INSERT INTO vouchers (id, code, duration_days, max_uses, current_uses, created_by) VALUES ($1, $2, $3, $4, 0, $5)",
    )
    .bind(&id)
    .bind(&code)
    .bind(body.duration_days)
    .bind(max_uses)
    .bind(&user.username)
    .execute(&state.rag.pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({ "code": code, "message": "Voucher generated", "max_uses": max_uses })),
        Err(_) => HttpResponse::InternalServerError().json(json!({"error": "Failed to generate voucher"})),
    }
}

#[get("/api/vouchers")]
async fn list_vouchers(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
) -> impl Responder {
    if user.role != "admin" && user.role != "editor" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin or Editor access required"}));
    }

    let vouchers = sqlx::query_as::<_, Voucher>("SELECT * FROM vouchers ORDER BY created_at DESC")
        .fetch_all(&state.rag.pool)
        .await;

    match vouchers {
        Ok(v) => HttpResponse::Ok().json(v),
        Err(_) => HttpResponse::InternalServerError().json(json!({"error": "Database error"})),
    }
}

#[post("/api/vouchers/redeem")]
async fn redeem_voucher(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    body: web::Json<VoucherRedeemRequest>,
) -> impl Responder {
    let voucher = sqlx::query_as::<_, Voucher>("SELECT * FROM vouchers WHERE code = $1")
        .bind(&body.code)
        .fetch_optional(&state.rag.pool)
        .await;

    match voucher {
        Ok(Some(v)) => {
            // Check limits
            if v.current_uses >= v.max_uses {
                return HttpResponse::BadRequest().json(json!({"error": "Voucher has reached its maximum usage limit"}));
            }

            // Check if user already used this voucher
            let usage_check = sqlx::query("SELECT 1 FROM voucher_usages WHERE voucher_id = $1 AND user_id = $2")
                .bind(&v.id)
                .bind(&user.id)
                .fetch_optional(&state.rag.pool)
                .await;

            if let Ok(Some(_)) = usage_check {
                return HttpResponse::BadRequest().json(json!({"error": "You have already redeemed this voucher"}));
            }

            // Mark voucher as used (increment count)
            let _ = sqlx::query("UPDATE vouchers SET current_uses = current_uses + 1 WHERE id = $1")
                .bind(&v.id)
                .execute(&state.rag.pool)
                .await;
            
            // Record usage
            let usage_id = uuid::Uuid::new_v4().to_string();
            let _ = sqlx::query("INSERT INTO voucher_usages (id, voucher_id, user_id) VALUES ($1, $2, $3)")
                .bind(usage_id)
                .bind(&v.id)
                .bind(&user.id)
                .execute(&state.rag.pool)
                .await;

            // Update user subscription
            // If user already has sub, add to it? Or just set from now?
            // Simple logic: Set from now + duration
            let new_end_date = Utc::now().naive_utc() + Duration::days(v.duration_days as i64);

            let _ = sqlx::query("UPDATE users SET subscription_end = $1 WHERE id = $2")
                .bind(new_end_date)
                .bind(&user.id)
                .execute(&state.rag.pool)
                .await;

            HttpResponse::Ok().json(json!({"message": format!("Voucher redeemed! Subscription extended by {} days.", v.duration_days)}))
        },
        Ok(None) => HttpResponse::BadRequest().json(json!({"error": "Invalid voucher code"})),
        Err(_) => HttpResponse::InternalServerError().json(json!({"error": "Database error"})),
    }
}

#[post("/api/admin/upload")]
async fn upload_data(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    body: web::Json<Vec<CreateDocumentRequest>>,
) -> impl Responder {
    if user.role != "admin" && user.role != "editor" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin or Editor access required"}));
    }

    let mut count = 0;
    for doc in body.iter() {
        let _ = state.rag.add_document(&doc.content, doc.metadata.clone()).await;
        count += 1;
    }
    HttpResponse::Ok().json(json!({"message": format!("Indexed {} documents", count)}))
}

#[get("/api/admin/documents")]
pub async fn list_documents(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
) -> impl Responder {
    if user.role != "admin" && user.role != "editor" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin or Editor access required"}));
    }

    match state.rag.list_documents().await {
        Ok(docs) => HttpResponse::Ok().json(docs),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[put("/api/admin/documents/{id}")]
pub async fn update_document(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    path: web::Path<String>,
    body: web::Json<CreateDocumentRequest>,
) -> impl Responder {
    if user.role != "admin" && user.role != "editor" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin or Editor access required"}));
    }

    let id = path.into_inner();
    match state.rag.update_document(&id, &body.content, body.metadata.clone()).await {
        Ok(_) => HttpResponse::Ok().json(json!({"message": "Document updated"})),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[delete("/api/admin/documents/{id}")]
pub async fn delete_document(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    path: web::Path<String>,
) -> impl Responder {
    if user.role != "admin" && user.role != "editor" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin or Editor access required"}));
    }

    let id = path.into_inner();
    match state.rag.delete_document(&id).await {
        Ok(_) => HttpResponse::Ok().json(json!({"message": "Document deleted"})),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[post("/api/chat")]
async fn chat(
    user: AuthenticatedUser, // Require authentication
    state: web::Data<AppState>,
    body: web::Json<ChatRequest>,
) -> impl Responder {
    // Check subscription
    let user_db = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(&user.id)
        .fetch_optional(&state.rag.pool)
        .await;

    if let Ok(Some(u)) = user_db {
        if let Some(sub_end) = u.subscription_end {
            if sub_end < Utc::now().naive_utc() {
                 return HttpResponse::PaymentRequired().json(json!({"error": "Subscription expired. Please redeem a voucher."}));
            }
        } else {
             // No subscription
             return HttpResponse::PaymentRequired().json(json!({"error": "Subscription required. Please redeem a voucher."}));
        }
    } else {
         return HttpResponse::Unauthorized().json(json!({"error": "User not found"}));
    }

    // 1. Search RAG
    let relevant_chunks = match state.rag.search(&body.message, 3).await {
        Ok(chunks) => chunks,
        Err(e) => return HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    };

    let context = relevant_chunks
        .iter()
        .map(|c| c.content.clone())
        .collect::<Vec<String>>()
        .join("\n\n");

    // 2. Prepare Session
    let session_id = if let Some(sid) = &body.session_id {
        // Verify session belongs to user
        let session_check = sqlx::query("SELECT 1 FROM chat_sessions WHERE id = $1 AND user_id = $2")
            .bind(sid)
            .bind(&user.id)
            .fetch_optional(&state.rag.pool)
            .await;
        
        if let Ok(Some(_)) = session_check {
            sid.clone()
        } else {
             // If invalid session ID, return error
             return HttpResponse::BadRequest().json(json!({"error": "Invalid session ID"}));
        }
    } else {
        // Create new session
        let new_sid = Uuid::new_v4().to_string();
        // Use first few words of message as title (truncated)
        let title: String = body.message.chars().take(30).collect();
        let _ = sqlx::query("INSERT INTO chat_sessions (id, user_id, title) VALUES ($1, $2, $3)")
            .bind(&new_sid)
            .bind(&user.id)
            .bind(&title)
            .execute(&state.rag.pool)
            .await;
        new_sid
    };

    // 3. Save User Message
    let user_msg_id = Uuid::new_v4().to_string();
    let _ = sqlx::query("INSERT INTO chat_messages (id, session_id, role, content) VALUES ($1, $2, 'user', $3)")
        .bind(&user_msg_id)
        .bind(&session_id)
        .bind(&body.message)
        .execute(&state.rag.pool)
        .await;

    // 4. Load History from DB (to ensure context is correct)
    let db_history = sqlx::query_as::<_, ChatMessage>("SELECT * FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC")
        .bind(&session_id)
        .fetch_all(&state.rag.pool)
        .await
        .unwrap_or_default();

    // 5. Prepare OpenRouter Request
    let api_key = std::env::var("OPENROUTER_API_KEY").unwrap_or_default();
    if api_key.is_empty() {
        return HttpResponse::InternalServerError().json(json!({"error": "OpenRouter API Key not set"}));
    }

    let system_prompt = format!(
        "You are Krypton, an elite Cybersecurity Mentor and CTF Specialist designed to guide users through complex security challenges and ethical hacking scenarios.

        ## CORE OBJECTIVES
        1. **Solve CTF Challenges**: Provide step-by-step reasoning for Web, Crypto, Pwn, Reverse Engineering, Forensics, and OSINT challenges.
        2. **Educational Deep Dives**: Explain *why* a vulnerability exists, not just how to exploit it.
        3. **Ethical Compliance**: STRICTLY refuse requests for illegal acts (black hat hacking, unauthorized access). Pivot immediately to defense and educational concepts.

        ## CTF METHODOLOGY GUIDELINES
        - **Web**: Analyze headers, source code, cookies, and input fields. Look for SQLi, XSS, IDOR, SSRF. Suggest tools like Burp Suite, OWASP ZAP.
        - **Cryptography**: Identify encoding (Base64, Hex), hashing (MD5, SHA), or encryption (RSA, AES). Look for key leakage or weak math.
        - **Forensics**: Analyze file headers (magic bytes), metadata (exiftool), and hidden streams. Suggest Wireshark for pcap analysis.
        - **Reverse Engineering**: Discuss static analysis (Ghidra/IDA) and dynamic analysis (GDB/x64dbg). Look for buffer overflows and logic gates.
        - **Pwn**: Check for binary protections (NX, ASLR, Canary). Explain ROP chains and shellcode injection.

        ## KNOWLEDGE BASE CONTEXT
        Use the following retrieved context to augment your answers. If the context contains the specific flag or solution, use it to guide the user without just giving the answer immediately unless asked.
        
        [CONTEXT BEGIN]
        {}
        [CONTEXT END]

        ## RESPONSE FORMAT
        - **Analysis**: Start with a high-level analysis of the problem.
        - **Tools**: List recommended tools (e.g., `nmap`, `sqlmap`, `python`).
        - **Steps**: Numbered, actionable steps to solve the challenge.
        - **Code**: Provide Python scripts or shell commands in code blocks.
        - **Remediation**: (If applicable) How to patch the vulnerability.

        ## TONE & STYLE
        - Be technical but clear.
        - Use markdown extensively (bolding key terms, code blocks).
        - If the user provides a flag format (e.g., `CTF{{...}}`), help them find the string matching that pattern.
        - If context is missing, rely on your extensive general cybersecurity knowledge.",
        context
    );

    let mut messages = vec![
        json!({"role": "system", "content": system_prompt})
    ];

    for msg in db_history {
        messages.push(json!({"role": msg.role, "content": msg.content}));
    }
    // No need to push body.message again as it's in db_history

    let model = body.model.clone().unwrap_or_else(|| "deepseek/deepseek-r1-0528:free".to_string());

    let request_body = json!({
        "model": model,
        "messages": messages,
        "max_tokens": 80000
    });
    
    println!("Sending request to OpenRouter: Model: {}", model);

    let res = state.client
        .post("https://openrouter.ai/api/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .header("HTTP-Referer", "https://github.com/Krypton-OSS/KryptonSecAI") // Updated to generic URL for cross-device compatibility
        .header("X-Title", "KryptonSecAI")
        .json(&request_body)
        .send()
        .await;

    match res {
        Ok(response) => {
            if response.status().is_success() {
                let json_resp: serde_json::Value = response.json().await.unwrap_or(json!({}));
                let content = json_resp["choices"][0]["message"]["content"]
                    .as_str()
                    .unwrap_or("No response from AI")
                    .to_string();
                
                // Save AI response
                let ai_msg_id = Uuid::new_v4().to_string();
                let _ = sqlx::query("INSERT INTO chat_messages (id, session_id, role, content) VALUES ($1, $2, 'assistant', $3)")
                    .bind(&ai_msg_id)
                    .bind(&session_id)
                    .bind(&content)
                    .execute(&state.rag.pool)
                    .await;
                
                // Update session updated_at
                let _ = sqlx::query("UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = $1")
                    .bind(&session_id)
                    .execute(&state.rag.pool)
                    .await;
                
                HttpResponse::Ok().json(ChatResponse { response: content, session_id })
            } else {
                let status = response.status();
                let error_text = response.text().await.unwrap_or_default();
                println!("OpenRouter Error: Status: {}, Body: {}", status, error_text);
                HttpResponse::BadRequest().json(json!({"error": "Provider Error", "details": error_text}))
            }
        }
        Err(e) => {
            println!("OpenRouter Request Failed: {}", e);
            HttpResponse::InternalServerError().json(json!({"error": e.to_string()}))
        },
    }
}

// Chat History Endpoints

#[get("/api/chat/history")]
async fn list_chat_sessions(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
) -> impl Responder {
    let sessions = sqlx::query_as::<_, ChatSession>("SELECT * FROM chat_sessions WHERE user_id = $1 ORDER BY updated_at DESC")
        .bind(&user.id)
        .fetch_all(&state.rag.pool)
        .await;
    
    match sessions {
        Ok(s) => HttpResponse::Ok().json(s),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[get("/api/chat/history/{id}")]
async fn get_chat_session(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    path: web::Path<String>,
) -> impl Responder {
    let session_id = path.into_inner();
    
    // Check ownership
    let session_check = sqlx::query("SELECT 1 FROM chat_sessions WHERE id = $1 AND user_id = $2")
        .bind(&session_id)
        .bind(&user.id)
        .fetch_optional(&state.rag.pool)
        .await;

    if let Ok(Some(_)) = session_check {
        let messages = sqlx::query_as::<_, ChatMessage>("SELECT * FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC")
            .bind(&session_id)
            .fetch_all(&state.rag.pool)
            .await;
        
        match messages {
            Ok(m) => HttpResponse::Ok().json(m),
            Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
        }
    } else {
        HttpResponse::NotFound().json(json!({"error": "Session not found or access denied"}))
    }
}

#[delete("/api/chat/history/{id}")]
async fn delete_chat_session(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    path: web::Path<String>,
) -> impl Responder {
    let session_id = path.into_inner();
    
    // Check ownership
    let session_check = sqlx::query("SELECT 1 FROM chat_sessions WHERE id = $1 AND user_id = $2")
        .bind(&session_id)
        .bind(&user.id)
        .fetch_optional(&state.rag.pool)
        .await;

    if let Ok(Some(_)) = session_check {
        // Delete session (messages cascade delete)
        let result = sqlx::query("DELETE FROM chat_sessions WHERE id = $1")
            .bind(&session_id)
            .execute(&state.rag.pool)
            .await;
        
        match result {
            Ok(_) => HttpResponse::Ok().json(json!({"message": "Session deleted"})),
            Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
        }
    } else {
        HttpResponse::NotFound().json(json!({"error": "Session not found or access denied"}))
    }
}


// AI Model Management Endpoints

#[get("/api/models")]
async fn list_models(state: web::Data<AppState>) -> impl Responder {
    let models = sqlx::query_as::<_, AIModel>("SELECT * FROM ai_models WHERE is_active = TRUE ORDER BY display_name ASC")
        .fetch_all(&state.rag.pool)
        .await;

    match models {
        Ok(models) => HttpResponse::Ok().json(models),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[get("/api/admin/models")]
async fn admin_list_models(user: AuthenticatedUser, state: web::Data<AppState>) -> impl Responder {
    if user.role != "admin" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin access required"}));
    }

    let models = sqlx::query_as::<_, AIModel>("SELECT * FROM ai_models ORDER BY created_at DESC")
        .fetch_all(&state.rag.pool)
        .await;

    match models {
        Ok(models) => HttpResponse::Ok().json(models),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[post("/api/admin/models")]
async fn add_model(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    body: web::Json<CreateAIModelRequest>,
) -> impl Responder {
    if user.role != "admin" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin access required"}));
    }

    let id = Uuid::new_v4().to_string();
    let provider = body.provider.clone().unwrap_or_else(|| "openrouter".to_string());

    let result = sqlx::query(
        "INSERT INTO ai_models (id, api_model_name, display_name, provider) VALUES ($1, $2, $3, $4)",
    )
    .bind(&id)
    .bind(&body.api_model_name)
    .bind(&body.display_name)
    .bind(&provider)
    .execute(&state.rag.pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Created().json(json!({"id": id, "message": "Model added successfully"})),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[put("/api/admin/models/{id}")]
async fn update_model(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    path: web::Path<String>,
    body: web::Json<UpdateAIModelRequest>,
) -> impl Responder {
    if user.role != "admin" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin access required"}));
    }

    let id = path.into_inner();
    
    // Fetch existing model first
    let existing_model = sqlx::query_as::<_, AIModel>("SELECT * FROM ai_models WHERE id = $1")
        .bind(&id)
        .fetch_optional(&state.rag.pool)
        .await;

    match existing_model {
        Ok(Some(mut model)) => {
            if let Some(name) = &body.api_model_name { model.api_model_name = name.clone(); }
            if let Some(display) = &body.display_name { model.display_name = display.clone(); }
            if let Some(prov) = &body.provider { model.provider = prov.clone(); }
            if let Some(active) = body.is_active { model.is_active = active; }

            let update_result = sqlx::query(
                "UPDATE ai_models SET api_model_name = $1, display_name = $2, provider = $3, is_active = $4 WHERE id = $5"
            )
            .bind(model.api_model_name)
            .bind(model.display_name)
            .bind(model.provider)
            .bind(model.is_active)
            .bind(id)
            .execute(&state.rag.pool)
            .await;

             match update_result {
                Ok(_) => HttpResponse::Ok().json(json!({"message": "Model updated successfully"})),
                Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
            }
        },
        Ok(None) => HttpResponse::NotFound().json(json!({"error": "Model not found"})),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

#[delete("/api/admin/models/{id}")]
async fn delete_model(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    path: web::Path<String>,
) -> impl Responder {
    if user.role != "admin" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin access required"}));
    }

    let id = path.into_inner();
    
    let result = sqlx::query("DELETE FROM ai_models WHERE id = $1")
        .bind(id)
        .execute(&state.rag.pool)
        .await;

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({"message": "Model deleted successfully"})),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

// Knowledge Base Management Endpoints



#[post("/api/admin/upload/file")]
pub async fn upload_file(
    user: AuthenticatedUser,
    state: web::Data<AppState>,
    mut payload: Multipart,
) -> impl Responder {
    if user.role != "admin" && user.role != "editor" {
        return HttpResponse::Forbidden().json(json!({"error": "Admin/Editor access required"}));
    }

    while let Ok(Some(mut field)) = payload.try_next().await {
        let content_disposition = field.content_disposition();
        let filename = content_disposition.get_filename().unwrap_or("unknown");
        
        if filename.ends_with(".json") {
             let temp_path = format!("temp_upload_{}.json", uuid::Uuid::new_v4());
             // Create file
             let path_clone = temp_path.clone();
             let mut f = match web::block(move || std::fs::File::create(path_clone)).await {
                 Ok(Ok(f)) => f,
                 _ => return HttpResponse::InternalServerError().json(json!({"error": "Failed to create temp file"})),
             };
             
             // Write chunks
             while let Some(chunk) = field.next().await {
                 let data = match chunk {
                     Ok(d) => d,
                     Err(_) => return HttpResponse::BadRequest().json(json!({"error": "Upload interrupted"})),
                 };
                 let res = web::block(move || f.write_all(&data).map(|_| f)).await;
                 match res {
                     Ok(Ok(file)) => f = file,
                     _ => return HttpResponse::InternalServerError().json(json!({"error": "Failed to write to file"})),
                 }
             }
             
             // Spawn background processing
             let state_clone = state.clone();
             let temp_path_clone = temp_path.clone();
             
             tokio::spawn(async move {
                 println!("Starting background processing of {}", temp_path_clone);
                 if let Err(e) = process_knowledge_file(state_clone, temp_path_clone.clone()).await {
                     eprintln!("Error processing file {}: {}", temp_path_clone, e);
                 } else {
                     println!("Finished processing {}", temp_path_clone);
                 }
                 let _ = std::fs::remove_file(temp_path_clone);
             });
             
             return HttpResponse::Ok().json(json!({"message": "File uploaded. Processing started in background."}));
        }
    }
    
    HttpResponse::BadRequest().json(json!({"error": "No JSON file found"}))
}

async fn process_knowledge_file(state: web::Data<AppState>, file_path: String) -> Result<(), Box<dyn std::error::Error>> {
    let file = std::fs::File::open(&file_path)?;
    let reader = std::io::BufReader::new(file);
    
    // Attempt to parse as array of CreateDocumentRequest
    // This loads everything into memory. 
    // For 500MB JSON, this might take 1-2GB RAM.
    let docs: Vec<CreateDocumentRequest> = serde_json::from_reader(reader)?;
    
    println!("Processing {} documents...", docs.len());
    
    for (i, doc) in docs.into_iter().enumerate() {
        if i % 100 == 0 {
             // println!("Processed {} docs", i);
        }
        let _ = state.rag.add_document(&doc.content, doc.metadata).await;
    }
    
    Ok(())
}
