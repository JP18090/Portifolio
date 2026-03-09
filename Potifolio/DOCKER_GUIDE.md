# Docker Build Guide for Portfolio Application

## Prerequisites
- Docker installed (version 20.10+)
- Docker Compose installed (version 2.0+)

## Quick Start

### Build and Run with Docker Compose
```bash
docker-compose up --build
```

### Run in Background
```bash
docker-compose up --build -d
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/api/h2-console

### Stop the Application
```bash
docker-compose down
```

## Individual Container Management

### Build Backend
```bash
docker build -f Dockerfile.backend -t portfolio-backend .
```

### Run Backend
```bash
docker run -p 8080:8080 portfolio-backend
```

### Build Frontend
```bash
docker build -f Dockerfile.frontend -t portfolio-frontend .
```

### Run Frontend
```bash
docker run -p 3000:3000 portfolio-frontend
```

## Troubleshooting

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Clean Up
```bash
# Remove containers and volumes
docker-compose down -v

# Remove images
docker rmi portfolio-backend portfolio-frontend
```

### Port Already in Use
If ports 3000 or 8080 are in use, modify `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Use 3001 instead of 3000
  - "8081:8080"  # Use 8081 instead of 8080
```

## Environment Variables

### Backend (application.properties)
- `SPRING_PROFILES_ACTIVE`: Set to `docker` for Docker configuration
- `JAVA_OPTS`: JVM options (default: `-Xmx512m -Xms256m`)

### Frontend
- `REACT_APP_API_URL`: Backend API URL (default: `http://backend:8080/api`)
