#!/bin/bash

# Stop any running containers
docker-compose down

# Build the images
docker-compose build

# Start the services
docker-compose up -d

# Show logs
docker-compose logs -f
