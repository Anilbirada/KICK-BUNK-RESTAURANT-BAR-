# KICK BUNK 360 — Production Deployment Guide

---

## 1. System Requirements
- **OS:** Linux (Ubuntu 22.04 LTS recommended) or Windows Server
- **Node.js:** v20.x or v22.x LTS
- **Database:** PostgreSQL 16
- **Reverse Proxy:** Nginx with Let's Encrypt SSL
- **Containerization:** Docker & Docker Compose

---

## 2. Docker Orchestration

Launch the full stack with isolated networking and persistent PostgreSQL volumes:

```bash
docker-compose up --build -d
```

### Services Defined:
1. `kickbunk360-db`: PostgreSQL 16 with health check and persistent `pgdata` volume.
2. `kickbunk360-backend`: Express Node.js TypeScript API server running on port `5000`.
3. `kickbunk360-frontend`: Optimized production Next.js 14 server running on port `3000`.

---

## 3. Manual Server Setup (Bare Metal / VPS)

### 3.1 Database Initialization
```bash
# In PostgreSQL
CREATE USER kickbunk WITH PASSWORD 'SecurePassword2026';
CREATE DATABASE kickbunk360 OWNER kickbunk;
```

### 3.2 Backend Service
```bash
cd backend
npm ci --production=false
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run build
pm2 start dist/index.js --name "kickbunk-api"
```

### 3.3 Frontend Web Service
```bash
cd frontend
npm ci
npm run build
pm2 start server.js --name "kickbunk-web"
```

### 3.4 Mobile Application Build (React Native / Expo)
```bash
cd mobile
npm install

# For Android APK (Testing / Direct Install)
npx eas-cli build -p android --profile preview

# For Android AAB (Google Play Store Release)
npx eas-cli build -p android --profile production

# For iOS IPA (Apple App Store / TestFlight)
npx eas-cli build -p ios --profile production
```

---

## 4. Nginx Reverse Proxy Configuration

```nginx
server {
    listen 80;
    server_name kickbunk.com www.kickbunk.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name kickbunk.com www.kickbunk.com;

    ssl_certificate /etc/letsencrypt/live/kickbunk.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kickbunk.com/privkey.pem;

    # Frontend Next.js Web
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend REST API
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # WebSockets / Socket.IO
    location /socket.io/ {
        proxy_pass http://localhost:5000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```
