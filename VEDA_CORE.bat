@echo off
title Veda Core: All Systems Initialization
color 0A

echo ==================================================
echo      VEDA CORE: STARTING ALL BACKENDS
echo ==================================================
echo.

:: 1. Start Ollama (Text / Code)
echo [1/4] Initializing Cortex (Ollama)...
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo    - Cortex Online.
) else (
    echo    - Booting Cortex...
    start "Cortex (Ollama)" /min ollama serve
    timeout /t /nobreak 3 >nul
)

:: 2. Start Stable Diffusion (Images) - Automatic1111
echo [2/4] Initializing Visual Cortex (Stable Diffusion)...
if exist "stable-diffusion-webui\webui-user.bat" (
    echo    - Found Module. Launching...
    start "Visual Cortex (A1111)" /min cmd /c "cd stable-diffusion-webui && webui-user.bat --nowebui --api"
) else (
    echo    - [WARNING] Stable Diffusion module not found.
    echo      (Ensure 'stable-diffusion-webui' folder is inside this folder)
)

:: 3. Start ComfyUI (Video)
echo [3/4] Initializing Motion Cortex (ComfyUI)...
if exist "ComfyUI\run_nvidia_gpu.bat" (
    echo    - Found Module. Launching...
    start "Motion Cortex (ComfyUI)" /min cmd /c "cd ComfyUI && run_nvidia_gpu.bat"
) else (
    echo    - [INFO] ComfyUI module not detected (Skipping).
)

:: 4. Start Node.js Server (Orchestrator)
echo [4/4] Starting Veda Orchestrator (Server)...
echo    - Establishing Neural Link...
start "Veda Orchestrator" cmd /k "cd /d %~dp0 && node server/index.js"
timeout /t /nobreak 2 >nul

echo.
echo ==================================================
echo      ALL SYSTEMS ONLINE
echo ==================================================
echo The Core is running. You may minimize this window.
echo Now launch "Veda AI Lab.bat" to open the app.
echo.
pause
