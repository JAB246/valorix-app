#!/usr/bin/env pwsh

Write-Host "🚀 Démarrage de Valorix - Version Optimisée" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Navigation vers le répertoire du projet optimisé
$projectPath = "valorix-final-source-20250610-165309\evalentreprise-improved"

if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✅ Navigation vers: $((Get-Location).Path)" -ForegroundColor Green
    
    # Vérification des dépendances
    if (Test-Path "node_modules") {
        Write-Host "✅ Node modules détectés" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Installation des dépendances..." -ForegroundColor Yellow
        npm install
    }
    
    # Lancement du serveur
    Write-Host "🌐 Lancement du serveur de développement..." -ForegroundColor Cyan
    Write-Host "📍 URL: http://localhost:5173" -ForegroundColor Magenta
    Write-Host "⏹️  Arrêter avec Ctrl+C" -ForegroundColor Yellow
    Write-Host ""
    
    # Démarrage avec ouverture automatique du navigateur
    npm run dev
    
} else {
    Write-Host "❌ Erreur: Répertoire du projet non trouvé: $projectPath" -ForegroundColor Red
    Write-Host "📂 Répertoire actuel: $((Get-Location).Path)" -ForegroundColor Yellow
    
    # Liste des dossiers disponibles
    Write-Host "📁 Dossiers disponibles:" -ForegroundColor Yellow
    Get-ChildItem -Directory | ForEach-Object { Write-Host "   - $($_.Name)" -ForegroundColor Gray }
} 