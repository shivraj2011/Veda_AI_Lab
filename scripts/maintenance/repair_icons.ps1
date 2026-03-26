$root = Resolve-Path "$PSScriptRoot\..\.."
$logoPath = "$root\veda-lab-frontend\public\branding\veda_logo_final_v3.png"
$icoPath = "$root\veda-lab-frontend\public\favicon.ico"
$desktop = [System.Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "Veda AI Lab.lnk"

Add-Type -AssemblyName System.Drawing

try {
    Write-Host "Creating genuine ICO from $logoPath..."
    $bmp = [System.Drawing.Bitmap]::FromFile($logoPath)
    $hIcon = $bmp.GetHicon()
    $icon = [System.Drawing.Icon]::FromHandle($hIcon)
    $stream = [System.IO.File]::Create($icoPath)
    $icon.Save($stream)
    $stream.Close()
    Write-Host "Genuine ICO created at $icoPath"

    # Refresh desktop shortcut
    if (Test-Path $shortcutPath) {
        Write-Host "Updating shortcut icon at $shortcutPath..."
        $shell = New-Object -ComObject WScript.Shell
        $sc = $shell.CreateShortcut($shortcutPath)
        $sc.IconLocation = "$icoPath,0"
        $sc.Save()
        Write-Host "Shortcut icon updated successfully."
    } else {
        Write-Host "Shortcut not found at $shortcutPath"
        # Try to find it nearby
        $found = Get-ChildItem -Path $desktop -Filter "*.lnk" | Where-Object { $_.Name -like "*Veda*" } | Select-Object -First 1
        if ($found) {
            Write-Host "Found shortcut at $($found.FullName), updating..."
            $sc = $shell.CreateShortcut($found.FullName)
            $sc.IconLocation = "$icoPath,0"
            $sc.Save()
            Write-Host "Shortcut icon updated successfully."
        }
    }
} catch {
    Write-Error "Failed to update icons: $_"
} finally {
    if ($bmp) { $bmp.Dispose() }
}
