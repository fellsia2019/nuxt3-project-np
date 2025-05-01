FROM node:22-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/ecosystem.config.js /app/

RUN npm install -g pm2

# Ключевое изменение - запускаем Nuxt напрямую через PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
