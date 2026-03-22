# Nexus Core - Local Brain Setup Script
$ErrorActionPreference = "Stop"

try {
    Write-Host "===================================================" -ForegroundColor Cyan
    Write-Host "   NEXUS CORE: LOCAL BACKEND INITIALIZATION" -ForegroundColor Cyan
    Write-Host "===================================================" -ForegroundColor Cyan
    Write-Host ""

    # 1. Check for Git
    Write-Host "[1/5] Checking System Dependencies..." -ForegroundColor Yellow
    if (Get-Command "git" -ErrorAction SilentlyContinue) {
        Write-Host "   [OK] Git is installed." -ForegroundColor Green
    } else {
        Write-Host "   [MISSING] Git not found. Attempting to install via Winget..." -ForegroundColor Magenta
        winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
        
        # Refresh env vars for current session
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        if (Get-Command "git" -ErrorAction SilentlyContinue) {
             Write-Host "   [SUCCESS] Git installed." -ForegroundColor Green
        } else {
             Write-Host "   [WARNING] Git install might require a restart. If the next steps fail, restart and try again." -ForegroundColor Yellow
        }
    }

    # 2. Install/Clone Stable Diffusion WebUI
    Write-Host ""
    Write-Host "[2/5] Fetching Neural Engine (Automatic1111)..." -ForegroundColor Yellow
    $targetDir = "$PSScriptRoot\..\..\stable-diffusion-webui"

    if (Test-Path $targetDir) {
        Write-Host "   [INFO] Engine already exists. Skipping download." -ForegroundColor Gray
    } else {
        if (Get-Command "git" -ErrorAction SilentlyContinue) {
            git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
            Write-Host "   [SUCCESS] Engine core downloaded." -ForegroundColor Green
        } else {
             Throw "Git is missing. Please restart computer or install Git manually."
        }
    }

    # 3. Configure API Access for Nexus Core App
    Write-Host ""
    Write-Host "[3/5] Configuring API Protocol..." -ForegroundColor Yellow
    $batFile = "$targetDir\webui-user.bat"
    
    if (Test-Path $batFile) {
        $configContent = Get-Content $batFile
        $newArgs = "set COMMANDLINE_ARGS=--api --cors-allow-origins ""*"""

        # Check if already configured
        if ($configContent -match "--api") {
            Write-Host "   [INFO] API configuration already detected." -ForegroundColor Gray
        } else {
            # Replace the empty args line or append
            $configContent = $configContent -replace "set COMMANDLINE_ARGS=", $newArgs
            $configContent | Set-Content $batFile
            Write-Host "   [SUCCESS] API Protocol unlocked." -ForegroundColor Green
        }
    } else {
        Write-Host "   [WARNING] webui-user.bat not found. skipping config." -ForegroundColor Yellow
    }

    # 4. Download Pony Diffusion (Unrestricted Model)
    Write-Host ""
    Write-Host "[4/5] Unrestricted Model Access (Pony Diffusion V6)..." -ForegroundColor Yellow
    $modelPath = "$targetDir\models\Stable-diffusion\ponyDiffusionV6XL.safetensors"

    if (Test-Path $modelPath) {
        Write-Host "   [INFO] Unrestricted Model already installed." -ForegroundColor Gray
    } else {
        Write-Host "   [ATTENTION] This will download 6.5GB of data." -ForegroundColor Magenta
        $download = Read-Host "   Do you want to download the Unrestricted Logic Core now? (Y/N)"
        
        if ($download -eq 'Y' -or $download -eq 'y') {
            Write-Host "   [DOWNLOADING] Initiating transfer... (This may take a while)" -ForegroundColor Cyan
            $url = "https://civitai.com/api/download/models/290640"
            
            # Create directory if missing
            New-Item -ItemType Directory -Force -Path "$targetDir\models\Stable-diffusion" | Out-Null
            
            try {
                Start-BitsTransfer -Source $url -Destination $modelPath -Description "Downloading Pony Diffusion" -Priority High
                Write-Host "   [SUCCESS] Model installation complete." -ForegroundColor Green
            } catch {
                Write-Host "   [ERROR] Download failed. You may need to download it manually." -ForegroundColor Red
            }
        } else {
            Write-Host "   [SKIP] Model download skipped." -ForegroundColor Gray
        }
    }

    # 5. Launch
    Write-Host ""
    Write-Host "[5/5] Initialization Complete." -ForegroundColor Cyan
    Write-Host "1. The window that opens will install Python dependencies (takes time)."
    Write-Host "2. Once it says 'Running on local URL: http://127.0.0.1:7860', minimize it."
    Write-Host "3. Go back to index.html and click 'Generate'."
    Write-Host ""
    $launch = Read-Host "Launch Neural Engine now? (Y/N)"

    if ($launch -eq 'Y' -or $launch -eq 'y') {
        Set-Location $targetDir
        .\webui-user.bat
    }

} catch {
    Write-Host ""
    Write-Host "!!! FATAL ERROR !!!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
} finally {
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
