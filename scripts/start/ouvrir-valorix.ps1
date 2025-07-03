Write-Host "🚀 Ouverture de Valorix dans votre navigateur..." -ForegroundColor Green
Start-Sleep -Seconds 3
Start-Process "http://localhost:5173"
Write-Host "✅ Valorix devrait maintenant s'ouvrir dans votre navigateur!" -ForegroundColor Cyan
Write-Host "📱 Si cela ne fonctionne pas, naviguez manuellement vers: http://localhost:5173" -ForegroundColor Yellow 