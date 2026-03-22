$shortcutPath = "..\Nexus AI.lnk"
if (Test-Path $shortcutPath) {
    $shell = New-Object -ComObject WScript.Shell
    $oldShortcut = $shell.CreateShortcut((Resolve-Path $shortcutPath).Path)
    $target = $oldShortcut.TargetPath
    $args = $oldShortcut.Arguments
    Remove-Item $shortcutPath
    $newShortcut = $shell.CreateShortcut("..\Veda AI Lab.lnk")
    $newShortcut.TargetPath = $target
    $newShortcut.Arguments = $args
    $newShortcut.IconLocation = "C:\Users\Shashwat Shiv Raj\OneDrive\Desktop\Nexus Lab 1st startup\nexus-lab-frontend\public\favicon.ico"
    $newShortcut.Save()
    Write-Host "Shortcut Replaced and Named Veda AI Lab"
} else {
    Write-Host "Shortcut not found"
}
