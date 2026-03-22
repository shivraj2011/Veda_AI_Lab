@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install_zip_variant.ps1"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Download Script Failed. Aborting launch.
    pause
    exit /b
)
echo.
echo Launching AI Engine...
cd stable-diffusion-webui
call webui-user.bat
pause
