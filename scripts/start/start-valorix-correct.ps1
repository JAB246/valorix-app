#!/usr/bin/env pwsh

Write-Host "=== VALORIX - LANCEMENT APPLICATION ===" -ForegroundColor Green
Write-Host ""

# Naviguer vers le bon répertoire
$projectPath = "valorix-final-source-20250610-165309\evalentreprise-improved"
Write-Host "Navigation vers le répertoire du projet: $projectPath" -ForegroundColor Yellow

if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✅ Répertoire trouvé et changé" -ForegroundColor Green
    
    # Vérifier que package.json existe
    if (Test-Path "package.json") {
        Write-Host "✅ package.json trouvé" -ForegroundColor Green
        Write-Host ""
        
        # Afficher la version de Node et npm
        Write-Host "=== INFORMATIONS SYSTÈME ===" -ForegroundColor Cyan
        Write-Host "Node.js version:" -ForegroundColor Yellow
        node --version
        Write-Host "npm version:" -ForegroundColor Yellow
        npm --version
        Write-Host ""
        
        # Installer les dépendances si node_modules n'existe pas
        if (-not (Test-Path "node_modules")) {
            Write-Host "⚠️  node_modules non trouvé, installation des dépendances..." -ForegroundColor Yellow
            npm install
            Write-Host ""
        }
        
        # Lancer l'application
        Write-Host "=== LANCEMENT DE L'APPLICATION ===" -ForegroundColor Green
        Write-Host "Démarrage du serveur de développement..." -ForegroundColor Yellow
        Write-Host "L'application sera disponible sur: http://localhost:5173" -ForegroundColor Cyan
        Write-Host ""
        npm run dev
        
    } else {
        Write-Host "❌ package.json non trouvé dans $projectPath" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Répertoire $projectPath non trouvé" -ForegroundColor Red
    Write-Host "Répertoires disponibles:" -ForegroundColor Yellow
    Get-ChildItem -Directory | Select-Object Name
} 