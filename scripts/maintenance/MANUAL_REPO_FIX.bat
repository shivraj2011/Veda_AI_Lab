@echo off
echo ===========================================
echo   Veda CORE: MANUAL REPOSITORY INSTALLER
echo ===========================================
echo.
echo The automatic downloader is having trouble.
echo We will manually download the missing parts now.
echo.

cd stable-diffusion-webui
if not exist "repositories" mkdir repositories
cd repositories

echo [1/4] Downloading Stable Diffusion Logic...
if not exist "stable-diffusion-stability-ai" (
    git clone -c credential.helper= https://github.com/Stability-AI/stablediffusion.git stable-diffusion-stability-ai
) else (
    echo   [OK] Already exists.
)

echo.
echo [2/4] Downloading Taming Transformers...
if not exist "taming-transformers" (
    git clone -c credential.helper= https://github.com/CompVis/taming-transformers.git taming-transformers
) else (
    echo   [OK] Already exists.
)

echo.
echo [3/4] Downloading K-Diffusion...
if not exist "k-diffusion" (
    git clone -c credential.helper= https://github.com/crowsonkb/k-diffusion.git k-diffusion
) else (
    echo   [OK] Already exists.
)

echo.
echo [4/4] Downloading CodeFormer...
if not exist "CodeFormer" (
    git clone -c credential.helper= https://github.com/sczhou/CodeFormer.git CodeFormer
) else (
    echo   [OK] Already exists.
)

echo.
echo ===========================================
echo   MANUAL INSTALL COMPLETE
echo ===========================================
echo.
echo Press ENTER to try launching the Brain again.
echo (It should automatically skip the parts we just downloaded).
pause

cd ..
call webui-user.bat
pause
