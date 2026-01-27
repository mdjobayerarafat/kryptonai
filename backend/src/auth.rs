use argon2::{
    password_hash::{
        PasswordHash, PasswordHasher, PasswordVerifier, SaltString
    },
    Argon2
};
use rand_core::OsRng;
use jsonwebtoken::{encode, decode, DecodingKey, EncodingKey, Header, Validation};
use crate::models::Claims;
use std::env;
use actix_web::FromRequest;
use std::future::{ready, Ready};

pub fn hash_password(password: &str) -> Result<String, argon2::password_hash::Error> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2.hash_password(password.as_bytes(), &salt)?.to_string();
    Ok(password_hash)
}

pub fn verify_password(password: &str, password_hash: &str) -> bool {
    let parsed_hash = match PasswordHash::new(password_hash) {
        Ok(hash) => hash,
        Err(_) => return false,
    };
    Argon2::default().verify_password(password.as_bytes(), &parsed_hash).is_ok()
}

pub fn create_jwt(id: &str, username: &str, role: &str) -> Result<String, jsonwebtoken::errors::Error> {
    let secret = env::var("JWT_SECRET").unwrap_or_else(|_| "secret".to_string());
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::hours(24))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: id.to_owned(),
        username: username.to_owned(),
        role: role.to_owned(),
        exp: expiration as usize,
    };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes()))
}

pub struct AuthenticatedUser {
    pub id: String,
    pub username: String,
    pub role: String,
}

impl FromRequest for AuthenticatedUser {
    type Error = actix_web::Error;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &actix_web::HttpRequest, _payload: &mut actix_web::dev::Payload) -> Self::Future {
        let auth_header = req.headers().get("Authorization");
        if let Some(auth_header) = auth_header {
            if let Ok(auth_str) = auth_header.to_str() {
                if auth_str.starts_with("Bearer ") {
                    let token = &auth_str[7..];
                    let secret = env::var("JWT_SECRET").unwrap_or_else(|_| "secret".to_string());
                    let decoding_key = DecodingKey::from_secret(secret.as_bytes());
                    let validation = Validation::default();

                    if let Ok(token_data) = decode::<Claims>(token, &decoding_key, &validation) {
                        return ready(Ok(AuthenticatedUser {
                            id: token_data.claims.sub,
                            username: token_data.claims.username,
                            role: token_data.claims.role,
                        }));
                    }
                }
            }
        }
        ready(Err(actix_web::error::ErrorUnauthorized("Unauthorized")))
    }
}
