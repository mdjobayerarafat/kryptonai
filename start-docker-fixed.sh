#!/bin/bash

echo "🚀 Starting KryptonSecAI..."

# Stop and remove any existing containers
echo "📦 Stopping and removing existing containers..."
docker compose down --volumes --remove-orphans
docker container prune -f

# Build and start the containers
echo "🔨 Building and starting containers..."
docker compose up --build

echo "✅ KryptonSecAI should be running at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo "   Database: localhost:5432"