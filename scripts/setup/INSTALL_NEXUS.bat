@echo off
title Nexus Core Installer
echo Starting Nexus Core Setup...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup_nexus_core.ps1"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Execution failed. Please check for errors above.
    pause
)
pause
