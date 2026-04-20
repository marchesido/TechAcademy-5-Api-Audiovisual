# ===========================================
# Stage 1: Build
# ===========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências de build
COPY package*.json ./
RUN npm ci

# Copia o código-fonte e faz o build
COPY . .
RUN npm run build

# ===========================================
# Stage 2: Production
# ===========================================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Auth
ENV JWT_SECRET=""
ENV JWT_EXPIRATION_TIME=""

# Database
ENV DB_HOST=audiovisual-gestao-db
ENV DB_PORT=5433
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres123
ENV DB_NAME=audiovisual-gestao-db

# Cria usuário não-root por segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copia apenas dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copia o build da stage anterior
COPY --from=builder /app/dist ./dist

# Ajusta permissões
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["node", "dist/main.js"]