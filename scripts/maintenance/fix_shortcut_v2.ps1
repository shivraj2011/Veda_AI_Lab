# Forceful Veda Shortcut Fixer v2
$root = Resolve-Path "$PSScriptRoot\..\.."
$logoPath = "$root\nexus-lab-frontend\public\branding\veda_logo_v7.png"
$icoPath = "$root\nexus-lab-frontend\public\favicon.ico"
$targetScript = "$root\start_nexus.bat"
$desktop = [System.Environment]::GetFolderPath("Desktop")

Add-Type -AssemblyName System.Drawing

Write-Host "--- Veda Shortcut Fixer v2 (Direct Mode) ---"
Write-Host "Root: $root"
Write-Host "Desktop: $desktop"

# 1. Update ICO from v7 logo
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

# 2. Update EVERY possible shortcut
$shortcutNames = @("Veda AI Lab.lnk", "Nexus AI.lnk", "Veda.lnk")
$shell = New-Object -ComObject WScript.Shell

foreach ($name in $shortcutNames) {
    $path = Join-Path $desktop $name
    Write-Host "Checking $path..."
    
    # Even if it doesn't exist, we'll try to create it if it's the main one
    if ($name -eq "Veda AI Lab.lnk" -or (Test-Path $path)) {
        try {
            $sc = $shell.CreateShortcut($path)
            $sc.TargetPath = $targetScript
            $sc.WorkingDirectory = $root
            $sc.IconLocation = "$icoPath,0"
            $sc.Description = "Launch Veda AI Lab"
            $sc.Save()
            Write-Host "  -> Updated: $path"
        } catch {
            Write-Error "  -> Failed updating $path: $($_.Exception.Message)"
        }
    }
}

# 3. Force Icon Refresh
Write-Host "Refreshing Icon Cache..."
try {
    # ie4uinit.exe is a built-in tool that can refresh icons
    & ie4uinit.exe -show
    Write-Host "Shell refresh triggered."
} catch {
    Write-Warning "Failed to trigger shell refresh: $($_.Exception.Message)"
}

Write-Host "--- Done. Please check your desktop now. ---"
