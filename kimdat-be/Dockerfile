# Multi-stage build for Next.js backend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install dependencies for production
COPY package*.json ./
RUN npm ci --only=production

# Copy Prisma files
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy all images from the real images folder
COPY --from=builder /app/images ./images

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 