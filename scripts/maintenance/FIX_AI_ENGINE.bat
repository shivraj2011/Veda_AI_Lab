@echo off
title Veda Core - Engine Repair
echo ===============================================
echo      Veda CORE: AI ENGINE REPAIR TOOL
echo ===============================================
echo.
echo ERROR DIAGNOSIS: Python 3.13 detected.
echo THE FIX: We need to install Python 3.10 for the AI Brain.
echo.
echo [STEP 1] Installing Python 3.10...
echo -----------------------------------------------
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0..\setup\download_python.ps1"

echo.
echo [STEP 2] resetting Installation...
echo -----------------------------------------------
if exist "..\..\stable-diffusion-webui\venv" (
    echo Removing corrupted environment files...
    rmdir /s /q "..\..\stable-diffusion-webui\venv"
    echo Done.
)

echo.
echo [STEP 3] Re-linking Engine...
echo -----------------------------------------------
cd /d "%~dp0..\..\stable-diffusion-webui"

:: Update webui-user.bat to force Python 3.10 usage if available via py launcher
(
echo @echo off
echo set PYTHON=py -3.10
echo set GIT=
echo set VENV_DIR=
echo set COMMANDLINE_ARGS=--api --cors-allow-origins "*"
echo call webui.bat
) > webui-user.bat

echo Configuration updated.
echo.
echo ===============================================
echo    REPAIR COMPLETE
echo ===============================================
echo.
echo PRESS ENTER TO START THE AI ENGINE (Attempt 2)
echo.
pause
call webui-user.bat
pause
