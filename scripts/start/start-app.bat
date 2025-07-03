@echo off
echo ========================================
echo    VALORIX - Demarrage Application
echo ========================================
echo.

echo Verification de Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Node.js n'est pas installe.
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

echo Installation des dependances...
npm install

if %errorlevel% neq 0 (
    echo ERREUR: Installation des dependances echouee.
    pause
    exit /b 1
)

echo.
echo Demarrage de l'application Valorix...
echo L'application va s'ouvrir dans votre navigateur sur http://localhost:3000
echo.

npm run dev

pause 