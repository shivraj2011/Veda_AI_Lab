@echo off
title Veda AI Lab
color 0B

echo ==================================================
echo      LAUNCHING VEDA AI LAB (Native Mode)
echo ==================================================
echo.

:: 1. Define URL
set "APP_URL=https://veda-ai-lab.vercel.app/"

:: 2. Try Chrome
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo [Launch] Starting via Chrome App...
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --app=%APP_URL%
    exit
)

:: 3. Try Edge (Default on Windows)
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    echo [Launch] Starting via Edge App...
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --app=%APP_URL%
    exit
)

:: 4. Fallback
echo [fallback] Opening default browser...
start %APP_URL%
exit
