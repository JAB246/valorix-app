Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    DEMARRAGE APPLICATION VALORIX" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = "valorix-final-source-20250610-165309\evalentreprise-improved"

if (Test-Path $projectPath) {
    Set-Location $projectPath
    
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Lancement de l'application..." -ForegroundColor Green
        Write-Host "L'application sera accessible sur: http://localhost:5173" -ForegroundColor Magenta
        Write-Host ""
        
        Start-Process "http://localhost:5173"
        npm run dev
    } else {
        Write-Host "Erreur lors de l'installation des dependances" -ForegroundColor Red
    }
} else {
    Write-Host "Dossier du projet non trouve: $projectPath" -ForegroundColor Red
}

Read-Host "Appuyez sur Entree pour continuer" 