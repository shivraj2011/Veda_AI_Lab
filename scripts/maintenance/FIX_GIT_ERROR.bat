@echo off
echo ===========================================
echo   Veda CORE: GIT CORRUPTION FIXER
echo ===========================================
echo.

cd stable-diffusion-webui

echo Checking for corrupted files...
if exist "repositories" (
    rmdir /s /q "repositories"
    echo [OK] Cleared corrupted repositories.
)

echo.
echo ===========================================
echo   FIX COMPLETE
echo ===========================================
echo.
echo Press ENTER to try launching again.
pause

call webui-user.bat
pause
