@echo off
title Installing Veda Shortcut (Cube Edition)
color 0B

echo ==================================================
echo      INSTALLING Veda CUBE ICON
echo ==================================================
echo.

:: Define target paths
set "TARGET_SCRIPT=%~dp0start_Veda.bat"
set "ICON_PATH=%~dp0Veda_desktop.ico"
set "ICON_INDEX=0"

:: PowerShell Command
set "PS_CMD=$desktop = [Environment]::GetFolderPath('Desktop'); $s = (New-Object -COM WScript.Shell).CreateShortcut(\"$desktop\Veda AI.lnk\"); $s.TargetPath = '%TARGET_SCRIPT%'; $s.IconLocation = '%ICON_PATH%,%ICON_INDEX%'; $s.Description = 'Launch Veda AI Lab'; $s.Save()"

echo [1/2] Setting Icon...
powershell -Command "%PS_CMD%"

if "%ERRORLEVEL%"=="0" (
    echo.
    echo [SUCCESS] "Veda AI" shortcut updated with new Logo!
) else (
    echo.
    echo [ERROR] Failed. Run as Admin.
)

echo.
pause
