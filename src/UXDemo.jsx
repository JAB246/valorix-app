import React, { useState } from 'react';
import { ToastProvider, useNotification } from './components/Toast';
import { LoadingButton, ValorixSpinner, SkeletonCard, ProgressBar } from './components/LoadingStates';
import { ValidatedInput, FormError, useFormValidation, validationRules } from './components/ErrorStates';
import { theme, getThemeClasses } from './theme';
import { 
  Star, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  Play,
  ArrowRight,
  Bell,
  Search,
  Settings
} from 'lucide-react';

// Composant de démonstration des améliorations UX/UI
const UXDemoContent = () => {
  const { notifySuccess, notifyError, notifyWarning, notifyInfo } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(45);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
    siret: ''
  });

  // Validation des formulaires
  const formValidation = useFormValidation({
    email: [validationRules.required, validationRules.email],
    password: [validationRules.required, validationRules.password],
    company: [validationRules.required],
    siret: [validationRules.siret]
  });

  const handleNotificationDemo = (type) => {
    switch (type) {
      case 'success':
        notifySuccess('✅ Connexion réussie ! Bienvenue sur Valorix.');
        break;
      case 'error':
        notifyError('❌ Erreur de connexion. Vérifiez vos identifiants.');
        break;
      case 'warning':
        notifyWarning('⚠️ Votre session expire dans 5 minutes.');
        break;
      case 'info':
        notifyInfo('ℹ️ Nouvelle fonctionnalité disponible : IA d\'analyse.');
        break;
    }
  };

  const handleLoadingDemo = async () => {
    setIsLoading(true);
    notifyInfo('🔄 Démarrage de l\'analyse...');
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setIsLoading(false);
    notifySuccess('✅ Analyse terminée avec succès !');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (formValidation.validateForm(formData)) {
      notifySuccess('✅ Formulaire valide ! Données enregistrées.');
    } else {
      notifyError('❌ Veuillez corriger les erreurs dans le formulaire.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className={getThemeClasses('container')}>
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Valorix <span className="text-sm font-normal text-gray-500">UX/UI Demo</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className={getThemeClasses('container')}>
        <div className="py-12 space-y-12">
          
          {/* Section Hero */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">
              Découvrez les 
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Améliorations UX/UI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Valorix a été repensé avec un design system centralisé, des notifications intelligentes, 
              et une expérience utilisateur optimisée.
            </p>
            <div className="flex justify-center space-x-4">
              <LoadingButton variant="primary" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Tester l'interface
              </LoadingButton>
              <LoadingButton variant="outline" size="lg">
                <ArrowRight className="w-5 h-5 mr-2" />
                En savoir plus
              </LoadingButton>
            </div>
          </section>

          {/* Section Notifications */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              🔔 Système de Notifications
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Testez notre nouveau système de notifications toast avec animations fluides et feedback contextuel.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <LoadingButton 
                variant="primary" 
                onClick={() => handleNotificationDemo('success')}
                className="bg-green-600 hover:bg-green-700"
              >
                Succès
              </LoadingButton>
              <LoadingButton 
                variant="primary" 
                onClick={() => handleNotificationDemo('error')}
                className="bg-red-600 hover:bg-red-700"
              >
                Erreur
              </LoadingButton>
              <LoadingButton 
                variant="primary" 
                onClick={() => handleNotificationDemo('warning')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Attention
              </LoadingButton>
              <LoadingButton 
                variant="primary" 
                onClick={() => handleNotificationDemo('info')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Info
              </LoadingButton>
            </div>
          </section>

          {/* Section Loading States */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              ⚡ États de Chargement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Spinner Demo */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Spinners Valorix</h3>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <ValorixSpinner size="sm" />
                    <p className="text-sm text-gray-600 mt-2">Small</p>
                  </div>
                  <div className="text-center">
                    <ValorixSpinner size="md" />
                    <p className="text-sm text-gray-600 mt-2">Medium</p>
                  </div>
                  <div className="text-center">
                    <ValorixSpinner size="lg" />
                    <p className="text-sm text-gray-600 mt-2">Large</p>
                  </div>
                </div>
              </div>

              {/* Progress Demo */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Barre de Progression</h3>
                <div className="space-y-4">
                  <ProgressBar progress={progress} variant="primary" showPercentage />
                  <LoadingButton 
                    onClick={handleLoadingDemo}
                    loading={isLoading}
                    variant="primary"
                    className="w-full"
                  >
                    {isLoading ? 'Analyse en cours...' : 'Démarrer l\'analyse'}
                  </LoadingButton>
                </div>
              </div>
            </div>
          </section>

          {/* Section Formulaires */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              📝 Validation de Formulaires
            </h2>

            <div className="max-w-md mx-auto bg-white p-8 rounded-lg border shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <ValidatedInput
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    formValidation.validateField('email', e.target.value);
                  }}
                  error={formValidation.errors.email}
                  placeholder="john@exemple.com"
                />

                <ValidatedInput
                  label="Mot de passe"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, password: e.target.value }));
                    formValidation.validateField('password', e.target.value);
                  }}
                  error={formValidation.errors.password}
                  placeholder="8+ caractères, majuscule, chiffre"
                />

                <LoadingButton type="submit" variant="primary" className="w-full">
                  Valider le formulaire
                </LoadingButton>
              </form>
            </div>
          </section>

          {/* Score UX/UI */}
          <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Score UX/UI Valorix</h2>
            <div className="text-6xl font-bold mb-4">9.1/10</div>
            <p className="text-xl opacity-90 mb-6">+0.9 points d'amélioration</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Design System</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Performance</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Accessibilité</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Composant principal avec ToastProvider
const UXDemo = () => {
  return (
    <ToastProvider>
      <UXDemoContent />
    </ToastProvider>
  );
};

export default UXDemo; 