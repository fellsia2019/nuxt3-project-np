deploy-frontend:
    cd nuxt-app && \
    docker-compose down && \
    docker-compose up --build -d
