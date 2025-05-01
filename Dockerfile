# ====================== Билд-стадия ======================
FROM node:22-alpine as builder
WORKDIR /app

# Копируем зависимости и ставим их
COPY package.json package-lock.json ./
RUN npm ci --omit=dev  # Только продакшен-зависимости

# Копируем исходники и билдим
COPY . .
RUN npm run build  # Собираем Nuxt 3 в .output/

# ====================== Продакшен-стадия ======================
FROM node:22-alpine
WORKDIR /app

# 1. Копируем только нужное из билд-стадии
COPY --from=builder /app/.output /app/.output          # Собранный Nuxt
COPY --from=builder /app/public /app/public           # Статика
COPY --from=builder /app/package.json /app/           # Для возможных runtime-зависимостей
COPY --from=builder /app/node_modules /app/node_modules  # Готовые модули (sharp и др.)

# 2. Настраиваем безопасность (не запускаем от root!)
RUN chown -R node:node /app && \
    chmod -R 755 /app && \
    find /app/node_modules -type f -exec chmod 644 {} +

# 3. Запускаем от обычного пользователя
USER node
CMD ["node", "/app/.output/server/index.mjs"]  # Чистый Node.js, без PM2
