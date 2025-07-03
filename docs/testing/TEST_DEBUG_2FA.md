# 🔍 TEST DEBUG PAGE 2FA

## Comment tester le nouveau système 2FA

### 📋 **Étapes de test**

1. **🌐 Ouvrez l'application** sur http://localhost:5173

2. **📱 Allez sur la page de connexion** : Cliquez sur "Se connecter"

3. **🔍 Ouvrez la console du navigateur** :
   - **Chrome/Edge** : F12 → onglet "Console"
   - **Firefox** : F12 → onglet "Console"

4. **✍️ Remplissez le formulaire** :
   - Email : `test@valorix.fr`
   - Mot de passe : `password123`

5. **🚀 Cliquez sur "Se connecter"**

### 🎯 **Messages attendus dans la console**

Vous devriez voir ces messages :

```
🎯 AuthPage rendu - show2FA: false
🔐 Activation du 2FA...
✅ show2FA mis à true
🎯 AuthPage rendu - show2FA: true
```

### ✅ **Comportement attendu**

1. **Avant connexion** : Formulaire email/mot de passe affiché
2. **Après connexion** : Interface 2FA avec 6 champs colorés
3. **Changement de titre** : "Connexion à Valorix" → "Authentification à deux facteurs"

### 🔧 **Si ça ne fonctionne pas**

1. **Vérifiez la console** pour les erreurs
2. **Actualisez la page** (Ctrl+F5)
3. **Testez dans un navigateur différent**
4. **Vérifiez que l'application est à jour** (dernière version avec les logs)

### 📞 **Code de test 2FA**

Pour tester la validation :
- Entrez **6 chiffres** dans les champs colorés
- Le bouton "Vérifier" doit s'activer
- Cliquez sur "Vérifier" pour accéder au dashboard

---

## 🎨 **Interface 2FA attendue**

L'interface 2FA doit afficher :
- **6 champs colorés** : Orange, Bleu, Cyan, Rose, Gris, Jaune
- **Auto-focus** : Navigation automatique entre les champs
- **Boutons** : "Retour" et "Vérifier"
- **Animation** : Smooth transition et effets visuels 