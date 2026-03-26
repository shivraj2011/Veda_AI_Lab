@echo off
setlocal enabledelayedexpansion
title NEXUS BACKEND PRO - Unified Lab Environment
color 0B

:: Suppress GitHub login popups and interactive prompts
set GIT_TERMINAL_PROMPT=0
set GCM_INTERACTIVE=never
set GIT_ASKPASS=true

:: Hex Color Codes (approximate for display)
:: 0B = Teal
:: 0A = Lime
:: 0C = Red
:: 0F = White

echo ======================================================================
echo    _   _  _____  __  __  _   _  ____  ____    ____  ____   ___  
echo   ( ) ( )(  ___)(  \/  )( ) ( )(  _ \(  _ \  (  _ \(  _ \ / _ \ 
echo    \ \/ /  ) _)  )    (  ) \/ (  )   / )(_) )  ) __/ )   /( (_) )
echo     \__/  (____)(_/\/\_) \___/  (_)\_)(____/  (__)  (_)\_) \___/ 
echo.
echo                   [ UNIFIED BACKEND STARTUP ]
echo ======================================================================
echo.

:: 1. Initialize Nexus Server (Orchestrator)
echo [1/5] BOOTING NEXUS ORCHESTRATOR...
if exist "server\index.js" (
    start "NEXUS SERVER" cmd /k "node server/index.js"
    echo    [^ ^] SERVER ONLINE
) else (
    echo    [X] ERROR: Nexus Server files not found.
)
timeout /t 2 >nul

:: 2. Initialize Cortex (Ollama)
echo.
echo [2/5] WAKING UP CORTEX (Ollama)...
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo    [^ ^] CORTEX ALREADY AWAKE
) else (
    start "CORTEX CORE" /min ollama serve
    echo    [^ ^] CORTEX STARTING...
)
timeout /t 2 >nul

:: 3. Initialize Visual Cortex (Stable Diffusion)
echo.
echo [3/5] SYNCING VISUAL CORTEX (Image Engine)...
set "SD_FOUND=0"
if exist "stable-diffusion-webui\webui-user.bat" (
    start "VISUAL CORTEX" /min cmd /c "cd stable-diffusion-webui && webui-user.bat --nowebui --api"
    echo    [^ ^] SD-WEBUI DETECTED ^& LAUNCHING
    set "SD_FOUND=1"
) else if exist "SD-Forge\webui-user.bat" (
    start "VISUAL CORTEX" /min cmd /c "cd SD-Forge && webui-user.bat --nowebui --api"
    echo    [^ ^] FORGE DETECTED ^& LAUNCHING
    set "SD_FOUND=1"
)

if "!SD_FOUND!"=="0" (
    echo    [-] [!] NO STABLE DIFFUSION MODULE DETECTED (Skipping)
)
timeout /t 2 >nul

:: 4. Initialize Motion Cortex (ComfyUI)
echo.
echo [4/5] SCANNING FOR MOTION CORTEX (ComfyUI)...
if exist "ComfyUI\run_nvidia_gpu.bat" (
    start "MOTION CORTEX" /min cmd /c "cd ComfyUI && run_nvidia_gpu.bat"
    echo    [^ ^] COMFYUI DETECTED ^& LAUNCHING
) else (
    echo    [-] [!] COMFYUI MODULE NOT DETECTED (Skipping)
)
timeout /t 2 >nul

:: 5. Launch Interfaces
echo.
echo [5/5] LAUNCHING TERMINAL INTERFACES...
echo    [^ ^] OPENING NEXUS HUB
start http://localhost:3000

if "!SD_FOUND!"=="1" (
    echo    [^ ^] OPENING IMAGE CANVAS (A1111)
    :: SD usually takes time, so we launch with a slight delay or just open it now
    start http://127.0.0.1:7860
)

if exist "ComfyUI" (
    echo    [^ ^] OPENING NODE DESK (ComfyUI)
    start http://127.0.0.1:8188
)

echo.
echo ======================================================================
echo                [ ALL SYSTEMS INITIATED ]
echo ======================================================================
echo  1. You can now use Nexus Lab with all AI modules connected.
echo  2. Keep this window or the sub-windows open to maintain service.
echo  3. Check individual windows if any service fails to respond.
echo ======================================================================
echo.
pause
