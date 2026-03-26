@echo off
echo [Veda] Starting Final Dependency Injection...

:: Environment 1: Documents Venv
set "PYTHON1=C:\Users\Shashwat Shiv Raj\Documents\ComfyUI\.venv\Scripts\python.exe"
echo.
echo [1/2] Checking Documents Environment: %PYTHON1%
if exist "%PYTHON1%" (
    echo [Veda] Found Documents Environment. Installing packages...
    "%PYTHON1%" -m pip install gguf rembg trimesh omegaconf torchvision
) else (
    echo [SKIP] Documents Environment not found at this path.
)

:: Environment 2: AppData Roaming UV
set "PYTHON2=C:\Users\Shashwat Shiv Raj\AppData\Roaming\uv\python\cpython-3.12.11-windows-x86_64-none\python.exe"
echo.
echo [2/2] Checking AppData Environment: %PYTHON2%
if exist "%PYTHON2%" (
    echo [Veda] Found AppData Environment. Installing packages...
    "%PYTHON2%" -m pip install gguf rembg trimesh omegaconf torchvision
) else (
    echo [SKIP] AppData Environment not found at this path.
)

echo.
echo [Veda] Installation process complete.
echo Please check the output above for any errors.
pause
