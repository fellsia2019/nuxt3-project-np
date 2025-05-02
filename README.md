Бэк для этого проекта - https://github.com/fellsia2019/django-project-np/

Nodejs 20.x+

Перед запуском необходимо создать .env файл из .env.example  

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Для продакшена используется docker, ci\cd gitgub action  
Ручной режим запуска билда на проде только первоначально, дальше всё через ci\cd gitgub action, по пушу в master.  

Первоначальный билд докера на проде  

Требования  
- docker v22+  
- docker compose v2  

```bash
docker compose build  # Билд контейнера
docker compose up -d  # Запуск в фоне
```

Остановка:  
```bash
docker compose down --remove-orphans
```

