FROM node:22-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm build

# Production stage
FROM node:22-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./
COPY --from=base /app/prisma ./prisma

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/index.js"]
