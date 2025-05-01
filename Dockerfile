# ====================== Билд-стадия ======================
FROM node:22-alpine as builder
WORKDIR /app

# Копируем зависимости и ставим их
COPY package.json package-lock.json ./
RUN npm ci

# Копируем исходники и билдим
COPY . .
RUN npm run build

# ====================== Продакшен-стадия ======================
FROM node:22-alpine
WORKDIR /app

# 1. Копируем только нужное из билд-стадии
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules

# 2. Настраиваем безопасность (не запускаем от root!)
RUN chown -R node:node /app && \
    chmod -R 755 /app && \
    find /app/node_modules -type f -exec chmod 644 {} +

# 3. Запускаем от обычного пользователя
USER node
CMD ["sh", "-c", "API_SECURE=${API_SECURE} API_DOMAIN=${API_DOMAIN} API_PREFIX=${API_PREFIX} API_PORT=${API_PORT} node /app/.output/server/index.mjs"]
# CMD ["node", "/app/.output/server/index.mjs"]
