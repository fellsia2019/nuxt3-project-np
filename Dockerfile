# ====================== Билд-стадия ======================
FROM node:22-alpine as builder
WORKDIR /app

# Копируем зависимости и ставим их
COPY package.json package-lock.json ./
RUN npm ci

# Копируем исходники и билдим
COPY . .
COPY .env .env

# Важно: передаем переменные в билд
ARG NUXT_PUBLIC_API_DOMAIN
ARG NUXT_PUBLIC_API_PREFIX
ARG NUXT_PUBLIC_API_PORT
ARG NUXT_PUBLIC_API_SECURE

RUN npm run build

# ====================== Продакшен-стадия ======================
FROM node:22-alpine
WORKDIR /app

# Копируем только нужное из билд-стадии
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules

# Настраиваем безопасность
RUN chown -R node:node /app && \
    chmod -R 755 /app && \
    find /app/node_modules -type f -exec chmod 644 {} +

# Указываем переменные окружения для runtime
ENV NUXT_PUBLIC_API_DOMAIN=${NUXT_PUBLIC_API_DOMAIN}
ENV NUXT_PUBLIC_API_PREFIX=${NUXT_PUBLIC_API_PREFIX}
ENV NUXT_PUBLIC_API_PORT=${NUXT_PUBLIC_API_PORT}
ENV NUXT_PUBLIC_API_SECURE=${NUXT_PUBLIC_API_SECURE}

CMD ["node", "/app/.output/server/index.mjs"]
