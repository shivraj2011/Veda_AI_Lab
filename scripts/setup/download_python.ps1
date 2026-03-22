# Download Python 3.10 and launch installer
$ErrorActionPreference = "Stop"
$installerUrl = "https://www.python.org/ftp/python/3.10.11/python-3.10.11-amd64.exe"
$installerPath = "$PWD\python_installer.exe"

Write-Host "Downloading Python 3.10 (Required for AI Engine)..." -ForegroundColor Cyan
try {
    Start-BitsTransfer -Source $installerUrl -Destination $installerPath
    Write-Host "Download Complete." -ForegroundColor Green
    Write-Host "Launching Installer..." -ForegroundColor Yellow
    Write-Host "IMPORTANT:" -ForegroundColor Red -BackgroundColor Yellow
    Write-Host "1. Check the box [Add Python.exe to PATH] at the bottom."
    Write-Host "2. Click [Install Now]."
    Write-Host "3. When done, close the installer window and come back here."
    Start-Process -FilePath $installerPath -Wait
} catch {
    Write-Host "Failed to download/run installer: $_" -ForegroundColor Red
}
