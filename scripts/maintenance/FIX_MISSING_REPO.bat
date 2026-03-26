@echo off
echo ===========================================
echo   Veda CORE: MISSING FILE DOWNLOADER
echo ===========================================
echo.
echo We found the exact file that is missing.
echo "stable-diffusion-stability-ai"
echo.
echo Downloading it now...

cd stable-diffusion-webui
if not exist "repositories" mkdir repositories
cd repositories

:: Force remove if it exists as an empty folder
if exist "stable-diffusion-stability-ai" rmdir /s /q "stable-diffusion-stability-ai"

:: Clone with auth bypass
git clone -c credential.helper= https://github.com/Stability-AI/stablediffusion.git stable-diffusion-stability-ai

if exist "stable-diffusion-stability-ai" (
    echo.
    echo [SUCCESS] File downloaded successfully!
    echo.
) else (
    echo.
    echo [FAILED] Still could not download. Please check your internet.
    echo.
)

echo Press ENTER to launch the AI.
pause

cd ..
call webui-user.bat
pause
