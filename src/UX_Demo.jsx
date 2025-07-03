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
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
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
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Découvrez nos nouveaux composants de loading avec spinner personnalisé Valorix et barres de progression.
            </p>

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
                  <div className="text-center">
                    <ValorixSpinner size="xl" />
                    <p className="text-sm text-gray-600 mt-2">XL</p>
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

            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <SkeletonCard>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </SkeletonCard>
              <SkeletonCard>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </SkeletonCard>
              <SkeletonCard>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </SkeletonCard>
            </div>
          </section>

          {/* Section Formulaires */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              📝 Validation de Formulaires
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Système de validation intelligent avec feedback en temps réel et messages d'erreur contextuels.
            </p>

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

                <ValidatedInput
                  label="Nom de l'entreprise"
                  required
                  value={formData.company}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, company: e.target.value }));
                    formValidation.validateField('company', e.target.value);
                  }}
                  error={formValidation.errors.company}
                  placeholder="Ma Société SAS"
                />

                <ValidatedInput
                  label="SIRET"
                  value={formData.siret}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, siret: e.target.value }));
                    formValidation.validateField('siret', e.target.value);
                  }}
                  error={formValidation.errors.siret}
                  placeholder="12345678901234"
                />

                <LoadingButton type="submit" variant="primary" className="w-full">
                  Valider le formulaire
                </LoadingButton>
              </form>
            </div>
          </section>

          {/* Section Design System */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              🎨 Design System Centralisé
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Palette de couleurs cohérente, typographie harmonisée, et composants réutilisables.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Boutons */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Boutons</h3>
                <div className="space-y-3">
                  <LoadingButton variant="primary" className="w-full">
                    Primary
                  </LoadingButton>
                  <LoadingButton variant="secondary" className="w-full">
                    Secondary
                  </LoadingButton>
                  <LoadingButton variant="outline" className="w-full">
                    Outline
                  </LoadingButton>
                  <LoadingButton variant="ghost" className="w-full">
                    Ghost
                  </LoadingButton>
                </div>
              </div>

              {/* Couleurs */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Couleurs</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                    <span className="text-sm">Primary</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    <span className="text-sm">Secondary</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Success</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Error</span>
                  </div>
                </div>
              </div>

              {/* Métriques */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Croissance
                </h3>
                <div className="text-3xl font-bold text-green-600 mb-2">+24.5%</div>
                <p className="text-sm text-gray-600">vs mois dernier</p>
              </div>

              {/* Satisfaction */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Satisfaction
                </h3>
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">4.9/5 étoiles</p>
              </div>
            </div>
          </section>

          {/* Score UX/UI */}
          <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Score UX/UI Valorix</h2>
            <div className="text-6xl font-bold mb-4">9.1/10</div>
            <p className="text-xl opacity-90 mb-6">+0.9 points d'amélioration grâce aux optimisations</p>
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
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Expérience</p>
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