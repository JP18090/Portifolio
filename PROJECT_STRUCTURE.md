# 📁 Project Structure Overview

## 🎯 Portfolio Application - Complete Full-Stack Project

```
Portfolio/
│
├── README.md                          # Main project documentation
├── SETUP_GUIDE.md                     # Detailed setup instructions (READ THIS FIRST!)
├── start.bat                          # Quick start script for Windows
├── start.sh                           # Quick start script for Mac/Linux
│
├── .github/
│   └── copilot-instructions.md        # GitHub Copilot configuration
│
├── .vscode/
│   └── tasks.json                     # VS Code build tasks
│
├── backend/                           # 🔗 Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/portfolio/
│   │   │   │   ├── PortfolioApplication.java      # Main application entry point
│   │   │   │   ├── controller/
│   │   │   │   │   ├── ProjectController.java     # REST endpoints for projects
│   │   │   │   │   └── HealthController.java      # Health check endpoint
│   │   │   │   ├── model/
│   │   │   │   │   └── Project.java               # Project JPA entity
│   │   │   │   ├── repository/
│   │   │   │   │   └── ProjectRepository.java     # Data access layer (CRUD)
│   │   │   │   └── service/
│   │   │   │       └── ProjectService.java        # Business logic layer
│   │   │   └── resources/
│   │   │       └── application.properties         # Spring Boot configuration
│   │   └── test/                                  # Test files
│   ├── target/                        # Compiled classes (generated)
│   ├── pom.xml                        # Maven dependency configuration
│   ├── mvnw.cmd                       # Maven wrapper for Windows
│   ├── mvnw                           # Maven wrapper for Mac/Linux
│   ├── README.md                      # Backend-specific documentation
│   └── .gitignore                     # Git ignore rules
│
├── frontend/                          # ⚛️ React + Vite Application
│   ├── src/
│   │   ├── App.jsx                    # Main React component
│   │   ├── App.css                    # App component styles
│   │   ├── api.js                     # Axios API client configuration
│   │   ├── index.css                  # Global CSS styles (gradient, cards, forms)
│   │   └── main.jsx                   # React entry point with ReactDOM
│   ├── public/
│   │   └── (static assets)             # Public files served directly
│   ├── index.html                     # HTML template
│   ├── package.json                   # NPM dependencies and scripts
│   ├── vite.config.js                 # Vite build configuration with API proxy
│   ├── .eslintrc.json                 # ESLint code quality rules
│   ├── README.md                      # Frontend-specific documentation
│   ├── .gitignore                     # Git ignore rules
│   └── node_modules/                  # Installed NPM packages (generated)
│
└── .gitignore                         # Root git ignore rules
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                             │
│              http://localhost:3000                           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│           React Frontend (frontend/)                         │
│  - App.jsx (Main Component)                                  │
│  - API Client (axios)                                        │
│  - CSS Styling (Grid, Cards, Forms)                         │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP/REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│         Spring Boot Backend (backend/)                       │
│  - ProjectController (REST endpoints)                       │
│  - ProjectService (Business Logic)                          │
│  - ProjectRepository (Data Access)                          │
│  - CORS Enabled (allows frontend to call)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │ JDBC/Hibernate
                               ▼
┌─────────────────────────────────────────────────────────────┐
│           H2 Database (In-Memory)                            │
│  - URL: jdbc:h2:mem:portfoliodb                             │
│  - Projects Table (id, title, description, etc.)            │
│  - H2 Console: http://localhost:8080/api/h2-console        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Key Files & Their Purpose

### Backend Key Files:
| File | Purpose |
|------|---------|
| `PortfolioApplication.java` | Spring Boot main class - starts the server |
| `ProjectController.java` | Handles REST API requests (GET, POST, PUT, DELETE) |
| `ProjectService.java` | Contains business logic for project operations |
| `ProjectRepository.java` | Communicates with H2 database |
| `Project.java` | Data model/entity for projects |
| `application.properties` | Configuration (port, database, JPA settings) |
| `pom.xml` | Maven dependencies (Spring, H2, Lombok, etc.) |

### Frontend Key Files:
| File | Purpose |
|------|---------|
| `App.jsx` | Main React component with form and project list |
| `api.js` | Axios configuration for API calls |
| `index.css` | All styling (gradient, cards, responsive design) |
| `main.jsx` | React entry point (renders App in #root) |
| `vite.config.js` | Vite config with API proxy to backend |
| `package.json` | NPM dependencies (React, Vite, Axios) |
| `index.html` | HTML template with `<div id="root">` |

---

## 🔗 API Endpoints

```
GET    /api/health              - Health check
GET    /api/projects            - Get all projects
GET    /api/projects/{id}       - Get specific project
POST   /api/projects            - Create new project
PUT    /api/projects/{id}       - Update project
DELETE /api/projects/{id}       - Delete project
GET    /api/h2-console          - H2 database admin interface
```

---

## 🚀 Quick Commands

### Development Setup
```bash
# 1. Install dependencies
cd backend  && mvnw.cmd clean install
cd ../frontend && npm install

# 2. Start servers
# Terminal 1 - Backend
cd backend && mvnw.cmd spring-boot:run

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Production Build
```bash
# Backend JAR
cd backend && mvnw.cmd clean package
java -jar target/portfolio-api-1.0.0.jar

# Frontend (optimized)
cd frontend && npm run build  # Creates dist/ folder
```

---

## 💾 Database Schema

### Projects Table
```sql
CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    image_url VARCHAR(500),
    repository_url VARCHAR(500),
    deployed_url VARCHAR(500),
    technologies VARCHAR(500),
    created_at TIMESTAMP
);
```

---

## 🔐 Configuration Files

### `application.properties` (Backend)
- Database: H2 in-memory
- Port: 8080
- Context path: /api
- CORS: Enabled for localhost:3000

### `vite.config.js` (Frontend)
- Port: 3000
- API Proxy: `/api` → `http://localhost:8080/api`
- Build tool: Vite

---

## 📦 Dependencies

### Backend (Spring Boot 3.2)
- Spring Web
- Spring Data JPA
- H2 Database
- Lombok
- Maven

### Frontend (React 18)
- React
- Vite
- Axios
- ESLint

---

## ✅ Checklist - What's Included

- ✅ Complete Spring Boot REST API
- ✅ React with Vite for fast development
- ✅ H2 in-memory database ready
- ✅ CRUD operations for projects
- ✅ Responsive UI with gradient design
- ✅ API documentation
- ✅ Database admin console
- ✅ ESLint configuration
- ✅ Maven wrapper (no setup needed)
- ✅ VS Code tasks.json
- ✅ Startup scripts (Windows & Mac/Linux)
- ✅ Comprehensive documentation

---

## 🎯 Usage Flow

1. **User opens** http://localhost:3000
2. **Frontend loads** React app in browser
3. **User fills form** with project details
4. **Click "Add Project"** → Axios sends POST to backend
5. **Backend receives** request in ProjectController
6. **ProjectService** validates and processes
7. **ProjectRepository** saves to H2 database
8. **Backend returns** new project as JSON
9. **Frontend updates** UI with new project card
10. **User sees** project displayed immediately

---

## 📚 Read Next

1. **First time setup?** → Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Want to run it?** → Execute `start.bat` (Windows) or `start.sh` (Mac/Linux)
3. **Need API details?** → Check [backend/README.md](backend/README.md)
4. **Frontend customization?** → Check [frontend/README.md](frontend/README.md)

---

**🎉 Your portfolio application is ready to showcase your work!**
