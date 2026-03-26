# Fix Desktop Shortcut and Icon for Veda AI Lab
$root = Resolve-Path "$PSScriptRoot\..\.."
$logoPath = "$root\veda-lab-frontend\public\branding\veda_logo_final_v3.png"
$icoPath = "$root\veda-lab-frontend\public\favicon.ico"
$targetScript = "$root\start_Veda.bat"
$shortcutName = "Veda AI Lab.lnk"
$desktop = [System.Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop $shortcutName

Add-Type -AssemblyName System.Drawing

Write-Host "--- Veda Shortcut Fixer ---"
Write-Host "Root: $root"

# 1. Ensure ICO exists and is updated from PNG
try {
    Write-Host "Converting $logoPath to ICO..."
    if (Test-Path $logoPath) {
        $bmp = [System.Drawing.Bitmap]::FromFile($logoPath)
        $hIcon = $bmp.GetHicon()
        $icon = [System.Drawing.Icon]::FromHandle($hIcon)
        $stream = [System.IO.File]::Create($icoPath)
        $icon.Save($stream)
        $stream.Close()
        $bmp.Dispose()
        Write-Host "Success: ICO created at $icoPath"
    } else {
        Write-Error "Logo file not found at $logoPath"
    }
} catch {
    Write-Error "Failed to convert icon: $($_.Exception.Message)"
}

# 2. Update Shortcut
try {
    $shell = New-Object -ComObject WScript.Shell
    
    # Try to find the shortcut if the exact path doesn't exist
    if (-not (Test-Path $shortcutPath)) {
        Write-Host "Shortcut not found at $shortcutPath. Searching desktop..."
        $found = Get-ChildItem -Path $desktop -Filter "*.lnk" | Where-Object { $_.Name -like "*Veda*" -or $_.Name -like "*Veda*" } | Select-Object -First 1
        if ($found) {
            $shortcutPath = $found.FullName
            Write-Host "Found existing shortcut: $shortcutPath"
        } else {
            Write-Host "No existing shortcut found. Creating new one..."
        }
    }

    $sc = $shell.CreateShortcut($shortcutPath)
    $sc.TargetPath = $targetScript
    $sc.WorkingDirectory = $root
    $sc.IconLocation = "$icoPath,0"
    $sc.Description = "Launch Veda AI Lab"
    $sc.Save()

    Write-Host "Success: Shortcut updated at $shortcutPath"
    Write-Host "Target: $($sc.TargetPath)"
    Write-Host "Icon: $($sc.IconLocation)"
} catch {
    Write-Error "Failed to update shortcut: $($_.Exception.Message)"
}

Write-Host "--- Done ---"
