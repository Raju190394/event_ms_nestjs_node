@echo off
setlocal enabledelayedexpansion

echo ##################################################
echo #          EVENT MANAGEMENT SYSTEM SETUP         #
echo ##################################################
echo.

:: Check for Node.js
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
    echo Creating a default .env file...
    copy .env.example .env
    echo [ACTION] Please open server/.env and update DB_PASSWORD immediately.
)

call node setupDb.js
if %errorlevel% neq 0 (
    echo [ERROR] Database setup failed. Check your DB credentials in server/.env.
) else (
    echo [SUCCESS] Database and Inventory tables ready.
)
cd ..

echo [5/5] Finalizing Directories...
if not exist server\uploads mkdir server\uploads
if not exist server\uploads\gallery mkdir server\uploads\gallery

echo.
echo ##################################################
echo #         SETUP COMPLETED SUCCESSFULLY          #
echo ##################################################
echo.
echo 🏃 STEPS TO RUN:
echo 1. Open 3 Terminals
echo 2. Terminal 1: cd server ^&^& npm run dev
echo 3. Terminal 2: cd admin ^&^& npm run dev
echo 4. Terminal 3: cd client ^&^& npm run dev
echo.
echo 🔐 CREDENTIALS:
echo Admin Login: admin@vrikshansh.com
echo Password: password123
echo.
echo 🌐 LINKS:
echo Website: http://localhost:3000
echo Admin: http://localhost:3001
echo.
pause
