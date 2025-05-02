# ====================== Билд-стадия ======================
FROM node:22-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# ARG для переменных (добавлено БЕЗ удаления вашего кода)
ARG NUXT_PUBLIC_API_DOMAIN
ARG NUXT_PUBLIC_API_PREFIX
ARG NUXT_PUBLIC_API_SECURE

# Создаем временный .env из ARG (добавлено)
RUN echo "NUXT_PUBLIC_API_DOMAIN=${NUXT_PUBLIC_API_DOMAIN}" > .env && \
    echo "NUXT_PUBLIC_API_PREFIX=${NUXT_PUBLIC_API_PREFIX}" >> .env && \
    echo "NUXT_PUBLIC_API_SECURE=${NUXT_PUBLIC_API_SECURE}" >> .env

RUN npm run build

# ====================== Продакшен-стадия ======================
FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules


RUN chown -R node:node /app && \
    chmod -R 755 /app && \
    find /app/node_modules -type f -exec chmod 644 {} +

ENV NUXT_PUBLIC_API_DOMAIN=${NUXT_PUBLIC_API_DOMAIN}
ENV NUXT_PUBLIC_API_PREFIX=${NUXT_PUBLIC_API_PREFIX}
ENV NUXT_PUBLIC_API_SECURE=${NUXT_PUBLIC_API_SECURE}

CMD ["node", "/app/.output/server/index.mjs"]
