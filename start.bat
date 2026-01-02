@echo off
echo ========================================
echo   FitFuel AI - Docker Quick Start
echo ========================================
echo.

REM Check if Docker is running
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running!
    echo.
    echo Please start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

echo Docker is running! Starting FitFuel AI...
echo.
echo Building and starting the application...
echo This may take a few minutes on first run...
echo.

docker-compose up --build

echo.
echo Application stopped.
pause
