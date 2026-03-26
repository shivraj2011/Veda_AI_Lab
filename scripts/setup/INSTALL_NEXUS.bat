@echo off
title Veda Core Installer
echo Starting Veda Core Setup...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup_Veda_core.ps1"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Execution failed. Please check for errors above.
    pause
)
pause
