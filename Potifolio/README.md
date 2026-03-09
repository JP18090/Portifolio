# 🎯 Full-Stack Portfolio Application

A modern, full-stack web application for showcasing professional projects. Built with **React**, **Spring Boot**, and **H2 Database** - perfect for your portfolio!

## 🚀 Quick Start (30 seconds!)

### Windows Users:
Simply double-click: **`start.bat`**

### Mac/Linux Users:
```bash
chmod +x start.sh
./start.sh
```

Then open: **http://localhost:3000**

---

## 📖 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed installation & troubleshooting
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - File organization & architecture
- **[backend/README.md](backend/README.md)** - Backend API documentation
- **[frontend/README.md](frontend/README.md)** - Frontend development guide

---

## ✨ Features

- ✅ **Beautiful UI**: Responsive design with gradient backgrounds and smooth animations
- ✅ **Project Management**: Add, edit, view, and delete projects
- ✅ **Real-time Sync**: Frontend seamlessly communicates with backend
- ✅ **Modern Stack**: Latest versions of React, Spring Boot 3.2, and Java 17
- ✅ **Database**: H2 in-memory database with persistence options
- ✅ **REST API**: Complete RESTful API with CORS support
- ✅ **Admin Panel**: H2 console for database management

## 🏗️ Architecture

```
┌─────────────────────┐
│   React Frontend    │ (Port 3000)
│   (Vite + Axios)    │
└──────────┬──────────┘
           │ HTTP/REST
           ▼
┌─────────────────────┐
│  Spring Boot API    │ (Port 8080)
│  (REST Controller)  │
└──────────┬──────────┘
           │ JPA
           ▼
┌─────────────────────┐
│   H2 Database       │
│ (In-Memory/File)    │
└─────────────────────┘
```

## 📂 Project Structure

```
Portfolio/
├── backend/                              # Spring Boot Application
│   ├── src/
│   │   ├── main/java/com/portfolio/
│   │   │   ├── controller/              # REST controllers
│   │   │   ├── model/                   # Data entities
│   │   │   ├── repository/              # Data access layer
│   │   │   ├── service/                 # Business logic
│   │   │   └── PortfolioApplication.java
│   │   └── resources/
│   │       └── application.properties   # Configuration
│   ├── pom.xml                          # Maven dependencies
│   └── README.md                        # Backend documentation
│
├── frontend/                             # React Application
│   ├── src/
│   │   ├── App.jsx                      # Main component
│   │   ├── api.js                       # API client
│   │   ├── index.css                    # Global styles
│   │   └── main.jsx                     # React entry
│   ├── index.html                       # HTML template
│   ├── package.json                     # NPM dependencies
│   ├── vite.config.js                   # Vite config
│   └── README.md                        # Frontend documentation
│
└── README.md                             # This file
```

## � Prerequisites

### Requires installation first:
- **Java 17 or higher** - [Download from Oracle](https://www.oracle.com/java/technologies/downloads/#java17) or [OpenJDK](https://openjdk.org/)
- **Node.js 16+** - [Download from nodejs.org](https://nodejs.org/)

### Optional (Maven auto-downloads via wrapper):
- Maven 3.6+ (will download automatically on first build)

## 🚀 Quick Start

### Prerequisites Verification
Verify installations:
```bash
java -version     # Should show Java 17+
node --version    # Should show v16+
npm --version     # Should show 8+
```

### 1️⃣ Start Backend

```bash
cd backend
mvn spring-boot:run
```
✅ API will run on `http://localhost:8080/api`

### 2️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```
✅ App will run on `http://localhost:3000`

### 3️⃣ Open in Browser
```
http://localhost:3000
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/{id}` | Get project by ID |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |

## 💾 H2 Database Console

Access at: `http://localhost:8080/api/h2-console`
- **JDBC URL**: `jdbc:h2:mem:portfoliodb`
- **Username**: `sa`
- **Password**: (empty)

## 🔧 Configuration

### Backend (`application.properties`)
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:portfoliodb
spring.jpa.hibernate.ddl-auto=create-drop
```

### Frontend (vite.config.js)
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true
  }
}
```

## 📦 Tech Stack

### Frontend
- **React** 18.2 - UI framework
- **Vite** 5.0 - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Spring Boot** 3.2 - Framework
- **Spring Data JPA** - ORM
- **H2** - Database
- **Lombok** - Boilerplate reduction
- **Maven** - Build tool

## 🎨 Features Demo

### Add Project
Fill the form with:
- Project title
- Description
- Image URL
- Technologies used
- Repository and live demo links

### View Projects
Browse all projects in a responsive grid layout with:
- Project image
- Description
- Technology tags
- Links to repository and live demo

### Delete Project
Remove projects you no longer want to showcase

## 📝 Example Project

```json
{
  "title": "E-commerce Platform",
  "description": "Full-stack e-commerce with payment integration",
  "imageUrl": "https://example.com/ecommerce.jpg",
  "repositoryUrl": "https://github.com/yourname/ecommerce",
  "deployedUrl": "https://ecommerce-demo.com",
  "technologies": "React, Spring Boot, PostgreSQL, Stripe"
}
```

## 🚀 Production Build

### Backend
```bash
cd backend
mvn clean package
java -jar target/portfolio-api-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🔐 CORS Configuration

Backend allows requests from frontend:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

Modify in `ProjectController.java` for different deployed URLs.

## 📚 Documentation

- **Backend**: See [backend/README.md](backend/README.md)
- **Frontend**: See [frontend/README.md](frontend/README.md)

## 🐛 Troubleshooting

### Backend won't start
- Ensure Java 17+ is installed: `java -version`
- Check port 8080 is available
- Run `mvn clean install`

### Frontend won't start
- Delete `node_modules/` and run `npm install`
- Ensure Node.js 16+ is installed
- Check port 3000 is available

### API calls fail
- Ensure backend is running on `http://localhost:8080`
- Check browser console for CORS errors
- Verify proxy configuration in `vite.config.js`

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [H2 Database](https://www.h2database.com)
- [Vite Guide](https://vitejs.dev/guide/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Next Steps

1. **Customize** your portfolio with your projects
2. **Deploy** the frontend to Vercel, Netlify, or GitHub Pages
3. **Deploy** the backend to Heroku, Railway, or AWS
4. **Connect** your custom domain
5. **Share** your portfolio with the world!

---

**Built with ❤️ for developers showcasing their work**
