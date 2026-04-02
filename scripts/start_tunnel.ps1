Stop-Process -Name cloudflared -Force -ErrorAction SilentlyContinue
Start-Process -NoNewWindow -FilePath "cloudflared" -ArgumentList "tunnel", "--url", "http://localhost:3001" -RedirectStandardError "cloudflared_err.txt"
Start-Sleep -Seconds 6
$url = Get-Content "cloudflared_err.txt" | Select-String -Pattern "https://[a-zA-Z0-9-]+\.trycloudflare\.com" -AllMatches | ForEach-Object { $_.Matches.Value } | Select-Object -First 1
Set-Content -Path "tunnel_url.txt" -Value $url
Write-Output "TUNNEL READY: $url"
