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

Для деплоя продакшена используем docker.  
Приложение запаковано в докер, поэтому Вам нужно лишь установить докер на ваше устройство и выполнить команду билда  
Если у Вас десктоп приложение Docker, перед выполнением команд билда следует запустить приложение.  
Если у Вас возникает ошибка доступа используйте запуск от имени суперюзера\администратора - на виндовс открытие приложение Docker принудительно от имени администратора через ПКМ по иконке Docker и выбора соотвествующего пункта в контекстом меню; на macos и linux использовать sudo вначале команды.  

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

