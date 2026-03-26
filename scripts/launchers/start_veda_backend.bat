@echo off
title Veda AI Backend Launcher
color 0A

echo ==================================================
echo      Veda AI BACKEND LAUNCHER
echo ==================================================
echo.

echo [1/3] Checking Ollama Status...
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo Ollama is already running.
) else (
    echo Starting Ollama Service...
    start "Ollama Service" ollama serve
    echo Waiting for initialization...
    timeout /t 5 >nul
)

echo.
echo [2/3] Ensuring 'DeepSeek Coder' is installed (Best for Code Studio)...
echo This might take a while if it's your first time...
ollama pull deepseek-coder:latest

echo.
echo [3/3] Ensuring 'Dolphin Llama 3' is installed (Default Chat)...
ollama pull dolphin-llama3:latest

echo.
echo ==================================================
echo      AI BACKEND READY!
echo ==================================================
echo You can now use Veda Code Studio and Chat.
echo Minimized this window, but DO NOT CLOSE IT.
echo.
pause
