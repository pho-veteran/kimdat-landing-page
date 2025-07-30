# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Define build arguments for Vite environment variables
ARG VITE_API_URL

# Set environment variables for the build (with defaults)
ENV VITE_API_URL=${VITE_API_URL:-http://localhost:3000/api}

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - just serve the built files
FROM alpine:latest AS production

# Install basic tools
RUN apk add --no-cache bash

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create a simple command to keep container running (for volume sharing)
CMD ["tail", "-f", "/dev/null"] 