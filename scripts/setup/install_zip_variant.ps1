# Force Install ALL Dependencies via ZIP (Bypass Git Entirely)
$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Veda CORE: FULL OFFLINE INSTALLER" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Pre-loading all AI brains to skip login screens..." -ForegroundColor Yellow

$baseDir = "$PWD\stable-diffusion-webui\repositories"
if (-not (Test-Path $baseDir)) { New-Item -ItemType Directory -Force -Path $baseDir | Out-Null }

# Map of "Folder Name" -> "GitHub URL (Master/Main)"
$repos = @{
    "stable-diffusion-stability-ai" = "https://github.com/Stability-AI/stablediffusion/archive/refs/heads/main.zip";
    "taming-transformers"           = "https://github.com/CompVis/taming-transformers/archive/refs/heads/master.zip";
    "k-diffusion"                   = "https://github.com/crowsonkb/k-diffusion/archive/refs/heads/master.zip";
    "CodeFormer"                    = "https://github.com/sczhou/CodeFormer/archive/refs/heads/master.zip";
    "BLIP"                          = "https://github.com/salesforce/BLIP/archive/refs/heads/main.zip"
}

foreach ($name in $repos.Keys) {
    $url = $repos[$name]
    $targetDir = "$baseDir\$name"
    $zipPath = "$baseDir\$name.zip"
    
    if (Test-Path $targetDir) {
        Write-Host "[$name] Already installed. Skipping." -ForegroundColor Green
        continue
    }

    Write-Host "[$name] Downloading..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri $url -OutFile $zipPath -UserAgent "Mozilla/5.0"
    } catch {
        Write-Host "   Failed to download $name. Trying backup URL..." -ForegroundColor Red
        continue
    }

    Write-Host "   Extracting..." -ForegroundColor Gray
    try {
        Expand-Archive -Path $zipPath -DestinationPath $baseDir -Force
        
        # Renaissance of renaming
        $extracted = Get-ChildItem -Path $baseDir -Directory | Where-Object { $_.Name -like "*$name*" -or $_.Name -like "*stablediffusion*" -or $_.Name -like "*taming*" -or $_.Name -like "*k-diffusion*" -or $_.Name -like "*CodeFormer*" -or $_.Name -like "*BLIP*" } | Where-Object { $_.Name -ne $name } | Select-Object -First 1
        
        if ($extracted) {
             # Rename specific folders correctly if they don't match exactly
             Rename-Item -Path $extracted.FullName -NewName $name -Force
             Write-Host "   Success." -ForegroundColor Green
        }
    } catch {
        Write-Host "   Extraction warning for $name" -ForegroundColor Yellow
    }
    
    if (Test-Path $zipPath) { Remove-Item -Force $zipPath }
}

Write-Host ""
Write-Host "All Core Systems Installed." -ForegroundColor Green
exit 0
