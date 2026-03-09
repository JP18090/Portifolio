# Portfolio Backend API

A Spring Boot REST API for managing portfolio projects with H2 in-memory database.

## 🚀 Features

- **RESTful API**: Complete CRUD operations for projects
- **H2 Database**: Lightweight in-memory database
- **Spring Data JPA**: ORM for database operations
- **Lombok**: Reduced boilerplate code
- **CORS Support**: Enabled for frontend communication
- **H2 Console**: Database admin interface

## 📦 Prerequisites

- Java 17 or higher (required) - [Download](https://www.oracle.com/java/technologies/downloads/#java17)
- Maven 3.6+ (optional - will auto-download via wrapper)

### Verify Installation
```bash
java -version
```

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Build the project (Windows):**
   ```bash
   mvnw.cmd clean install
   ```

   **Or on Mac/Linux:**
   ```bash
   ./mvnw clean install
   ```

   **Or with system Maven (if installed):**
   ```bash
   mvn clean install
   ```

## 🚀 Running the Application

### Method 1: Maven Wrapper (Windows)
```bash
mvnw.cmd spring-boot:run
```

### Method 2: Maven Wrapper (Mac/Linux)
```bash
./mvnw spring-boot:run
```

### Method 3: System Maven (if installed)
```bash
mvn spring-boot:run
```

### Method 4: JAR File
```bash
mvnw.cmd clean package
java -jar target/portfolio-api-1.0.0.jar
```

The API will be available at `http://localhost:8080/api`

## 📊 H2 Console

Access the H2 console at: `http://localhost:8080/api/h2-console`

- **JDBC URL**: `jdbc:h2:mem:portfoliodb`
- **User Name**: `sa`
- **Password**: (leave empty)

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/portfolio/
│   │   │   ├── PortfolioApplication.java     # Main app class
│   │   │   ├── controller/
│   │   │   │   ├── ProjectController.java    # REST endpoints
│   │   │   │   └── HealthController.java     # Health check
│   │   │   ├── model/
│   │   │   │   └── Project.java              # Entity model
│   │   │   ├── repository/
│   │   │   │   └── ProjectRepository.java    # Data access layer
│   │   │   └── service/
│   │   │       └── ProjectService.java       # Business logic
│   │   └── resources/
│   │       └── application.properties        # Configuration
│   └── test/                                 # Test files
├── pom.xml                                   # Maven configuration
└── .gitignore
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Response: `{ "status": "UP", "message": "Portfolio API is running" }`

### Projects

#### Get All Projects
```
GET /api/projects
```

#### Get Project by ID
```
GET /api/projects/{id}
```

#### Create Project
```
POST /api/projects
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "A full-stack e-commerce application",
  "imageUrl": "https://example.com/image.jpg",
  "repositoryUrl": "https://github.com/user/project",
  "deployedUrl": "https://example.com",
  "technologies": "React, Spring Boot, PostgreSQL"
}
```

#### Update Project
```
PUT /api/projects/{id}
Content-Type: application/json

{ "title": "Updated Title", ... }
```

#### Delete Project
```
DELETE /api/projects/{id}
```

## 🔧 Configuration

Edit `src/main/resources/application.properties`:

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:h2:mem:portfoliodb
spring.jpa.hibernate.ddl-auto=create-drop

# H2 Console
spring.h2.console.enabled=true
```

## 🏗️ Database Schema

### Projects Table
| Field | Type | Notes |
|-------|------|-------|
| id | Long | Primary Key (Auto-generated) |
| title | String | Required |
| description | String | Optional |
| image_url | String | Optional |
| repository_url | String | Optional |
| deployed_url | String | Optional |
| technologies | String | Comma-separated |
| created_at | LocalDateTime | Auto-set |

## 🧪 Testing

```bash
mvn test
```

## 📦 Dependencies

- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Lombok
- Jackson (JSON serialization)

## 🤝 Contributing

Contributions are welcome! Please follow Spring Boot best practices and add tests for new features.

## 📝 License

This project is open source and available under the MIT License.
