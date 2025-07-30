# Kimdat Landing Page

A modern web application with Vite.js frontend, Next.js backend, MongoDB database, and Docker containerization.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Port 80)     │    │   (Port 3000)   │    │   (Port 27017)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx         │    │   Next.js       │    │   MongoDB       │
│   (Static)      │    │   (App Router)  │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vite.js       │    │   API Routes    │    │   Data Storage  │
│   React Router  │    │   Admin Pages   │    │   File Uploads  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🌐 Domain Separation

### Frontend Domain (http://localhost)
- **Purpose**: Public-facing landing page and user interface
- **Technology**: Vite.js + React Router
- **Server**: Nginx (static file serving only)
- **Routes**:
  - `/` → Home page
  - `/test` → Test page
  - All other routes → SPA fallback

### Backend Domain (http://localhost:3000)
- **Purpose**: Admin dashboard and API services
- **Technology**: Next.js App Router
- **Server**: Next.js (direct access)
- **Routes**:
  - `/` → Admin dashboard (protected)
  - `/login` → Authentication page
  - `/api/*` → API endpoints
  - `/no-permission` → Access denied

## 🚀 Quick Start

### Prerequisites
- Docker
- Docker Compose

### 1. Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit environment variables with your values
nano .env
```

### 2. Start Services
```bash
# Build and start all services
docker-compose up --build -d

# Check service status
docker-compose ps
```

### 3. Access the Application
- **Frontend**: http://localhost
- **Backend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api

## 📋 Environment Variables

### MongoDB Configuration
```bash
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=kimdat
```

### Backend Configuration
```bash
# Database (Online MongoDB)
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/kimdat?retryWrites=true&w=majority

# Auth.js
AUTH_SECRET=your-super-secret-key-change-this-in-production
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_TRUST_HOST=true

# Next.js
NODE_ENV=production
```

### Frontend Configuration
```bash
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Optional
VITE_APP_NAME=Kimdat
VITE_APP_VERSION=1.0.0
```

## 🔧 Services

### 1. Frontend (kimdat-fe)
- **Purpose**: Builds static files from Vite.js application
- **Port**: Served by Nginx on port 80
- **Build**: Multi-stage Dockerfile with build args for environment variables
- **Container**: Alpine-based container that shares built files via volume

### 2. Backend (kimdat-be)
- **Purpose**: Next.js API server
- **Port**: 3000 (directly accessible)
- **Features**: 
  - API routes under `/api/`
  - File upload endpoint at `/api/upload`
  - Admin dashboard at `/`
  - Authentication at `/login`
  - MongoDB integration with Prisma

### 3. MongoDB (Online)
- **Purpose**: Database for the application
- **Provider**: MongoDB Atlas, Railway, or other cloud provider
- **Connection**: MongoDB connection string in environment variables

### 4. Nginx
- **Purpose**: Static file server for frontend only
- **Port**: 80
- **Routes**:
  - `/` → Frontend static files
  - `/uploads/` → Uploaded files (if needed for frontend)

## 📁 File Structure

```
kimdat-landing-page/
├── docker-compose.yml          # Main Docker Compose configuration
├── nginx.conf                  # Nginx configuration
├── env.example                 # Environment variables template
├── .env                        # Environment variables (create from env.example)
├── README.md                   # This file
├── kimdat-fe/
│   ├── Dockerfile             # Frontend Dockerfile
│   ├── .dockerignore          # Frontend Docker ignore
│   └── src/                   # Vite.js source code
├── kimdat-be/
│   ├── Dockerfile             # Backend Dockerfile
│   ├── .dockerignore          # Backend Docker ignore
│   ├── ENVIRONMENT.md         # Detailed environment setup guide
│   └── app/                   # Next.js source code
```

## 🔐 Security & Access

### Public Access (Frontend)
- ✅ Landing page
- ✅ Product information
- ✅ Contact forms
- ✅ Static assets

### Protected Access (Backend)
- 🔒 Admin dashboard
- 🔒 User management
- 🔒 Product management
- 🔒 File uploads
- 🔒 API endpoints

## 📡 Communication

### Frontend to Backend
```javascript
// Frontend makes API calls to backend
const response = await fetch('http://localhost:3000/api/upload', {
  method: 'POST',
  body: formData
});
```

### Backend to Database
```javascript
// Backend connects directly to MongoDB
const user = await prisma.user.findUnique({
  where: { email }
});
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Product Models
```prisma
model Product {
  id           String         @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  description  String?
  price        Float?
  material     String?
  weavingStyle String?
  color        String?
  categoryId   String         @db.ObjectId
  category     Products_Category @relation(fields: [categoryId], references: [id])
  images       ProductImage[]
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
}
```

## 🔧 Google OAuth Setup

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/

2. **Create a new project or select existing**

3. **Enable Google+ API**

4. **Create OAuth 2.0 credentials:**
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

5. **Copy the credentials:**
   - Client ID → `AUTH_GOOGLE_ID`
   - Client Secret → `AUTH_GOOGLE_SECRET`

## 📤 File Upload API

The backend includes an upload endpoint at `http://localhost:3000/api/upload` that accepts POST requests with form data containing a `file` field.

**Example usage:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// result.url contains the uploaded file URL
```

**Supported features:**
- **File types**: JPEG, JPG, PNG, GIF, WebP
- **Max size**: 5MB
- **Response**: JSON with file URL and metadata

## 🛠️ Useful Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Access backend container
docker-compose exec backend sh

# Access backend container
docker-compose exec backend sh

# Access nginx container
docker-compose exec nginx sh
```

## 🔄 Request Flow

### Frontend Requests
```
User → http://localhost/ → Nginx → Static Files → React Router → Components
```

### Backend Requests
```
User → http://localhost:3000/ → Next.js → Protected Routes → Database
```

### API Requests
```
Frontend → http://localhost:3000/api/* → Next.js → API Handlers → Database
```

## 🚨 Production Checklist

- [ ] Generate strong `AUTH_SECRET`
- [ ] Set up Google OAuth credentials
- [ ] Use production MongoDB instance
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS URLs in production
- [ ] Set up proper CORS configuration
- [ ] Configure proper logging
- [ ] Set up monitoring and alerts
- [ ] Change default passwords
- [ ] Set up SSL certificates
- [ ] Configure MongoDB backup strategy

## 🔍 Troubleshooting

### Common Issues

1. **"Invalid database URL"**
   - Check MongoDB connection string format
   - Verify credentials and database name

2. **"Auth secret is required"**
   - Set `AUTH_SECRET` environment variable
   - Generate a strong secret key

3. **"Google OAuth error"**
   - Verify `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`
   - Check redirect URI configuration

4. **"Permission denied"**
   - Check file permissions for `.env` file
   - Verify Docker user permissions

### Debug Commands
```bash
# Check environment variables
docker-compose exec backend env | grep -E "(AUTH_|DATABASE_)"

# Check logs
docker-compose logs backend

# Access container shell
docker-compose exec backend sh
```

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Auth.js Configuration](https://authjs.dev/reference/configuration)
- [Prisma Environment Variables](https://www.prisma.io/docs/concepts/more/environment-variables)
- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
- [Vite.js Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Docker Compose Environment Files](https://docs.docker.com/compose/environment-variables/)

## 🎯 Benefits

1. **Clear Separation**: Frontend and backend are completely independent
2. **Security**: Backend is not exposed through frontend proxy
3. **Scalability**: Each service can be scaled independently
4. **Development**: Easier to develop and debug each service separately
5. **Deployment**: Can deploy frontend and backend to different servers
6. **Environment Management**: Centralized environment configuration
7. **Documentation**: Comprehensive setup and usage guides 