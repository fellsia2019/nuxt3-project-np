# ====================== Билд-стадия ======================
FROM node:22-alpine as builder
WORKDIR /app

# Копируем зависимости
COPY package.json package-lock.json ./
RUN npm ci

# Копируем исходники
COPY . .

# Передаём переменные через ARG (нужны только для сборки)
ARG NUXT_PUBLIC_API_DOMAIN
ARG NUXT_PUBLIC_API_PREFIX
ARG NUXT_PUBLIC_API_SECURE
ARG NUXT_PUBLIC_SITE_URL
ARG NUXT_PUBLIC_SITE_NAME
ARG NUXT_PUBLIC_SITE_DESCRIPTION
ARG NUXT_PUBLIC_SITE_INDEXABLE

# Создаём временный .env
RUN echo "NUXT_PUBLIC_API_DOMAIN=${NUXT_PUBLIC_API_DOMAIN}" > .env && \
    echo "NUXT_PUBLIC_API_PREFIX=${NUXT_PUBLIC_API_PREFIX}" >> .env && \
    echo "NUXT_PUBLIC_API_SECURE=${NUXT_PUBLIC_API_SECURE}" >> .env && \
    echo "NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL}" >> .env && \
    echo "NUXT_PUBLIC_SITE_NAME=${NUXT_PUBLIC_SITE_NAME}" >> .env && \
    echo "NUXT_PUBLIC_SITE_INDEXABLE=${NUXT_PUBLIC_SITE_INDEXABLE}" >> .env && \
    echo "NUXT_PUBLIC_SITE_DESCRIPTION=${NUXT_PUBLIC_SITE_DESCRIPTION}" >> .env

# Билдим приложение
RUN npm run build

# ====================== Продакшен-стадия ======================
FROM node:22-alpine
WORKDIR /app

# Копируем собранное приложение
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules

# Настройка прав
RUN chown -R node:node /app && \
    chmod -R 755 /app && \
    find /app/node_modules -type f -exec chmod 644 {} +

# Переменные для runtime
ENV NUXT_PUBLIC_API_DOMAIN=${NUXT_PUBLIC_API_DOMAIN}
ENV NUXT_PUBLIC_API_PREFIX=${NUXT_PUBLIC_API_PREFIX}
ENV NUXT_PUBLIC_API_SECURE=${NUXT_PUBLIC_API_SECURE}
ENV NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL}
ENV NUXT_PUBLIC_SITE_NAME=${NUXT_PUBLIC_SITE_NAME}
ENV NUXT_PUBLIC_SITE_DESCRIPTION=${NUXT_PUBLIC_SITE_DESCRIPTION}
ENV NUXT_PUBLIC_SITE_INDEXABLE=${NUXT_PUBLIC_SITE_INDEXABLE}

# Запуск
CMD ["node", "/app/.output/server/index.mjs"]
