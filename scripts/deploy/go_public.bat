@echo off
title Veda Public Link Generator
color 0D

echo ==================================================
echo      Veda PUBLIC TUNNEL (No Wi-Fi Needed)
echo ==================================================
echo.
echo This script will generate a PUBLIC URL for your app.
echo You can send this URL to ANYONE or ANY DEVICE.
echo.
echo [!] Requirements:
echo     1. 'start_Veda.bat' MUST be running in the background.
echo.
echo [!] How to use:
echo     1. Wait for a URL to appear below (like https://xxxx.localhost.run)
echo     2. Type that URL into your phone.
echo.
echo Connecting to Public Relay...
echo --------------------------------------------------
ssh -o StrictHostKeyChecking=no -R 80:localhost:3000 nokey@localhost.run
pause
