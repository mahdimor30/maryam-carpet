FROM oven/bun:1 AS base

WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build TanStack Start app
RUN bun run build

# Expose default port (adjust if needed)
EXPOSE 3000

# Start production server
CMD ["bun", "run", "start"]