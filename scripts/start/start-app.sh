#!/bin/bash

echo "========================================"
echo "   VALORIX - Démarrage Application"
echo "========================================"
echo

# Vérification de Node.js
if ! command -v node &> /dev/null; then
    echo "ERREUR: Node.js n'est pas installé."
    echo "Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

echo "Version Node.js: $(node --version)"
echo

echo "Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "ERREUR: Installation des dépendances échouée."
    exit 1
fi

echo
echo "Démarrage de l'application Valorix..."
echo "L'application va s'ouvrir dans votre navigateur sur http://localhost:3000"
echo

npm run dev 