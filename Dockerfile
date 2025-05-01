# Билд-стадия
FROM node:22-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Продакшен-стадия
FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules

# Устанавливаем PM2 глобально
RUN npm install -g pm2

# Копируем конфиг PM2
COPY ecosystem.config.js /app/

# Запускаем через PM2
CMD ["pm2-runtime", "start", "/app/.output/server/index.mjs", "--name", "nuxt-prod"]
