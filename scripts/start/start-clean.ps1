# Script de démarrage propre pour Valorix
Write-Host "🧹 NETTOYAGE ET DÉMARRAGE PROPRE DE VALORIX" -ForegroundColor Green

# Tuer tous les processus Node.js existants
Write-Host "🔄 Arrêt de tous les processus Node.js..." -ForegroundColor Yellow
try {
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Processus Node.js arrêtés" -ForegroundColor Green
} catch {
    Write-Host "ℹ️ Aucun processus Node.js à arrêter" -ForegroundColor Blue
}

# Attendre un moment pour que les ports se libèrent
Write-Host "⏳ Attente de libération des ports..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Vérifier que le port 5173 est libre
$portInUse = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠️ Port 5173 encore occupé, tentative de libération..." -ForegroundColor Red
    $processId = $portInUse.OwningProcess
    Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Nettoyer le cache npm
Write-Host "🧹 Nettoyage du cache..." -ForegroundColor Yellow
npm cache clean --force

# Démarrer l'application
Write-Host "🚀 Démarrage de l'application..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 L'application sera accessible sur:" -ForegroundColor Cyan
Write-Host "   • http://localhost:5173" -ForegroundColor White
Write-Host "   • http://127.0.0.1:5173" -ForegroundColor White
Write-Host ""
Write-Host "💡 Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Cyan

# Démarrer avec gestion des erreurs
try {
    npm run dev
} catch {
    Write-Host "❌ Erreur lors du démarrage: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Solutions possibles:" -ForegroundColor Yellow
    Write-Host "   1. Vérifiez que Node.js est installé: node --version" -ForegroundColor White
    Write-Host "   2. Installez les dépendances: npm install" -ForegroundColor White
    Write-Host "   3. Vérifiez le fichier package.json" -ForegroundColor White
    Write-Host ""
    Read-Host "Appuyez sur Entrée pour continuer..."
} 