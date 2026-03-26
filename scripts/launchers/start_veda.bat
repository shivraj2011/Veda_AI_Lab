@echo off
title Veda veda AI Lab - LAUNCHER
color 0B

echo ==================================================
echo      STARTING VEDA: veda AI LAB
echo ==================================================
echo.

:: 1. Start Ollama (Backend AI)
echo [1/4] Initializing AI Engine (Ollama)...
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo    - AI Engine is already active.
) else (
    echo    - Starting AI Engine...
    start "Ollama Core" /min ollama serve
    timeout /t 3 >nul
)

:: 2. Start Node.js Server (Middleware API)
echo [2/4] Starting Veda API Server (Port: 3001)...
echo    - This powers the Backend Logic ^& Database.
echo    - DO NOT CLOSE THE SERVER WINDOW that pops up!
start "Veda API Server" cmd /k "cd /d %~dp0\server && node index.js"
timeout /t 3 >nul

:: 3. Start Next.js Frontend (UI)
echo [3/4] Starting Veda UI Interface (Port: 3000)...
echo    - This powers the Next.js Frontend.
echo    - DO NOT CLOSE THE INTERFACE WINDOW that pops up!
start "Veda UI Interface" cmd /k "cd /d %~dp0\Veda-lab-frontend && npm run dev"
timeout /t 6 >nul

:: 4. Open App
echo [4/4] Launching Browser...
start http://localhost:3000

echo.
echo ==================================================
echo      ALL SYSTEMS ONLINE
echo ==================================================
echo 1. Keep the two command prompt windows open ("API Server" and "UI Interface").
echo 2. If the UI still says "Compiling...", wait a few seconds and refresh the browser.
echo.
pause
