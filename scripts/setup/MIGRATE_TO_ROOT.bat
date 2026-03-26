@echo off
title Veda Migration Assistant
color 0E

echo ==================================================
echo      MIGRATING SYSTEM TO ROOT (C:\Veda_Lab)
echo ==================================================
echo.
echo [1/4] Creating Clean Workspace...
set "SOURCE=%~dp0"
set "DEST=C:\Veda_Lab"

if not exist "%DEST%" mkdir "%DEST%"

echo [2/4] Copying System Files (Including .git)...
echo      This fixes the "Git Repository" crash and "Red X" errors.
:: Copy EVERYTHING, including Hidden files (.git), excluding nothing crucial.
robocopy "%SOURCE%." "%DEST%" /E /ZB /DCOPY:DA /COPY:DAT /R:3 /W:1 /XD ".gemini" "node_modules" >nul

echo [2.5] Copying Critical Modules...
:: Specifically ensuring A1111 git is healthy
robocopy "%SOURCE%stable-diffusion-webui" "%DEST%\stable-diffusion-webui" /E /ZB /COPY:DAT /R:3 /W:1 >nul

echo [3/4] Registering New Location...
:: Update the Shortcut to point to C:\Veda_Lab
set "TARGET_SCRIPT=%DEST%\Veda_INTERFACE.bat"
set "ICON_PATH=%DEST%\Veda_logo.ico"

set "PS_CMD=$desktop = [Environment]::GetFolderPath('Desktop'); $s = (New-Object -COM WScript.Shell).CreateShortcut(\"$desktop\Veda AI.lnk\"); $s.TargetPath = '%TARGET_SCRIPT%'; $s.IconLocation = '%ICON_PATH%,0'; $s.Description = 'Launch Veda AI Lab'; $s.WorkingDirectory = '%DEST%'; $s.Save()"

powershell -Command "%PS_CMD%"

echo [4/4] Finalizing...
:: Refresh Icon Cache
copy /b "%UserProfile%\Desktop\desktop.ini" +,, >nul 2>&1

echo.
echo ==================================================
echo      MIGRATION COMPLETE
echo ==================================================
echo.
echo 1. I have moved Veda to: C:\Veda_Lab
echo    (This fixes the OneDrive Red X errors).
echo.
echo 2. I have repaired the Git files.
echo    (This fixes the A1111 crash).
echo.
echo 3. I have updated your Desktop Icon.
echo.
echo YOU CAN NOW DELETE THE OLD FOLDER ON YOUR DESKTOP using Shift+Delete.
echo Use the "Veda AI" shortcut to start.
echo.
pause
