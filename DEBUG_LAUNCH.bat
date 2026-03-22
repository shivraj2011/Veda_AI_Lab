@echo off
echo =======================================================
echo    NEXUS CORE - BACKEND DIAGNOSTIC LAUNCHER
echo =======================================================
echo.
echo Attempting to launch Stable Diffusion...
echo.

cd stable-diffusion-webui

call webui-user.bat

echo.
echo =======================================================
echo    CRITICAL ERROR DETECTED
echo =======================================================
echo The backend crashed or closed.
echo Please copy the error message above and send it to me.
echo.
pause
