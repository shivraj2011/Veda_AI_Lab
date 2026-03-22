@echo off
title Nexus Unrestricted AI Lab - LAUNCHER
color 0B

echo ==================================================
echo      STARTING NEXUS: UNRESTRICTED AI LAB
echo ==================================================
echo.

:: 1. Start Ollama (Backend AI)
echo [1/3] Initializing AI Engine (Ollama)...
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo    - AI Engine is already active.
) else (
    echo    - Starting AI Engine...
    start "Ollama Core" /min ollama serve
    timeout /t 3 >nul
)

:: 2. Start Node.js Server (Middleware)
echo [2/3] Starting Nexus Server (Localhost:3000)...
echo    - This powers the Code Studio ^& Chat.
echo    - DO NOT CLOSE THE SERVER WINDOW that pops up!
start "Nexus Server" cmd /k "cd /d %~dp0 && node server/index.js"
timeout /t 4 >nul

:: 3. Open App
echo [3/3] Launching Interface...
start http://localhost:3000

echo.
echo ==================================================
echo      SYSTEM ONLINE
echo ==================================================
echo 1. If Code Studio says "Offline", check the "Nexus Server" window for errors.
echo 2. Ensure you have run 'start_ai_backend.bat' once to download models.
echo.
pause
