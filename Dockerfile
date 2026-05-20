FROM node:22-bullseye-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:22-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8090

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/serve.mjs ./

EXPOSE 8090
CMD ["node", "serve.mjs"]