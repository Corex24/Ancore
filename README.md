#!/bin/bash
# 🚀 Build & Run Script for Ancore WhatsApp Bot using Docker

# 🧼 Clean up old image
docker rm -f ancore-bot >/dev/null 2>&1
docker rmi ancore-bot >/dev/null 2>&1

# 🛠️ Build Docker image
echo "🔨 Building Ancore Docker image..."
docker build -t ancore-bot .

# 🚀 Run the bot container
echo "🚀 Starting Ancore WhatsApp Bot..."
docker run --name ancore-bot --env-file .env ancore-bot
