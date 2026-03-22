$desktop = [System.Environment]::GetFolderPath("Desktop")
$shortcutName = "Veda AI Lab.lnk"
$oldName = "Nexus AI.lnk"
$root = Resolve-Path "$PSScriptRoot\..\.."
$iconPath = "$root\nexus-lab-frontend\public\branding\veda_logo_final_v3.png"

$shell = New-Object -ComObject WScript.Shell

# Check if old shortcut exists
if (Test-Path "$desktop\$oldName") {
    $sc = $shell.CreateShortcut("$desktop\$oldName")
    $target = $sc.TargetPath
    $args = $sc.Arguments
    Remove-Item "$desktop\$oldName"
    $newSc = $shell.CreateShortcut("$desktop\$shortcutName")
    $newSc.TargetPath = $target
    $newSc.Arguments = $args
    $newSc.IconLocation = "$iconPath,0"
    $newSc.Save()
    Write-Host "Replaced old shortcut with Veda icon"
} elseif (Test-Path "$desktop\$shortcutName") {
    $sc = $shell.CreateShortcut("$desktop\$shortcutName")
    $sc.IconLocation = "$iconPath,0"
    $sc.Save()
    Write-Host "Updated existing Veda shortcut icon"
} else {
    Write-Host "Searching for shortcut in Drive..."
    $scPath = Get-ChildItem -Path $desktop -Filter "*.lnk" | Where-Object { $_.Name -match "Veda|Nexus" } | Select-Object -ExpandProperty FullName -First 1
    if ($scPath) {
        $sc = $shell.CreateShortcut($scPath)
        $sc.IconLocation = "$iconPath,0"
        $sc.Save()
        Write-Host "Found and updated: $scPath"
    }
}
