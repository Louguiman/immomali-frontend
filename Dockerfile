# Base Node.js image
FROM node:20-alpine AS base
# Install required packages and pnpm globally
RUN apk add --no-cache libc6-compat && npm install -g pnpm@latest

WORKDIR /app

# Install dependencies only when needed
FROM base AS deps

# Copy lockfiles and package manager config
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Install dependencies using pnpm
RUN pnpm install

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN pnpm run build

# Production image, optimized for running Next.js
FROM base AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy the built Next.js app
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set non-root user
USER nextjs

# Start the application
CMD ["node", "server.js"]
