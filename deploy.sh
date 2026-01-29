#!/bin/bash

# Exit on error
set -e

DOMAIN="kryptonsecai.nextsoft.live"
API_URL="http://$DOMAIN"

echo "🚀 Starting deployment for $DOMAIN..."

# 1. Install Docker & Docker Compose if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# 2. Install Nginx
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt-get update
    apt-get install -y nginx
fi

# 3. Configure Nginx
echo "Configuring Nginx..."
cp nginx.conf /etc/nginx/sites-available/krypton
ln -sf /etc/nginx/sites-available/krypton /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# 4. Check for Backend Environment Variables
if [ ! -f backend/.env ]; then
    echo "⚠️  WARNING: backend/.env not found!"
    echo "Creating backend/.env from example..."
    if [ -f backend/.env.example ]; then
        cp backend/.env.example backend/.env
        echo "Please edit backend/.env with your real API keys!"
    else
        echo "OPENROUTER_API_KEY=your_key_here" > backend/.env
        echo "JWT_SECRET=change_this_secret" >> backend/.env
        echo "DATABASE_URL=postgres://krypton:krypton_password@postgres:5432/krypton_db" >> backend/.env
    fi
fi

# 5. Build and Run with Docker Compose
echo "Building and starting services..."
# Export the API URL for the frontend build
export NEXT_PUBLIC_API_URL="$API_URL"

# Support both docker-compose and docker compose
if command -v docker-compose &> /dev/null; then
    docker-compose down
    docker-compose up -d --build
else
    docker compose down
    docker compose up -d --build
fi

echo "✅ Deployment complete!"
echo "🌍 Site should be live at $API_URL"
echo "👉 To enable SSL (HTTPS), run: certbot --nginx -d $DOMAIN"
