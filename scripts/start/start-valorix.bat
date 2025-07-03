@echo off
echo ========================================
echo    DEMARRAGE APPLICATION VALORIX
echo ========================================
echo.

cd "valorix-final-source-20250610-165309\evalentreprise-improved"

echo Installation des dependances...
call npm install

echo.
echo Lancement de l'application...
echo L'application sera accessible sur: http://localhost:5173
echo.

call npm run dev

pause 