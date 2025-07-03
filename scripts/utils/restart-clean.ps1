# Script de redémarrage propre de Vite avec nettoyage de cache
Write-Host "🚀 REDÉMARRAGE PROPRE DE VITE AVEC CACHE VIDÉ" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Aller dans le répertoire du projet
Set-Location -Path "C:\Users\JABADIE\Downloads\UI_UX Design for Payment-Integrated App"

Write-Host "📂 Répertoire: $(Get-Location)" -ForegroundColor Yellow

# Tuer tous les processus Node existants (pour s'assurer qu'aucun serveur ne tourne)
Write-Host "🔄 Arrêt des processus Node existants..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Nettoyer le cache npm
Write-Host "🧹 Nettoyage du cache npm..." -ForegroundColor Yellow
npm cache clean --force

# Supprimer le dossier node_modules/.vite si il existe (cache Vite)
if (Test-Path "node_modules\.vite") {
    Write-Host "🗑️ Suppression du cache Vite..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules\.vite"
}

# Supprimer le dossier dist si il existe
if (Test-Path "dist") {
    Write-Host "🗑️ Suppression du dossier dist..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "dist"
}

Write-Host "✅ Nettoyage terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Démarrage du serveur Vite..." -ForegroundColor Cyan

# Démarrer le serveur de développement
npm run dev 