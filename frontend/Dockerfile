# Estágio 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Definir URL da API do backend no Render (build-time)
ARG VITE_API_URL=https://portifolio-1znw.onrender.com/api
ENV VITE_API_URL=$VITE_API_URL

# Build da aplicação
RUN npm run build

# Estágio 2: Runtime com nginx
FROM nginx:alpine

# Copiar build do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração nginx para SPA (redireciona rotas para index.html)
RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Render usa a variável PORT
CMD sed -i "s/listen 3000/listen ${PORT:-3000}/" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
