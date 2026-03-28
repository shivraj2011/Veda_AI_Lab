@echo off
title Veda Core: All Systems Initialization
color 0A

echo ==================================================
echo      VEDA CORE: STARTING ALL BACKENDS
echo ==================================================
echo.

:: 1. Start Ollama (Cortex)
echo [1/3] Initializing Cortex (Ollama)...
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo    - Cortex Online.
) else (
    echo    - Booting Cortex...
    start "Cortex (Ollama)" /min ollama serve
    timeout /t 3 /nobreak >nul
)

:: 2. Start ComfyUI (Visual/Motion Cortex)
echo [2/3] Initializing Visual Cortex (ComfyUI)...
if exist "ComfyUI\run_nvidia_gpu.bat" (
    echo    - Found Module. Launching...
    start "Visual Cortex (ComfyUI)" /min cmd /c "cd ComfyUI && run_nvidia_gpu.bat"
) else (
    echo    - [INFO] ComfyUI local folder not found in root. 
    echo      (Ensure ComfyUI is running manually if already installed elsewhere)
)

:: 3. Start Node.js Server (Orchestrator)
echo [3/3] Starting Veda Orchestrator (Server)...
if exist "server\package.json" (
    echo    - Establishing Neural Link...
    start "Veda Orchestrator" cmd /k "cd /d %~dp0server && node index.js"
) else (
    echo    - [ERROR] Veda Server module not found.
)
timeout /t 2 /nobreak >nul

echo.
echo ==================================================
echo      ALL SYSTEMS ONLINE (MODERN VEDA CORE)
echo ==================================================
echo The Core is running. You may minimize these windows.
echo Now use "Veda AI Lab.bat" to access the live app.
echo.
pause
