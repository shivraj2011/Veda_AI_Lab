@echo off
title NEXUS CORE: Stable Diffusion Repair Tool
color 0E

echo ==================================================
echo      STABLE DIFFUSION: DEEP REPAIR TOOL
echo ==================================================
echo.
:: Suppress GitHub login popups and interactive prompts
set GIT_TERMINAL_PROMPT=0
set GCM_INTERACTIVE=never
set GIT_ASKPASS=true

echo [1/4] Entering Stable Diffusion directory...
cd /d "%~dp0..\..\stable-diffusion-webui"
if %ERRORLEVEL% NEQ 0 (
    echo [X] ERROR: Could not find stable-diffusion-webui folder.
    pause
    exit /b
)

echo.
echo [2/4] Repairing Git Repository tracking...
echo (This fixes the "not a git repository" error)
if not exist ".git" (
    git init
    git remote add origin https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
    echo    [^ ^] Git Initialized.
) else (
    echo    [^ ^] Git folder already exists.
)

echo.
echo [3/4] Clearing Sub-Repositories...
echo (This forces a fresh download of missing parts)
if exist "repositories" (
    echo    - Removing corrupted repositories folder...
    rmdir /s /q "repositories"
    echo    [^ ^] Done.
) else (
    echo    [^ ^] repositories folder already empty.
)

echo.
echo [4/4] Finalizing...
echo    - Ready to try launching again.
echo.
echo ==================================================
echo      REPAIR STEPS COMPLETE
echo ==================================================
echo 1. Now run "NEXUS_BACKEND_PRO.bat" again.
echo 2. It will download the missing assets (around 500MB).
echo 3. Ensure your internet is stable.
echo.
pause
