#!/bin/bash

# BBSolana Development Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Setting up BBSolana development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before continuing."
    echo "   Minimum required: POSTGRES_PASSWORD, SECRET_KEY, ENCRYPTION_KEY"
    exit 1
fi

# Generate SSL certificates for development
echo "🔐 Generating SSL certificates for development..."
mkdir -p docker/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout docker/nginx/ssl/localhost.key \
    -out docker/nginx/ssl/localhost.crt \
    -subj "/C=AU/ST=VIC/L=Melbourne/O=BBSolana/CN=localhost" 2>/dev/null || true

# Build and start services
echo "🐳 Building and starting Docker services..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec backend alembic upgrade head

# Create initial data if needed
echo "📊 Creating initial data..."
docker-compose exec backend python -c "
from app.db.init_data import create_initial_data
import asyncio
asyncio.run(create_initial_data())
print('Initial data created successfully')
" || echo "Note: Initial data script may not exist yet"

echo "✅ Setup complete!"
echo ""
echo "📋 Services:"
echo "   Frontend:    http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs:    http://localhost:8000/api/v1/docs"
echo "   PostgreSQL:  localhost:5432 (user: bbsolana)"
echo "   Redis:       localhost:6379"
echo ""
echo "🔧 Useful commands:"
echo "   View logs:              docker-compose logs -f"
echo "   Stop services:          docker-compose down"
echo "   Restart backend:        docker-compose restart backend"
echo "   Run tests:              docker-compose exec backend pytest"
echo "   Access database:        docker-compose exec postgres psql -U bbsolana -d bbsolana"
echo ""
echo "🎉 Happy coding!"