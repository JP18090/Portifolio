# Estágio 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Instalar serve para servir a aplicação
RUN npm install -g serve

# Copiar build do estágio anterior
COPY --from=builder /app/dist ./dist

# Copiar package.json para referência
COPY package.json .

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["serve", "-s", "dist", "-l", "3000"]
