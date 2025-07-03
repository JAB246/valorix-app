# Script de démarrage corrigé pour Valorix
Write-Host "🚀 DÉMARRAGE VALORIX - VERSION CORRIGÉE" -ForegroundColor Green

# Vérifier si Node.js est installé
Write-Host "🔍 Vérification de Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js non trouvé! Veuillez installer Node.js" -ForegroundColor Red
    exit 1
}

# Vérifier si npm est installé
Write-Host "🔍 Vérification de npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "✅ npm détecté: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm non trouvé!" -ForegroundColor Red
    exit 1
}

# Vérifier si le port 5173 est libre
Write-Host "🔍 Vérification du port 5173..." -ForegroundColor Yellow
$portCheck = netstat -an | findstr :5173 | findstr LISTENING
if ($portCheck) {
    Write-Host "⚠️ Le port 5173 est déjà utilisé. Arrêt des processus..." -ForegroundColor Yellow
    taskkill /F /IM node.exe 2>$null
    Start-Sleep -Seconds 2
}

# Installation des dépendances si nécessaire
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm install
}

# Démarrage du serveur de développement
Write-Host "🌟 Démarrage du serveur de développement Vite..." -ForegroundColor Green
Write-Host "📱 Application accessible sur: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🌐 Application accessible sur: http://127.0.0.1:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Pour arrêter le serveur: Ctrl+C" -ForegroundColor White
Write-Host "────────────────────────────────────────────────────" -ForegroundColor Gray

# Démarrer le serveur
npm run dev 