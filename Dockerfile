# Use the latest LTS version of Node.js
FROM node:18.17.0-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Rebuild the source code only when needed
FROM node:18.17.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run the app
FROM node:18.17.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy Next.js build and node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose port 80
EXPOSE 80

# Start the Next.js app on port 80
ENV PORT 80
CMD ["npm", "run", "start"]