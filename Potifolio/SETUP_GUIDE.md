# 🚀 Complete Setup Guide - Portfolio Application

This guide will walk you through setting up and running your full-stack portfolio application.

## ⚠️ IMPORTANT: Prerequisites

You **MUST** install these before running the project:

### 1. **Java 17+** (REQUIRED for backend)

#### Windows:
1. Download from [Oracle](https://www.oracle.com/java/technologies/downloads/#java17) or [OpenJDK](https://learn.microsoft.com/en-us/java/openjdk/download)
2. Run the installer and follow instructions
3. Add Java to PATH (usually automatic)
4. Verify:
   ```bash
   java -version
   ```
   Should show: `java version "17.0.x" ...` or higher

#### Mac:
```bash
brew install openjdk@17
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get install openjdk-17-jdk
```

### 2. **Node.js 16+** (REQUIRED for frontend)

1. Download from [nodejs.org](https://nodejs.org/)
2. Install the LTS version
3. Verify:
   ```bash
   node --version
   npm --version
   ```
   Should show v16+ and 8+

---

## 📥 Installation Steps

### Step 1: Verify Prerequisites
```bash
java -version      # Output: java version "17.0.x" or higher
node --version     # Output: v16.x.x or higher
npm --version      # Output: 8.x.x or higher
```

✅ If all commands work, proceed to Step 2

❌ If any fail, install the missing component first

### Step 2: Clone/Navigate to Project
```bash
# Navigate to project folder
cd "c:\Users\José Tkatchuk\Downloads\Potifolio"
```

### Step 3: Build Backend
```bash
cd backend
mvnw.cmd clean install
```

**On Mac/Linux:**
```bash
cd backend
./mvnw clean install
```

This will:
- Download Maven automatically (first time)
- Download all Java dependencies
- Compile the code
- Create `target/portfolio-api-1.0.0.jar`

⏱️ This may take 2-10 minutes on first run

### Step 4: Install Frontend Dependencies
```bash
cd frontend
npm install
```

This will:
- Download React, Vite, Axios, and other npm packages
- Create `node_modules/` folder
- Prepare frontend for development

⏱️ This may take 1-3 minutes

### Step 5: Start Backend Server
Open a terminal in the `backend/` folder:
```bash
mvnw.cmd spring-boot:run
```

**Expected output:**
```
Started PortfolioApplication in X.XXX seconds (JVM running for X.XXX)
```

✅ Backend is running at `http://localhost:8080/api`

### Step 6: Start Frontend Server
Open a **new terminal** in the `frontend/` folder:
```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:3000/
```

✅ Frontend is running at `http://localhost:3000`

### Step 7: Access Application
1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see the Portfolio application with a purple gradient background

---

## 🧪 Testing the Application

### Test Backend API:
```bash
# In new terminal, run:
curl http://localhost:8080/api/health
```

Expected response:
```json
{
  "status": "UP",
  "message": "Portfolio API is running"
}
```

### Test Frontend Features:
1. **Add a Project:**
   - Fill in the form on the front page
   - Click "Add Project"
   - Should appear in the grid below

2. **View H2 Database:**
   - Go to: http://localhost:8080/api/h2-console
   - JDBC URL: `jdbc:h2:mem:portfoliodb`
   - User: `sa`
   - Password: (empty)
   - Click "Connect"

3. **Delete a Project:**
   - Click the red "Delete" button on any project card
   - Confirm the deletion

---

## 🔧 Troubleshooting

### Problem: "java: command not found"
**Solution:**
1. Install Java 17+ from [oracle.com](https://www.oracle.com/java/technologies/downloads/#java17)
2. Restart your terminal after installation
3. Verify with: `java -version`

### Problem: "npm: command not found"
**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your terminal
3. Verify with: `npm --version`

### Problem: "Backend won't start - Port 8080 in use"
**Solution:**
```bash
# Find and kill process on port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :8080
kill -9 <PID>
```

### Problem: "Frontend won't start - Port 3000 in use"
**Solution:**
```bash
# Kill process on port 3000 (similar to above)
# Or change port in vite.config.js:
# Change: server: { port: 3000 }
# To: server: { port: 3001 }
```

### Problem: "API calls fail / CORS error"
**Solution:**
1. Ensure backend is running: `http://localhost:8080/api`
2. Check browser console (F12) for errors
3. Verify CORS is enabled in `ProjectController.java`
4. Try accessing backend health: http://localhost:8080/api/health

### Problem: "Maven build fails"
**Solution:**
```bash
# Clear Maven cache and rebuild
rmdir target /s /q
mvnw.cmd clean install -U
```

### Problem: "Dependencies not installing"
**Solution:**
```bash
# Clear npm cache and reinstall
cd frontend
rmdir node_modules /s /q
del package-lock.json
npm install
```

### Problem: "H2 database not persisting"
Note: H2 in-memory database (:`jdbc:h2:mem:`) resets on restart.
To persist data, change `application.properties`:
```properties
# Change from:
spring.datasource.url=jdbc:h2:mem:portfoliodb

# To:
spring.datasource.url=jdbc:h2:file:./data/portfoliodb
```

---

## 📚 Useful Commands

### Backend Commands
```bash
cd backend

# Build project
mvnw.cmd clean install

# Run with Spring Boot
mvnw.cmd spring-boot:run

# Run JAR directly
java -jar target/portfolio-api-1.0.0.jar

# Skip tests during build
mvnw.cmd clean install -DskipTests
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🎯 Next Steps

1. **Customize Your Portfolio:**
   - Modify header/footer in `frontend/src/App.jsx`
   - Add your projects using the form
   - Update colors in `frontend/src/index.css`

2. **Deploy Backend:**
   - Deploy JAR to Heroku, Railway, or AWS Lambda
   - Update `REACT_APP_API_URL` in frontend

3. **Deploy Frontend:**
   - Build: `npm run build`
   - Deploy `dist/` folder to Vercel, Netlify, or GitHub Pages

4. **Add Features:**
   - Authentication (Spring Security + JWT)
   - Project categories/filtering
   - Skills section
   - Contact form
   - Dark mode toggle

---

## 📞 Getting Help

- **Backend Issues:** Check `backend/README.md`
- **Frontend Issues:** Check `frontend/README.md`
- **General Structure:** Check main `README.md`
- **API Details:** Visit H2 console or check Spring Boot logs

---

## ✅ Verification Checklist

Before deployment, verify:

- [ ] Java 17+ installed and in PATH
- [ ] Node.js 16+ installed and in PATH
- [ ] Backend builds successfully: `mvnw.cmd clean install`
- [ ] Backend runs: `mvnw.cmd spring-boot:run`
- [ ] Frontend dependencies install: `npm install`
- [ ] Frontend runs: `npm run dev`
- [ ] Can access http://localhost:3000
- [ ] Can add a project
- [ ] Can delete a project
- [ ] H2 console accessible at http://localhost:8080/api/h2-console

---

**🎉 Congratulations! Your portfolio application is ready to use. Start adding your projects and showcase your work!**
