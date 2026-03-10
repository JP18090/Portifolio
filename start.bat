@echo off
REM Portfolio Application Startup Script for Windows
REM This script starts both backend and frontend servers

echo.
echo ========================================
echo   Portfolio Application Startup
echo ========================================
echo.

REM Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17+ from: https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
)

REM Check Node
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Java found: 
java -version 2>&1 | findstr version

echo ✓ Node.js found: 
node --version

echo.
echo Starting Portfolio Application...
echo.

REM Start Backend in new window
echo Starting Backend (Port 8080)...
start "Portfolio Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run"

timeout /t 3 /nobreak

REM Start Frontend in new window
echo Starting Frontend (Port 3000)...
start "Portfolio Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo Backend:  http://localhost:8080/api
echo Frontend: http://localhost:3000
echo H2 Console: http://localhost:8080/api/h2-console
echo ========================================
echo.
echo Press any key to close this window...
pause
