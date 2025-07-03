Write-Host "🔍 Lancement du mode DEBUG pour tester la page 2FA..." -ForegroundColor Cyan
Write-Host ""

# Ouvrir l'application
Write-Host "1. 🌐 Ouverture de l'application sur http://localhost:5173" -ForegroundColor Green
Start-Process "http://localhost:5173"

Start-Sleep -Seconds 2

Write-Host "2. 📝 Instructions pour le test :" -ForegroundColor Yellow
Write-Host "   - Cliquez sur 'Se connecter'" -ForegroundColor White
Write-Host "   - Appuyez sur F12 pour ouvrir la console" -ForegroundColor White
Write-Host "   - Email : test@valorix.fr" -ForegroundColor White
Write-Host "   - Mot de passe : password123" -ForegroundColor White
Write-Host "   - Cliquez sur 'Se connecter'" -ForegroundColor White
Write-Host ""
Write-Host "3. 🎯 Surveillez la console pour voir :" -ForegroundColor Magenta
Write-Host "   - 🎯 AuthPage rendu - show2FA: false" -ForegroundColor White
Write-Host "   - 🔐 Activation du 2FA..." -ForegroundColor White
Write-Host "   - ✅ show2FA mis à true" -ForegroundColor White
Write-Host "   - 🎯 AuthPage rendu - show2FA: true" -ForegroundColor White
Write-Host ""
Write-Host "📋 Consultez TEST_DEBUG_2FA.md pour plus de détails !" -ForegroundColor Cyan 