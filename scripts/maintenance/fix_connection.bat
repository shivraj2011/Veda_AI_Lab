@echo off
title Veda Connection Fixer
color 0E

echo ==================================================
echo      Veda CONNECTION DIAGNOSTICS
echo ==================================================
echo.

echo [1/2] Your Local IP Address:
ipconfig | findstr /i "IPv4"
echo.
echo use the above IP like: http://192.168.x.x:3000
echo.

echo [2/2] Attempting to Open Firewall Port 3000...
echo (You may need to run this script as Administrator if this fails)
netsh advfirewall firewall add rule name="Veda AI Lab" dir=in action=allow protocol=TCP localport=3000 profile=any
if "%ERRORLEVEL%"=="0" (
    echo [SUCCESS] Port 3000 is now OPEN for mobile access.
) else (
    echo [FAILED] Could not update Firewall. 
    echo Please right-click this file and select "Run as Administrator".
)

echo.
pause
