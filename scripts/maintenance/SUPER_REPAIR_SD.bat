@echo off
title Veda CORE: STABLE DIFFUSION SUPER REPAIR V2 ðŸš€
color 0B

echo ==================================================
echo      STABLE DIFFUSION: SUPER REPAIR TOOL V2
echo ==================================================
echo.

:: 1. Setup Environment
set GIT_TERMINAL_PROMPT=0
set GCM_INTERACTIVE=never
set GIT_ASKPASS=true
set GIT_SSL_NO_VERIFY=true

cd /d "%~dp0..\..\stable-diffusion-webui"
if %ERRORLEVEL% NEQ 0 (
    echo [X] ERROR: Could not find stable-diffusion-webui folder.
    pause
    exit /b
)

:: 2. Fix Master Repo State
echo [1/3] Repairing Master Repository tracking...
if exist ".git" (
    echo    - Found .git folder. Refreshing...
    git remote set-url origin https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
) else (
    echo    - Initializing fresh Git state...
    git init
    git remote add origin https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
)

:: 3. Manually Force-Clone Sub-Repositories
echo.
echo [2/3] Force-Downloading AI Modules...
if not exist "repositories" mkdir repositories
cd repositories

:: Clone settings
set "CLONE=git clone --depth 1 --config core.autocrlf=input -c credential.helper="

echo    - Fetching: Stable Diffusion Core...
if exist "stable-diffusion-stability-ai" rmdir /s /q "stable-diffusion-stability-ai"
%CLONE% https://github.com/Stability-AI/stablediffusion.git stable-diffusion-stability-ai
if %ERRORLEVEL% NEQ 0 (
    echo      [!] Authentication failed. Trying mirror...
    %CLONE% https://github.com/CompVis/stable-diffusion.git stable-diffusion-stability-ai
)

echo    - Fetching: WebUI Assets...
if exist "stable-diffusion-webui-assets" rmdir /s /q "stable-diffusion-webui-assets"
%CLONE% https://github.com/AUTOMATIC1111/stable-diffusion-webui-assets.git stable-diffusion-webui-assets

echo    - Fetching: Generative Models (SDXL)...
if exist "generative-models" rmdir /s /q "generative-models"
%CLONE% https://github.com/Stability-AI/generative-models.git generative-models

echo    - Fetching: K-Diffusion...
if exist "k-diffusion" rmdir /s /q "k-diffusion"
%CLONE% https://github.com/crowsonkb/k-diffusion.git k-diffusion

echo    - Fetching: BLIP...
if exist "BLIP" rmdir /s /q "BLIP"
%CLONE% https://github.com/salesforce/BLIP.git BLIP

echo    - Fetching: Taming Transformers...
if exist "taming-transformers" rmdir /s /q "taming-transformers"
%CLONE% https://github.com/CompVis/taming-transformers.git taming-transformers

echo    - Fetching: CodeFormer...
if exist "CodeFormer" rmdir /s /q "CodeFormer"
%CLONE% https://github.com/sczhou/CodeFormer.git CodeFormer

echo.
echo [3/3] Cleaning up...
cd ..
if exist "venv" (
    echo    - Clearing environment cache (venv)...
    rmdir /s /q "venv"
)

echo.
echo ==================================================
echo      SUPER REPAIR V2 COMPLETE
echo ==================================================
echo 1. Now run "Veda_BACKEND_PRO.bat".
echo 2. It will re-create the environment (takes 5-10 mins).
echo 3. This is the definitive fix for your "fetch" errors.
echo.
pause
