# ─────────────────────────────────────────────────────────────
#  Stage 1 — builder
#  Installs ALL deps (including devDeps) and compiles TypeScript.
#  Also used by docker-compose "migrate" service to run drizzle-kit.
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Cache npm install layer separately from source
COPY package*.json ./
RUN npm ci

# Copy source and compile
COPY tsconfig.json drizzle.config.ts ./
COPY src/  ./src/
COPY drizzle/ ./drizzle/
RUN npm run build


# ─────────────────────────────────────────────────────────────
#  Stage 2 — production
#  Lean runtime image: only production dependencies + compiled JS.
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Create a non-root user for security
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled application from builder
COPY --from=builder /app/dist ./dist

# Transfer ownership to the non-root user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the application port
EXPOSE 5050

# Health check — matches the /health route in app.ts
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider \
      "http://localhost:${PORT:-5050}/health" || exit 1

CMD ["node", "dist/server.js"]
