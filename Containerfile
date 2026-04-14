# Containerfile for Podman/Docker - Playwright + Firefox + Node 22

# Base image: Node.js 22.22.1 slim (Debian-based, lebih kecil dari full image)
FROM docker.io/library/node:22.22.1-slim

# Install system dependencies yang dibutuhkan Firefox buat jalanin Playwright
RUN apt-get update && apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcairo2 libdrm2 libdbus-1-3 fonts-noto-color-emoji && rm -rf /var/lib/apt/lists/*

# Set working directory di dalam container
WORKDIR /app

# Copy file package.json & package-lock.json dulu
COPY package*.json ./

# Install production dependencies only (devDependencies nggak butuh di container)
RUN npm ci --omit=dev

# Container buat jalanin test Playwright di Podman/Docker
COPY . .

# Install browser Firefox via Playwright
RUN npx playwright install firefox

# Default command: jalankan UI test dengan Firefox + HTML reporter
CMD ["npx", "playwright", "test", "--project=firefox", "--reporter=html"]