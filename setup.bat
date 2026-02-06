@echo off
setlocal enabledelayedexpansion

echo ##################################################
echo #          EVENT MANAGEMENT SYSTEM SETUP         #
echo ##################################################
echo.

:: Check for node_modules in server to see if npm is available
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b
)

echo [1/5] Installing Server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install server dependencies.
    cd ..
    pause
    exit /b
)
cd ..

echo [2/5] Installing Admin Panel dependencies...
cd admin
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install admin dependencies.
    cd ..
    pause
    exit /b
)
cd ..

echo [3/5] Installing Client Website dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install client dependencies.
    cd ..
    pause
    exit /b
)
cd ..

echo [4/5] Setting up Database...
cd server
:: Check if .env exists
if not exist .env (
    echo [WARNING] .env file not found in server folder!
    echo Please create it based on .env.example with your DB_PASSWORD.
    echo DB Setup might fail...
)
call node setupDb.js
if %errorlevel% neq 0 (
    echo [ERROR] Database setup failed. Check your DB credentials in server/.env.
)
cd ..

echo [5/5] Creating Uploads Directory...
if not exist server\uploads\gallery mkdir server\uploads\gallery

echo.
echo ##################################################
echo #         SETUP COMPLETED SUCCESSFULLY          #
echo ##################################################
echo.
echo To start the project, run 'npm run dev' in server, admin, and client folders.
echo.
echo Admin Login: admin / password123
echo Website: http://localhost:3000
echo Admin: http://localhost:3001
echo.
pause
