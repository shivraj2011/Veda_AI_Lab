@echo off
title Veda Core: All Systems Initialization
color 0A

echo ==================================================
echo      VEDA CORE: STARTING ALL BACKENDS
echo ==================================================
echo.

:: 1. Start Veda Node.js Server (Cloud Orchestrator)
echo [1/1] Starting Veda Cloud Orchestrator (Server)...
echo    - Establishing secure Neural Link to Cloud AI...
start "Veda Cloud Orchestrator" cmd /k "cd /d %~dp0 && node server/index.js"
timeout /t 2 /nobreak >nul

echo.
echo ==================================================
echo      ALL SYSTEMS ONLINE
echo ==================================================
echo The Core is running. You may minimize this window.
echo Now launch "Veda AI Lab.bat" to open the app.
echo.
pause
