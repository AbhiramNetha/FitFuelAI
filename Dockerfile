# Multi-stage build for optimized Docker image

# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --production --legacy-peer-deps || npm install --production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev dependencies)
RUN npm install --legacy-peer-deps || npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 3: Runner (Production)
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Change ownership to nextjs user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
