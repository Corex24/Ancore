# ⚙️ Ancore Dockerfile
# 📦 Base image with Node.js
FROM node:20-alpine

# 🏗️ Set working directory
WORKDIR /app

# 🧱 Install system dependencies
RUN apk add --no-cache \
  ffmpeg \
  libc6-compat \
  curl \
  git \
  python3 \
  build-base \
  vips-dev \
  bash

# 📄 Copy package files first for caching
COPY package.json yarn.lock ./

# 📦 Install Node.js dependencies
RUN yarn install --network-timeout 600000

# 📁 Copy source code
COPY . .

# 🚪 Expose port (for Render health checks)
EXPOSE 3000

# 🚀 Start the bot
CMD ["node", "index.js"]
