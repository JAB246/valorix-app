# Script de réorganisation complète du projet Valorix
Write-Host "🚀 DÉMARRAGE DE LA RÉORGANISATION VALORIX" -ForegroundColor Green

# Création de la structure de dossiers
Write-Host "📁 Création de la structure de dossiers..." -ForegroundColor Yellow

$folders = @(
    "docs\development",
    "docs\testing", 
    "docs\diagnostics",
    "docs\user-guides",
    "docs\reports",
    "scripts\start",
    "scripts\test", 
    "scripts\build",
    "scripts\utils",
    "backups\old-versions",
    "backups\zip-files"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "✅ Créé: $folder" -ForegroundColor Green
    }
}

# Déplacement des fichiers de documentation
Write-Host "📄 Déplacement des fichiers de documentation..." -ForegroundColor Yellow

# Documentation de développement
$devDocs = @(
    "Plan de Développement Complet - Application Valorix.md",
    "plan-ameliorations-valorix.md",
    "Optimisation Finale Application Valorix.md",
    "Amélioration Module d'Évaluation - Fonctionnalités Avancées.md",
    "Services et Notifications Avancés - Valorix.md"
)

foreach ($doc in $devDocs) {
    if (Test-Path $doc) {
        Move-Item $doc "docs\development\" -Force
        Write-Host "✅ Déplacé: $doc → docs\development\" -ForegroundColor Green
    }
}

# Documentation de tests
$testDocs = @(
    "Test*.md",
    "TEST*.md",
    "Rapport de Tests*.md"
)

foreach ($pattern in $testDocs) {
    Get-ChildItem -Name $pattern | ForEach-Object {
        Move-Item $_ "docs\testing\" -Force
        Write-Host "✅ Déplacé: $_ → docs\testing\" -ForegroundColor Green
    }
}

# Documentation de diagnostic
$diagDocs = @(
    "Diagnostic*.md",
    "AUDIT*.md",
    "Analyse*.md"
)

foreach ($pattern in $diagDocs) {
    Get-ChildItem -Name $pattern | ForEach-Object {
        Move-Item $_ "docs\diagnostics\" -Force
        Write-Host "✅ Déplacé: $_ → docs\diagnostics\" -ForegroundColor Green
    }
}

# Rapports finaux
$reportDocs = @(
    "Rapport*.md",
    "*RAPPORT*.md",
    "SUCCÈS*.md"
)

foreach ($pattern in $reportDocs) {
    Get-ChildItem -Name $pattern | ForEach-Object {
        Move-Item $_ "docs\reports\" -Force
        Write-Host "✅ Déplacé: $_ → docs\reports\" -ForegroundColor Green
    }
}

# Guides utilisateur
$userDocs = @(
    "GUIDE*.md",
    "NOUVELLES_FONCTIONNALITES*.md"
)

foreach ($pattern in $userDocs) {
    Get-ChildItem -Name $pattern | ForEach-Object {
        Move-Item $_ "docs\user-guides\" -Force
        Write-Host "✅ Déplacé: $_ → docs\user-guides\" -ForegroundColor Green
    }
}

# Déplacement des scripts
Write-Host "⚙️ Déplacement des scripts..." -ForegroundColor Yellow

# Scripts de démarrage
$startScripts = @(
    "start-*.ps1",
    "start-*.bat", 
    "start-*.sh",
    "ouvrir-*.ps1"
)

foreach ($pattern in $startScripts) {
    Get-ChildItem -Name $pattern | ForEach-Object {
        Move-Item $_ "scripts\start\" -Force
        Write-Host "✅ Déplacé: $_ → scripts\start\" -ForegroundColor Green
    }
}

# Scripts de test
$testScripts = @(
    "test-*.ps1",
    "debug-*.ps1"
)

foreach ($pattern in $testScripts) {
    Get-ChildItem -Name $pattern | ForEach-Object {
        Move-Item $_ "scripts\test\" -Force
        Write-Host "✅ Déplacé: $_ → scripts\test\" -ForegroundColor Green
    }
}

# Déplacement des backups
Write-Host "💾 Déplacement des backups..." -ForegroundColor Yellow

# Archives ZIP
Get-ChildItem -Name "*.zip" | ForEach-Object {
    Move-Item $_ "backups\zip-files\" -Force
    Write-Host "✅ Déplacé: $_ → backups\zip-files\" -ForegroundColor Green
}

# Dossiers de backup
$backupFolders = @(
    "valorix-*"
)

foreach ($pattern in $backupFolders) {
    Get-ChildItem -Directory -Name $pattern | ForEach-Object {
        Move-Item $_ "backups\old-versions\" -Force
        Write-Host "✅ Déplacé: $_ → backups\old-versions\" -ForegroundColor Green
    }
}

# Suppression des doublons
Write-Host "🗑️ Suppression des fichiers dupliqués..." -ForegroundColor Yellow

$duplicates = @(
    "App.css",      # Existe déjà dans src/
    "App.jsx",      # Existe déjà dans src/
    "theme.js",     # Existe déjà dans src/
    "main.jsx",     # Existe déjà dans src/
    "pasted_content.txt"
)

foreach ($file in $duplicates) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "✅ Supprimé (doublon): $file" -ForegroundColor Red
    }
}

# Suppression de UX_Demo.jsx (doublon de UXDemo.jsx)
if (Test-Path "src\UX_Demo.jsx") {
    Remove-Item "src\UX_Demo.jsx" -Force
    Write-Host "✅ Supprimé (doublon): src\UX_Demo.jsx" -ForegroundColor Red
}

# Suppression des services dupliqués à la racine
$rootServices = @("aiServices.js", "integrationServices.js")
foreach ($service in $rootServices) {
    if (Test-Path $service) {
        Remove-Item $service -Force
        Write-Host "✅ Supprimé (doublon): $service" -ForegroundColor Red
    }
}

# Résumé final
Write-Host ""
Write-Host "🎉 RÉORGANISATION TERMINÉE !" -ForegroundColor Green
Write-Host "📊 Résumé des améliorations:" -ForegroundColor Cyan
Write-Host "   • Structure organisée créée" -ForegroundColor White
Write-Host "   • Documentation catégorisée" -ForegroundColor White  
Write-Host "   • Scripts organisés par fonction" -ForegroundColor White
Write-Host "   • Backups archivés" -ForegroundColor White
Write-Host "   • Doublons supprimés" -ForegroundColor White
Write-Host ""
Write-Host "📁 Nouvelle structure:" -ForegroundColor Cyan
Write-Host "   ├── docs/ (documentation organisée)" -ForegroundColor White
Write-Host "   ├── scripts/ (scripts catégorisés)" -ForegroundColor White  
Write-Host "   ├── backups/ (archives)" -ForegroundColor White
Write-Host "   └── src/ (code source propre)" -ForegroundColor White
Write-Host ""
Write-Host "✨ Le projet est maintenant organisé et prêt pour le développement !" -ForegroundColor Green 