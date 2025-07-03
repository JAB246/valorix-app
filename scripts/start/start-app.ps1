Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   VALORIX - Démarrage Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérification de Node.js
try {
    $nodeVersion = node --version
    Write-Host "Version Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERREUR: Node.js n'est pas installé." -ForegroundColor Red
    Write-Host "Veuillez installer Node.js depuis https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour continuer..."
    exit 1
}

Write-Host ""
Write-Host "Installation des dépendances..." -ForegroundColor Yellow

try {
    npm install
    if ($LASTEXITCODE -ne 0) {
        throw "Erreur lors de l'installation"
    }
    Write-Host "Dépendances installées avec succès!" -ForegroundColor Green
} catch {
    Write-Host "ERREUR: Installation des dépendances échouée." -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer..."
    exit 1
}

Write-Host ""
Write-Host "Démarrage de l'application Valorix..." -ForegroundColor Green
Write-Host "L'application va s'ouvrir dans votre navigateur sur http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm run dev 