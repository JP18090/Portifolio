# Docker Setup Guide

Este guia explica como executar o Portfolio com Docker e Docker Compose.

## 📋 Pré-requisitos

- Docker instalado ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (incluído no Docker Desktop)

## 🏗️ Estrutura dos Containers

```
Docker Network: portfolio-network
├── portfolio-backend (Spring Boot 3.2 + Java 17)
│   ├── Port: 8080
│   ├── Health Check: /api/health
│   └── Volumes: ./backend/src/main/resources/certificados
├── portfolio-frontend (React 18 + Vite)
│   └── Port: 3000
```

## 📦 Arquivos Docker

- `Dockerfile.backend` - Build multi-stage para Spring Boot
- `Dockerfile.frontend` - Build multi-stage para React
- `docker-compose.yml` - Orquestração dos contêineres

## Início Rápido

### 1. Build e Start dos containers

```bash
# Na raiz do projeto
docker-compose up --build
```

### 2. Acessar a aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/api/h2-console

### 3. Parar os containers

```bash
docker-compose down
```

## Comandos Docker Compose Úteis

### Ver status dos containers
```bash
docker-compose ps
```

### Rebuildar images (após mudanças de código)
```bash
docker-compose build --no-cache
```

### Reiniciar os containers
```bash
docker-compose restart
```

### Ver logs em tempo real
```bash
# Todos os logs
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### Executar comando dentro de um container
```bash
# Backend
docker-compose exec backend bash

# Frontend
docker-compose exec frontend sh
```

## Armazenamento de Certificados

Os certificados são salvos em:
```
./backend/src/main/resources/certificados/
```

Este diretório é montado como um volume Docker, garantindo que os certificados persistam mesmo após desligar os containers.

## Troubleshooting

### Porta já em uso

Se a porta 3000 ou 8080 já está em uso, você pode modificar o `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Mudar para outra porta
```

### Container não inicia

Verifique os logs:
```bash
docker-compose logs backend
docker-compose logs frontend
```

### Limpar tudo e começar do zero

```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Variáveis de Ambiente

### Backend
- `SPRING_PROFILES_ACTIVE`: Perfil ativo (docker)
- `SPRING_DATASOURCE_URL`: URL do banco de dados
- `JAVA_OPTS`: Opções da JVM (-Xmx512m -Xms256m)

### Frontend
- `VITE_API_URL`: URL da API (http://localhost:8080/api)

## Performance

Para melhorar performance em máquinas com recursos limitados:

1. **Reduzir memória da JVM** em `backend/Dockerfile`:
```dockerfile
ENV JAVA_OPTS="-Xmx256m -Xms128m"
```

2. **Usar Node Alpine** (já implementado) para reduzir tamanho da imagem

## Deployment

Para fazer push das imagens para um registry (Docker Hub, etc):

```bash
# Tag das imagens
docker tag portfolio-backend:latest seu-usuario/portfolio-backend:latest
docker tag portfolio-frontend:latest seu-usuario/portfolio-frontend:latest

# Push
docker push seu-usuario/portfolio-backend:latest
docker push seu-usuario/portfolio-frontend:latest
```
