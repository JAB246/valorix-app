# 📚 GUIDE D'UTILISATION - COMPOSANTS UX/UI VALORIX

## 🎯 **APERÇU RAPIDE**

Ce guide détaille l'utilisation des **5 systèmes de composants UX/UI** créés pour améliorer l'expérience utilisateur de Valorix.

---

## 🎨 **1. DESIGN SYSTEM - `theme.js`**

### **Import et Utilisation :**
```javascript
import { theme, getThemeClasses } from './theme';

// Accès aux couleurs
const primaryColor = theme.colors.primary[600]; // #2563eb
const gradient = theme.gradients.primary; // "from-indigo-600 via-purple-600 to-blue-600"

// Utilisation des classes
const containerClass = getThemeClasses('container'); // "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
const buttonClass = getThemeClasses('button', 'primary'); // Classes complètes du bouton
```

### **Couleurs Disponibles :**
```javascript
theme.colors = {
  primary: { 50-900 },    // Indigo
  secondary: { 50-900 },  // Purple  
  accent: { 50-900 },     // Blue
  success: { 50-900 },    // Green
  warning: { 50-900 },    // Orange
  error: { 50-900 },      // Red
  neutral: { 50-900 }     // Gray
}
```

### **Gradients Prédéfinis :**
```javascript
theme.gradients = {
  primary: "from-indigo-600 via-purple-600 to-blue-600",
  secondary: "from-purple-500 to-pink-600",
  success: "from-green-400 to-blue-500",
  warning: "from-yellow-400 to-orange-500",
  error: "from-red-500 to-pink-600"
}
```

---

## 🔔 **2. NOTIFICATIONS TOAST - `components/Toast.jsx`**

### **Setup Initial :**
```javascript
// App.jsx - Wrapper principal
import { ToastProvider } from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <YourAppContent />
    </ToastProvider>
  );
}
```

### **Utilisation dans les Composants :**
```javascript
import { useNotification } from './components/Toast';

function MonComposant() {
  const { notifySuccess, notifyError, notifyWarning, notifyInfo } = useNotification();
  
  const handleAction = async () => {
    try {
      notifyInfo('Traitement en cours...', 2000); // 2 secondes
      await apiCall();
      notifySuccess('Opération réussie !');
    } catch (error) {
      notifyError('Erreur : ' + error.message);
    }
  };
  
  return <button onClick={handleAction}>Action</button>;
}
```

### **Types de Notifications :**
```javascript
// Succès (vert) - Auto-dismiss 4s
notifySuccess('Évaluation sauvegardée avec succès !');

// Erreur (rouge) - Auto-dismiss 6s  
notifyError('Impossible de connecter au serveur');

// Warning (orange) - Auto-dismiss 5s
notifyWarning('Fichier volumineux, traitement plus long');

// Info (bleu) - Auto-dismiss personnalisé
notifyInfo('Analyse IA en cours...', 3000); // 3 secondes
```

### **Options Avancées :**
```javascript
// Notification persistante (pas d'auto-dismiss)
notifyError('Erreur critique', 0);

// Avec action personnalisée
notifyWarning('Connexion instable', 5000, {
  action: {
    label: 'Réessayer',
    onClick: () => reconnect()
  }
});
```

---

## ⚡ **3. ÉTATS DE CHARGEMENT - `components/LoadingStates.jsx`**

### **Spinner Valorix :**
```javascript
import { ValorixSpinner } from './components/LoadingStates';

// Tailles disponibles
<ValorixSpinner size="sm" />   // 16x16px
<ValorixSpinner size="md" />   // 24x24px (défaut)
<ValorixSpinner size="lg" />   // 32x32px
<ValorixSpinner size="xl" />   // 48x48px

// Avec classes personnalisées
<ValorixSpinner size="lg" className="mx-auto my-8" />
```

### **Bouton de Chargement :**
```javascript
import { LoadingButton } from './components/LoadingStates';

const [isLoading, setIsLoading] = useState(false);

<LoadingButton 
  loading={isLoading}
  onClick={handleSubmit}
  variant="primary"     // primary, secondary, outline, ghost
  size="md"            // sm, md, lg, xl
  disabled={!isValid}
  className="w-full"
>
  {isLoading ? 'Connexion...' : 'Se connecter'}
</LoadingButton>
```

### **Skeleton Screens :**
```javascript
import { SkeletonCard, SkeletonMetricCard } from './components/LoadingStates';

// Pour cartes génériques
<SkeletonCard className="h-32" />

// Pour métriques dashboard
<SkeletonMetricCard />

// Pattern de chargement
{isLoading ? (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[1,2,3].map(i => <SkeletonMetricCard key={i} />)}
  </div>
) : (
  <MetricsGrid data={data} />
)}
```

### **Overlays et Progress :**
```javascript
import { LoadingOverlay, ProgressBar, PageLoading } from './components/LoadingStates';

// Overlay complet avec spinner
<LoadingOverlay 
  visible={isProcessing}
  message="Analyse en cours..."
/>

// Barre de progression
<ProgressBar 
  progress={uploadProgress} 
  variant="success"
  showPercentage
/>

// Chargement de page
{isTransitioning && <PageLoading />}
```

---

## 🛡️ **4. GESTION D'ERREURS - `components/ErrorStates.jsx`**

### **Input Validé :**
```javascript
import { ValidatedInput, useFormValidation, validationRules } from './components/ErrorStates';

const formValidation = useFormValidation({
  email: [validationRules.required, validationRules.email],
  password: [validationRules.required, validationRules.password]
});

<ValidatedInput
  label="Email"
  type="email"
  value={formData.email}
  onChange={(e) => setFormData({...formData, email: e.target.value})}
  error={formValidation.errors.email}
  required
  placeholder="votre@email.com"
/>
```

### **Règles de Validation :**
```javascript
// Règles prédéfinies
validationRules.required        // Champ obligatoire
validationRules.email          // Format email valide
validationRules.password       // Min 8 chars, maj, min, chiffre
validationRules.siret          // Format SIRET français
validationRules.phone          // Format téléphone français

// Règle personnalisée
const customRule = (value) => {
  if (value.length < 5) return 'Minimum 5 caractères';
  return null; // Pas d'erreur
};
```

### **États d'Erreur :**
```javascript
import { NotFoundError, NetworkError, EmptyState } from './components/ErrorStates';

// Page 404 / Ressource introuvable
<NotFoundError 
  title="Évaluation introuvable"
  message="Cette évaluation n'existe pas ou a été supprimée"
  onRetry={() => navigate('/dashboard')}
  retryLabel="Retour au dashboard"
/>

// Erreur réseau
<NetworkError 
  onRefresh={handleRefresh}
  onRetry={handleRetry}
/>

// État vide avec action
<EmptyState
  icon={FileText}
  title="Aucune évaluation"
  message="Vous n'avez pas encore créé d'évaluation"
  actionLabel="Créer une évaluation"
  onAction={startNewEvaluation}
/>
```

### **Erreur de Formulaire :**
```javascript
import { FormError } from './components/ErrorStates';

<FormError 
  message="Veuillez corriger les erreurs ci-dessus"
  errors={['Email invalide', 'Mot de passe trop court']}
/>
```

---

## ♿ **5. ACCESSIBILITÉ - `components/AccessibilityComponents.jsx`**

### **Provider d'Accessibilité :**
```javascript
import { AccessibilityProvider } from './components/AccessibilityComponents';

function App() {
  return (
    <AccessibilityProvider>
      <ToastProvider>
        <YourApp />
      </ToastProvider>
    </AccessibilityProvider>
  );
}
```

### **Navigation Clavier :**
```javascript
import { FocusTrap, useKeyboardNavigation } from './components/AccessibilityComponents';

// Modal avec focus trap
<FocusTrap isActive={isModalOpen}>
  <Modal onEscape={closeModal}>
    <input autoFocus />
    <button onClick={handleSave}>Sauvegarder</button>
    <button onClick={closeModal}>Annuler</button>
  </Modal>
</FocusTrap>

// Navigation dans une liste
const { currentIndex, handleKeyDown } = useKeyboardNavigation(items.length);

<ul onKeyDown={handleKeyDown}>
  {items.map((item, index) => (
    <li 
      key={item.id}
      className={index === currentIndex ? 'bg-blue-100' : ''}
      tabIndex={0}
    >
      {item.name}
    </li>
  ))}
</ul>
```

### **Support Lecteurs d'Écran :**
```javascript
import { ScreenReaderText, LiveRegion } from './components/AccessibilityComponents';

// Texte pour lecteurs d'écran uniquement
<button>
  <Save className="w-4 h-4" />
  <ScreenReaderText>Sauvegarder l'évaluation</ScreenReaderText>
</button>

// Annonces dynamiques
<LiveRegion politeness="polite">
  {statusMessage}
</LiveRegion>

// Usage avec notifications
const notifyAccessible = (message) => {
  notifySuccess(message);
  announceToScreenReader(message);
};
```

### **Préférences Utilisateur :**
```javascript
import { useAccessibility } from './components/AccessibilityComponents';

function MyComponent() {
  const { 
    preferences, 
    toggleHighContrast, 
    adjustFontSize,
    toggleReduceMotion 
  } = useAccessibility();
  
  return (
    <div className={preferences.highContrast ? 'high-contrast' : ''}>
      <button onClick={toggleHighContrast}>
        {preferences.highContrast ? 'Contraste normal' : 'Contraste élevé'}
      </button>
    </div>
  );
}
```

---

## 🔄 **PATTERNS D'UTILISATION RECOMMANDÉS**

### **Pattern : Action avec Feedback Complet**
```javascript
const handleSaveEvaluation = async () => {
  setIsLoading(true);
  
  try {
    notifyInfo('Sauvegarde en cours...');
    await saveEvaluation(data);
    notifySuccess('Évaluation sauvegardée avec succès !');
    announceToScreenReader('Évaluation sauvegardée');
  } catch (error) {
    notifyError('Erreur lors de la sauvegarde');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

<LoadingButton
  loading={isLoading}
  onClick={handleSaveEvaluation}
  variant="primary"
>
  Sauvegarder
</LoadingButton>
```

### **Pattern : Formulaire Validé**
```javascript
const RegisterForm = () => {
  const formValidation = useFormValidation({
    email: [validationRules.required, validationRules.email],
    password: [validationRules.required, validationRules.password]
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formValidation.validateForm(formData)) {
      notifyError('Veuillez corriger les erreurs');
      return;
    }
    
    // ... logique de soumission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <ValidatedInput
        label="Email"
        type="email"
        error={formValidation.errors.email}
        required
      />
      <ValidatedInput
        label="Mot de passe"
        type="password"
        error={formValidation.errors.password}
        required
      />
      <LoadingButton type="submit" loading={isLoading}>
        S'inscrire
      </LoadingButton>
    </form>
  );
};
```

### **Pattern : Liste avec États**
```javascript
const EvaluationsList = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadEvaluations()
      .then(setEvaluations)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }
  
  if (error) {
    return <NetworkError onRetry={handleRetry} />;
  }
  
  if (evaluations.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Aucune évaluation"
        message="Commencez par créer votre première évaluation"
        actionLabel="Nouvelle évaluation"
        onAction={startNewEvaluation}
      />
    );
  }
  
  return (
    <div className="space-y-4">
      {evaluations.map(evaluation => (
        <EvaluationCard key={evaluation.id} evaluation={evaluation} />
      ))}
    </div>
  );
};
```

---

## 🚀 **DÉMARRAGE RAPIDE**

### **1. Wrapper Principal**
```javascript
// App.jsx
import { ToastProvider } from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <YourAppContent />
    </ToastProvider>
  );
}
```

### **2. Utilisation de Base**
```javascript
// Dans vos composants
import { useNotification } from './components/Toast';
import { LoadingButton } from './components/LoadingStates';
import { ValidatedInput } from './components/ErrorStates';

// Et utilisez selon les patterns !
```

---

## 📞 **SUPPORT ET DÉVELOPPEMENT**

Ces composants sont conçus pour être **extensibles** et **maintenables**. 

- **Design system centralisé** → Modification globale facile
- **Hooks réutilisables** → Logique séparée de l'UI  
- **Props configurables** → Adaptation aux besoins spécifiques
- **Accessibilité native** → Conformité WCAG 2.1 AA

Pour toute question ou amélioration, référez-vous aux fichiers sources qui contiennent des commentaires détaillés et des exemples d'utilisation. 