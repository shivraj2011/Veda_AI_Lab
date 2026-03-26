@echo off
title Veda Cleanup & Deploy
color 0B

:: 1. Detect Desktop Path (Robust)
set "SRC=%~dp0"
set "PS_CMD=[Environment]::GetFolderPath('Desktop')"
for /f "usebackq delims=" %%I in (`powershell -Command "%PS_CMD%"`) do set "USER_DESKTOP=%%I"

set "TARGET=%USER_DESKTOP%\Veda Lab 1st startup"
set "BACKUP=%USER_DESKTOP%\Veda_Backup_%RANDOM%"

echo [1/5] Target: "%TARGET%"
echo [2/5] Cleaning old workspace...
if exist "%TARGET%" (
    echo Moving old files to backup: %BACKUP%
    move "%TARGET%" "%BACKUP%" >nul
)
mkdir "%TARGET%"

echo [3/5] Deploying Fresh Files...
:: Copy Launchers
copy "%SRC%Veda App.bat" "%TARGET%\" >nul
copy "%SRC%start_Veda.bat" "%TARGET%\" >nul
copy "%SRC%install_desktop_shortcut.bat" "%TARGET%\" >nul

:: Copy Source File
copy "%SRC%index.html" "%TARGET%\" >nul
copy "%SRC%manifest.json" "%TARGET%\" >nul
copy "%SRC%Veda_logo.ico" "%TARGET%\" >nul
copy "%SRC%.env" "%TARGET%\" >nul 2>nul

echo [4/5] Copying System Folders (Engine Room)...
:: Copy Directories (Server, Desktop, Public, Assets)
xcopy "%SRC%server" "%TARGET%\server\" /E /I /Q /Y >nul
xcopy "%SRC%desktop" "%TARGET%\desktop\" /E /I /Q /Y >nul
xcopy "%SRC%public" "%TARGET%\public\" /E /I /Q /Y >nul
xcopy "%SRC%js" "%TARGET%\js\" /E /I /Q /Y >nul
xcopy "%SRC%css" "%TARGET%\css\" /E /I /Q /Y >nul

:: Copy SD if exists (might be slow, skipping big files handled by timeout if any)
if exist "%SRC%stable-diffusion-webui" (
    echo Copying AI Core...
    xcopy "%SRC%stable-diffusion-webui" "%TARGET%\stable-diffusion-webui\" /E /I /Q /Y /EXCLUDE:%SRC%exclude_git.txt >nul
)

:: Clean Git junk from Target (Removing error marks)
if exist "%TARGET%\server\.git" rd /s /q "%TARGET%\server\.git"
if exist "%TARGET%\desktop\.git" rd /s /q "%TARGET%\desktop\.git"

echo [5/5] Final Polish (Hiding System Files)...
:: Hide everything
attrib +h "%TARGET%\*" /S /D
:: Unhide Launchers
attrib -h "%TARGET%\start_Veda.bat"
attrib -h "%TARGET%\Veda App.bat"
attrib -h "%TARGET%\Veda Lab 1st startup"

echo.
echo [SUCCESS] Deployment Complete!
echo The folder 'Veda Lab 1st startup' now contains ONLY your App.
echo (Old files are in %BACKUP% just in case).
pause
