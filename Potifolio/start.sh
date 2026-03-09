#!/bin/bash
# Portfolio Application Startup Script for Mac/Linux
# This script starts both backend and frontend servers

echo ""
echo "========================================"
echo "   Portfolio Application Startup"
echo "========================================"
echo ""

# Check Java
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed"
    echo "Please install Java 17+ from https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi

# Check Node
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Java found:"
java -version

echo "✓ Node.js found:"
node --version

echo ""
echo "Starting Portfolio Application..."
echo ""

# Start Backend
echo "Starting Backend (Port 8080)..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!

sleep 3

# Start Frontend
echo "Starting Frontend (Port 3000)..."
cd ../frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Backend:  http://localhost:8080/api"
echo "Frontend: http://localhost:3000"
echo "H2 Console: http://localhost:8080/api/h2-console"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
