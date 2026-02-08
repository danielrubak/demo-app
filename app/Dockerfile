# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies needed for production only
# Using npm ci ensures a clean install based on package-lock.json
RUN npm ci --omit=dev

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Copy application source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
