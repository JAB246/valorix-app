import { useState, useRef, useEffect } from 'react';
import './App.css';

// Import des composants UX/UI améliorés
import { ToastProvider, useNotification } from './components/Toast';
import { getThemeClasses } from './theme';
import { 
  ValorixSpinner,
  LoadingButton,
  SkeletonCard,
  SkeletonMetricCard,
  LoadingOverlay,
  ProgressBar,
  PageLoading
} from './components/LoadingStates';
import {
  ValidatedInput,
  FormError,
  NotFoundError,
  NetworkError,
  ErrorBoundaryFallback,
  EmptyState,
  useFormValidation,
  validationRules
} from './components/ErrorStates';

// Import des icônes Lucide React
import {
  TrendingUp,
  BarChart3,
  Users,
  Award,
  Brain,
  Shield,
  Zap,
  Target,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Rocket,
  Globe,
  Lock,
  Activity,
  FileText,
  Settings,
  Bell,
  LogOut,
  Home,
  PieChart,
  FileBarChart,
  Link,
  Briefcase,
  User,
  CreditCard,
  Eye,
  EyeOff,
  ChevronDown,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  Clock,
  DollarSign,
  Percent,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  X,
  Menu,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  BookOpen, // Ajout pour l'onboarding
  Lightbulb, // Ajout pour l'onboarding
  ThumbsUp, // Ajout pour l'onboarding
  Calculator, // Ajout pour EvaluationModule
  FileSpreadsheet, // Ajout pour EvaluationModule
  Presentation, // Ajout pour EvaluationModule
  Database,
  Building, // Ajout pour ServicesPage
  Check, // Ajout pour PricingPage
  Scale,
  Mail, // Ajout pour FEC request
  Send, // Ajout pour FEC request
  Monitor, // Ajout pour Sessions
  Phone, // Ajout pour SMS notifications
  Palette, // Ajout pour l'onglet apparence
  Smartphone, // Ajout pour les services
  Share2, // Ajout pour les rapports
  Sun, // Ajout pour l'onglet apparence/thème
  Moon, // Ajout pour l'onglet apparence/thème
  MessageSquare, // Ajout pour les modules de la landing page
  MessageCircle // Ajout pour le support chat
} from 'lucide-react';



// Composant principal avec améliorations UX/UI
function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentDashboardPage, setCurrentDashboardPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    siret: '',
    sector: '',
    revenue: '',
    isEmailVerified: false
  });
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    siret: '',
    sector: '',
    revenue: ''
  });
  
  // Hook pour les notifications
  const { notifySuccess, notifyError, notifyWarning, notifyInfo } = useNotification();
  
  // Hook pour la validation des formulaires
  const formValidation = useFormValidation({
    email: [validationRules.required, validationRules.email],
    password: [validationRules.required, validationRules.password],
    firstName: [validationRules.required],
    lastName: [validationRules.required],
    company: [validationRules.required],
    siret: [validationRules.required, validationRules.siret]
  });

  // Navigation functions
  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  // Fonction pour valider le SIRET
  const validateSIRET = async (siret) => {
    // Simulation de validation SIRET (en production, utiliser une API réelle)
    if (siret.length === 14 && /^\d+$/.test(siret)) {
      return {
        valid: true,
        company: `Entreprise ${siret.substring(0, 6)}`,
        address: '123 Rue de la République, 75001 Paris'
      };
    }
    return { valid: false };
  };

  // Fonction pour gérer l'onboarding
  const handleOnboardingNext = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false);
      setCurrentDashboardPage('home');
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    setCurrentDashboardPage('home');
  };

  // Fonction pour démarrer une nouvelle évaluation
  const startNewEvaluation = () => {
    setCurrentDashboardPage('evaluation');
  };

  const handlePricingAction = (plan) => {
    // Redirection vers la page d'inscription avec le plan sélectionné
    setCurrentPage('auth');
    // Ici on pourrait stocker le plan sélectionné dans le state
    console.log(`Plan sélectionné: ${plan}`);
  };

  const handleContactSales = () => {
    // Ouverture d'un modal de contact ou redirection
    window.open('mailto:contact@valorix.fr?subject=Demande Enterprise Plan', '_blank');
  };

  const handleViewDemo = () => {
    // Démo interactive - scroll vers section fonctionnalités avec animation
    const element = document.getElementById('fonctionnalites');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Animation de mise en évidence
      element.style.animation = 'pulse 2s ease-in-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 2000);
    }
  };

  const handleSmoothScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation du formulaire
    if (!formValidation.validateForm(formData)) {
      notifyError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    setIsLoading(true);
    
    try {
      notifyInfo('Connexion en cours...', 2000);
      await new Promise(resolve => setTimeout(resolve, 1500));
      notifySuccess('Connexion réussie ! Vérification en cours...');
      setShow2FA(true);
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      notifyError('Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    // Vérifier que le code est complet
    if (code.some(digit => !digit)) {
      notifyError('Veuillez saisir le code de vérification complet');
      return;
    }
    
    setIsLoading(true);
    
    try {
      notifyInfo('Vérification du code...', 2000);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notifySuccess('Code vérifié ! Accès autorisé.');
      setIsAuthenticated(true);
      setShow2FA(false);
      
      // Vérifier si c'est la première connexion pour déclencher l'onboarding
      const isFirstLogin = localStorage.getItem('valorixFirstLogin') === null;
      if (isFirstLogin || !userProfile.firstName || !userProfile.company) {
        localStorage.setItem('valorixFirstLogin', 'false');
        notifyInfo('Bienvenue ! Configurons votre profil...');
        setShowOnboarding(true);
        setOnboardingStep(0);
        setCurrentPage('dashboard');
      } else {
        notifySuccess('Bon retour sur Valorix !');
        setCurrentPage('dashboard');
        setCurrentDashboardPage('home');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification 2FA:', error);
      notifyError('Code invalide. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    setShow2FA(false);
    setShowOnboarding(false);
    setCode(['', '', '', '', '', '']);
    setFormData({ email: '', password: '' });
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
    setShow2FA(false);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  VALORIX
                </span>
                <Sparkles className="w-4 h-4 text-purple-500 ml-1 opacity-60" />
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleSmoothScroll('fonctionnalites')}
                className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Fonctionnalités
              </button>
              <button 
                onClick={() => handleSmoothScroll('services')}
                className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Services
              </button>
              <button 
                onClick={() => handleSmoothScroll('temoignages')}
                className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Témoignages
              </button>
              <button 
                onClick={() => handleSmoothScroll('tarifs')}
                className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Tarifs
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <LoadingButton 
                onClick={handleGetStarted}
                variant="primary"
                className="shadow-lg hover:shadow-xl"
              >
                Se connecter
              </LoadingButton>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366F1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium rounded-full border border-indigo-200/50 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by AI & Blockchain
                <Rocket className="w-4 h-4 ml-2" />
              </div>
            </div>
            
            {/* Enhanced Brand Name */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                    VALORIX
                  </h1>
                  <p className="text-lg text-gray-600 font-medium tracking-wide">
                    Plateforme d'Évaluation d'Entreprise IA & Blockchain
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Maximisez la valeur de votre
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                patrimoine professionnel
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              <strong>Valorix</strong> combine intelligence artificielle adaptative, certification blockchain et écosystème de services financiers 
              pour <strong>optimiser et développer votre patrimoine d'entreprise</strong>. Constituez un dossier complet pour le financement, 
              la transmission ou la cession de votre entreprise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <LoadingButton 
                onClick={handleGetStarted}
                variant="primary"
                size="xl"
                className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="group-hover:animate-bounce">Commencer gratuitement</span>
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" />
              </LoadingButton>
              
              <LoadingButton 
                onClick={handleViewDemo}
                variant="secondary"
                size="xl"
                className="transition-all duration-300 hover:shadow-lg hover:bg-gray-50 group"
              >
                <Play className="w-5 h-5 mr-2 inline group-hover:scale-110 transition-transform duration-200" />
                Voir la démo
              </LoadingButton>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Gratuit sans carte bancaire
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Certification blockchain incluse
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Résultats en 5 minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-600 mb-8">Déjà adopté par plus de 15,000 entreprises</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                  15,000+
                </div>
                <div className="text-gray-600 font-medium">Entreprises évaluées</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                  €3.8B
                </div>
                <div className="text-gray-600 font-medium">Valorisations certifiées</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                  4.9/5
                </div>
                <div className="text-gray-600 flex items-center justify-center font-medium">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  (4,247 avis)
                </div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                  67.8M€
                </div>
                <div className="text-gray-600 font-medium">Services facilités</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Valorix</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Combinez la puissance de l'IA, la sécurité de la blockchain et l'expertise financière 
              pour des évaluations d'entreprise d'une précision inégalée.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <Calculator className="w-8 h-8 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors duration-300">6 Méthodes d'Évaluation</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                DCF, Multiples, Patrimoniale, Dividendes, CA et Goodwill adaptées à 6 contextes (Acquisition, LBO, IPO...)
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-600 group-hover:scale-105 transition-transform duration-300">95% de précision IA</div>
            </div>
            
            <div className="group p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/50 rounded-2xl cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <Shield className="w-8 h-8 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">Certification Blockchain</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Rapports horodatés et certifiés de manière immuable sur blockchain Solana avec hash unique
              </p>
              <div className="mt-4 text-sm font-medium text-green-600 group-hover:scale-105 transition-transform duration-300">Réseau Solana</div>
            </div>
            
            <div className="group p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/50 rounded-2xl cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <Brain className="w-8 h-8 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">7 Agents IA Spécialisés</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                PESTEL, SWOT, Porter, Canvas, Veille concurrentielle et Assistant IA avec DeepSeek
              </p>
              <div className="mt-4 text-sm font-medium text-purple-600 group-hover:scale-105 transition-transform duration-300">Multi-agents</div>
            </div>
            
            <div className="group p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50/50 rounded-2xl cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <FileText className="w-8 h-8 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">Rapports Professionnels</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Génération automatique de rapports détaillés, synthèses, présentations investisseurs et dataroom virtuel
              </p>
              <div className="mt-4 text-sm font-medium text-orange-600 group-hover:scale-105 transition-transform duration-300">Export PDF/PPTX</div>
            </div>
          </div>
          
          {/* Section détaillée des modules */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Architecture <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Multi-Modules</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez les modules avancés qui composent la suite Valorix
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Module d'Évaluation */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-indigo-900">Module d'Évaluation Avancé</h4>
                    <p className="text-indigo-700">Processus structuré en 5 étapes avec IA</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-indigo-800">
                    <CheckCircle className="w-4 h-4 mr-2 text-indigo-600 flex-shrink-0" />
                    <span><strong>6 contextes :</strong> Acquisition, LBO, IPO, Succession familiale, Vente, Périodique</span>
                  </div>
                  <div className="flex items-center text-sm text-indigo-800">
                    <CheckCircle className="w-4 h-4 mr-2 text-indigo-600 flex-shrink-0" />
                    <span><strong>6 méthodes :</strong> DCF, Multiples, Patrimoniale, Dividendes, CA, Goodwill</span>
                  </div>
                  <div className="flex items-center text-sm text-indigo-800">
                    <CheckCircle className="w-4 h-4 mr-2 text-indigo-600 flex-shrink-0" />
                    <span><strong>Configuration IA :</strong> Paramètres automatisés selon le contexte choisi</span>
                  </div>
                  <div className="flex items-center text-sm text-indigo-800">
                    <CheckCircle className="w-4 h-4 mr-2 text-indigo-600 flex-shrink-0" />
                    <span><strong>Résultats certifiés :</strong> Blockchain Solana + Dataroom virtuel</span>
                  </div>
                </div>
              </div>

              {/* Module Analytics IA */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900">Analytics IA Multi-Agents</h4>
                    <p className="text-blue-700">Architecture de 7 agents spécialisés</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-blue-800">
                    <Activity className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span><strong>Agent Extraction :</strong> Données financières automatiques (94% confiance)</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <Target className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span><strong>Analyses stratégiques :</strong> PESTEL, SWOT, Forces de Porter, Canvas</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span><strong>Veille concurrentielle :</strong> Temps réel + Sentiment de marché</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span><strong>Assistant IA :</strong> Chat conversationnel avancé avec DeepSeek</span>
                  </div>
                </div>
              </div>
              
              {/* Module Services Financiers */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-green-900">Services Financiers Intégrés</h4>
                    <p className="text-green-700">Accès direct aux partenaires financiers</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-green-800">
                    <Building className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span><strong>Partenaires bancaires :</strong> Accès facilité aux financements</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Shield className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span><strong>Assurances :</strong> Couverture risques et garanties</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Users className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span><strong>Réseau experts :</strong> Comptables, notaires, avocats d'affaires</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <DollarSign className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span><strong>Solutions de financement :</strong> Crédits, LBO, investissement</span>
                  </div>
                </div>
              </div>

              {/* Module Intégrations */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-orange-900">Intégrations & Connecteurs</h4>
                    <p className="text-orange-700">Import automatique des données</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-orange-800">
                    <FileText className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
                    <span><strong>Import FEC :</strong> Fichiers des Écritures Comptables automatique</span>
                  </div>
                  <div className="flex items-center text-sm text-orange-800">
                    <CreditCard className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
                    <span><strong>Connecteurs bancaires :</strong> Qonto, Stripe et autres partenaires</span>
                  </div>
                  <div className="flex items-center text-sm text-orange-800">
                    <Database className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
                    <span><strong>Logiciels comptables :</strong> Synchronisation temps réel</span>
                  </div>
                  <div className="flex items-center text-sm text-orange-800">
                    <Globe className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
                    <span><strong>APIs ouvertes :</strong> Intégration avec vos outils existants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Patrimoine Professionnel */}
      <section id="patrimoine" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Optimisez votre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">patrimoine professionnel</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Valorix vous accompagne dans la gestion stratégique de votre patrimoine d'entreprise 
              pour maximiser sa valeur et faciliter vos projets de transmission ou financement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Développez la valeur de votre patrimoine</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Identifiez les leviers d'optimisation et les stratégies d'amélioration pour accroître 
                    durablement la valeur de votre entreprise grâce à nos analyses IA prédictives.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Constituez votre dossier de financement</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Créez un dossier complet et professionnel pour le financement de la reprise, 
                    la transmission ou la cession de votre entreprise avec nos rapports certifiés blockchain.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Partagez en toute sécurité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Partagez vos données financières et évaluations de manière sécurisée avec vos partenaires 
                    de confiance : banques, assurances, experts-comptables, notaires et investisseurs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Écosystème Valorix</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Banques partenaires</span>
                  </div>
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Experts-comptables</span>
                  </div>
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Assurances</span>
                  </div>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <Scale className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Notaires</span>
                  </div>
                  <Check className="w-5 h-5 text-orange-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-indigo-900">Investisseurs</span>
                  </div>
                  <Check className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <p className="text-sm text-center text-gray-700">
                  <Lock className="w-4 h-4 inline mr-1" />
                  <strong>100% sécurisé</strong> - Partage confidentiel avec contrôle d'accès granulaire
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à valoriser votre patrimoine professionnel ?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Commencez dès aujourd'hui votre évaluation complète et découvrez le potentiel inexploité de votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LoadingButton 
                onClick={handleGetStarted}
                variant="primary"
                size="xl"
                className="shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Débuter mon évaluation
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </LoadingButton>
              
              <LoadingButton 
                onClick={() => handleSmoothScroll('services')}
                variant="secondary"
                size="xl"
                className="transition-all duration-300 hover:shadow-lg"
              >
                <Eye className="w-5 h-5 mr-2 inline" />
                Découvrir nos services
              </LoadingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Témoignages</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Ce que disent nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Marie Rousseau</h4>
                  <p className="text-sm text-gray-600">CEO, TechStart SAS</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Valorix a révolutionné notre approche de l'évaluation d'entreprise. En 24h, 
                nous avons obtenu une valorisation certifiée blockchain qui nous a permis 
                de lever 2,5M€. Incroyable précision !"
              </p>
              <div className="mt-4 text-sm text-indigo-600 font-medium">Levée de fonds réussie</div>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  PD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Pierre Dubois</h4>
                  <p className="text-sm text-gray-600">Dirigeant, InnoTech PME</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "L'IA de Valorix a identifié des leviers de croissance que nous n'avions 
                pas vus. En 6 mois, notre valorisation a augmenté de 40%. 
                Un investissement qui se rentabilise rapidement."
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium">+40% de valorisation</div>
            </div>

            {/* Témoignage 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SL
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sophie Laurent</h4>
                  <p className="text-sm text-gray-600">Fondatrice, DigitalCorp</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "La transmission de mon entreprise s'est faite en toute sérénité grâce 
                aux rapports détaillés de Valorix. Les notaires et banques ont 
                immédiatement validé nos documents."
              </p>
              <div className="mt-4 text-sm text-purple-600 font-medium">Transmission réussie</div>
            </div>

            {/* Témoignage 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Jean Martin</h4>
                  <p className="text-sm text-gray-600">Expert-comptable, Cabinet Martin</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "J'utilise Valorix pour tous mes clients. La synchronisation automatique 
                avec nos logiciels comptables et la certification blockchain font 
                la différence. Mes clients me remercient."
              </p>
              <div className="mt-4 text-sm text-orange-600 font-medium">100+ clients satisfaits</div>
            </div>

            {/* Témoignage 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  AL
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Amélie Leclerc</h4>
                  <p className="text-sm text-gray-600">Directrice, HealthTech Pro</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Interface intuitive, résultats en temps record et analyse IA pointue. 
                Valorix nous fait économiser des semaines de travail et nous donne 
                une crédibilité énorme face aux investisseurs."
              </p>
              <div className="mt-4 text-sm text-teal-600 font-medium">Gain de temps 80%</div>
            </div>

            {/* Témoignage 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  TG
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Thomas Garcia</h4>
                  <p className="text-sm text-gray-600">CFO, ManufacturingPlus</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "La precision des évaluations sectorielles de Valorix nous a aidés 
                à négocier notre acquisition dans les meilleures conditions. 
                ROI immédiat sur notre investissement."
              </p>
              <div className="mt-4 text-sm text-rose-600 font-medium">Acquisition optimisée</div>
            </div>
          </div>

          {/* Stats de satisfaction */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
                <div className="text-sm text-gray-600">Délai moyen de réponse</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">15,000+</div>
                <div className="text-sm text-gray-600">Entreprises évaluées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tarification</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Choisissez le plan qui correspond à vos besoins
            </p>
          </div>

          {/* Toggle billing period */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-xl">
              <div className="flex space-x-1">
                <button className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition-all duration-200">
                  Mensuel
                </button>
                <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-200">
                  Annuel
                  <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">-20%</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Plan Gratuit */}
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 relative">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gratuit</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">€0</div>
                <div className="text-gray-600 mb-6">pour toujours</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Accès aux services financiers</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Intégrations comptables basiques</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Support communautaire</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <span>Évaluation d'entreprise</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <span>Analyses IA</span>
                  </li>
                </ul>
                
                <button 
                  onClick={handleGetStarted}
                  className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 py-3 px-6 rounded-lg transition-all duration-200 font-medium"
                >
                  Commencer gratuitement
                </button>
              </div>
            </div>

            {/* Plan Essentiel */}
            <div className="bg-white p-8 rounded-2xl border-2 border-indigo-500 hover:border-indigo-600 transition-all duration-300 relative transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                  ⭐ POPULAIRE
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Essentiel</h3>
                <div className="text-4xl font-bold text-indigo-600 mb-1">€39</div>
                <div className="text-gray-600 mb-6">par mois</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">3 méthodes d'évaluation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">2 contextes (Acquisition/Vente)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">1 rapport blockchain/mois</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Analyses PESTEL et SWOT basiques</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Support prioritaire email</span>
                  </li>
                </ul>
                
                <button 
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Choisir Essentiel
                </button>
                
                <p className="text-sm text-gray-500 mt-3">Idéal pour les TPE</p>
              </div>
            </div>

            {/* Plan Business */}
            <div className="bg-white p-8 rounded-2xl border-2 border-purple-500 hover:border-purple-600 transition-all duration-300 relative">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
                <div className="text-4xl font-bold text-purple-600 mb-1">€129</div>
                <div className="text-gray-600 mb-6">par mois</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">6 méthodes d'évaluation complètes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Tous contextes (LBO, IPO, Succession...)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Rapports blockchain illimités</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">7 agents IA (Porter, Canvas, Veille...)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Support téléphonique</span>
                  </li>
                </ul>
                
                <button 
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Choisir Business
                </button>
                
                <p className="text-sm text-gray-500 mt-3">Pour les PME</p>
              </div>
            </div>

            {/* Plan Premium */}
            <div className="bg-white p-8 rounded-2xl border-2 border-yellow-500 hover:border-yellow-600 transition-all duration-300 relative">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-1">€399</div>
                <div className="text-gray-600 mb-6">par mois</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Dataroom virtuel professionnel</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Export PDF/PPTX personnalisés</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Intégrations comptables avancées</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Assistant IA DeepSeek premium</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Support 24/7 dédié + CSM</span>
                  </li>
                </ul>
                
                <button 
                  onClick={handleContactSales}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Contacter les ventes
                </button>
                
                <p className="text-sm text-gray-500 mt-3">Pour les ETI</p>
              </div>
            </div>
          </div>

          {/* FAQ Pricing */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Questions fréquentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Puis-je changer de plan à tout moment ?</h4>
                <p className="text-gray-600">Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements prennent effet immédiatement.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Y a-t-il des frais cachés ?</h4>
                <p className="text-gray-600">Non, nos tarifs sont transparents. Aucun frais d'installation, de configuration ou de résiliation.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Qu'est-ce que la certification blockchain ?</h4>
                <p className="text-gray-600">Chaque évaluation est horodatée et certifiée sur la blockchain, garantissant son authenticité et son immutabilité.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Proposez-vous une période d'essai ?</h4>
                <p className="text-gray-600">Le plan Gratuit vous permet de tester nos services financiers. Pour l'évaluation, nous offrons une garantie satisfait ou remboursé 30 jours.</p>
              </div>
            </div>
          </div>

          {/* Entreprise CTA */}
          <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Besoin d'une solution sur mesure ?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Pour les grandes entreprises et groupes, nous proposons des solutions personnalisées 
              avec API dédiée, intégrations sur mesure et support premium.
            </p>
            <button 
              onClick={handleContactSales}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Discuter avec nos experts
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Transformez votre patrimoine professionnel en avantage concurrentiel
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Rejoignez les milliers d'entrepreneurs qui maximisent la valeur de leur entreprise 
            et facilitent leurs projets de financement avec Valorix.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-indigo-100">
            <div className="flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-3" />
              <span>Valorisation optimisée</span>
            </div>
            <div className="flex items-center justify-center">
              <Shield className="w-6 h-6 mr-3" />
              <span>Partage sécurisé</span>
            </div>
            <div className="flex items-center justify-center">
              <Users className="w-6 h-6 mr-3" />
              <span>Réseau partenaires</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="bg-white text-indigo-600 hover:bg-gray-50 px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Évaluer mon patrimoine
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            
            <button 
              onClick={() => handleSmoothScroll('services')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
            >
              Découvrir les services
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  // Auth Page Component - Amélioré avec auto-focus et connexion sociale
  const AuthPage = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const codeRefs = useRef([]);

    // Auto-focus sur le premier champ au chargement
    useEffect(() => {
      if (!show2FA && emailRef.current) {
        emailRef.current.focus();
      }
    }, [show2FA]);

    // Auto-focus entre les champs du code 2FA
    const handleCodeChange = (index, value) => {
      if (value.length <= 1) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        
        // Auto-focus sur le champ suivant
        if (value && index < 5) {
          codeRefs.current[index + 1]?.focus();
        }
      }
    };

    // Gestion du backspace pour revenir au champ précédent
    const handleCodeKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        codeRefs.current[index - 1]?.focus();
      }
    };

    // Auto-focus sur mot de passe après email
    const handleEmailKeyDown = (e) => {
      if (e.key === 'Enter' && passwordRef.current) {
        e.preventDefault();
        passwordRef.current.focus();
      }
    };

    // Connexion sociale
    const handleSocialLogin = (provider) => {
      setIsLoading(true);
      // Simulation de connexion sociale
      setTimeout(() => {
        setIsLoading(false);
        setIsAuthenticated(true);
        setCurrentPage('dashboard');
      }, 2000);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <button 
              onClick={handleBackToHome}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Retour à l'accueil
            </button>
            
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {show2FA ? 'Authentification à deux facteurs' : 'Connexion à Valorix'}
            </h1>
            <p className="text-gray-600">
              {show2FA 
                ? 'Saisissez le code à 6 chiffres envoyé sur votre téléphone'
                : 'Accédez à votre tableau de bord Valorix'
              }
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
            {!show2FA ? (
              <div className="space-y-6">
                {/* Connexion sociale */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    aria-label="Se connecter avec Google"
                    className="group w-full flex items-center justify-center px-6 py-3.5 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="relative">
                      {isLoading ? (
                        <div className="w-5 h-5 mr-3 animate-spin">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="2" fill="none"/>
                            <path d="M12 2 A10 10 0 0 1 22 12" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round"/>
                          </svg>
                        </div>
                      ) : (
                        <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 48 48">
                          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-800 font-semibold text-base group-hover:text-gray-900 transition-colors">
                      {isLoading ? 'Connexion...' : 'Continuer avec Google'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleSocialLogin('microsoft')}
                    disabled={isLoading}
                    aria-label="Se connecter avec Microsoft"
                    className="group w-full flex items-center justify-center px-6 py-3.5 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="relative">
                      {isLoading ? (
                        <div className="w-5 h-5 mr-3 animate-spin">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="2" fill="none"/>
                            <path d="M12 2 A10 10 0 0 1 22 12" stroke="#0078d4" strokeWidth="2" fill="none" strokeLinecap="round"/>
                          </svg>
                        </div>
                      ) : (
                        <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 48 48">
                          <path fill="#ff5722" d="M6 6H22V22H6z"/>
                          <path fill="#4caf50" d="M26 6H42V22H26z"/>
                          <path fill="#ffeb3b" d="M6 26H22V42H6z"/>
                          <path fill="#03a9f4" d="M26 26H42V42H26z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-800 font-semibold text-base group-hover:text-gray-900 transition-colors">
                      {isLoading ? 'Connexion...' : 'Continuer avec Microsoft'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                    className="group w-full flex items-center justify-center px-6 py-3.5 border-2 border-gray-300 rounded-xl hover:border-gray-400 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Se connecter avec Apple"
                  >
                    <div className="flex items-center justify-center">
                      {isLoading ? (
                        <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" style={{ fill: '#000000' }} viewBox="0 0 24 24">
                          <path fill="#000000" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                          <path fill="#000000" d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-900 font-bold text-base group-hover:text-black transition-colors">
                      {isLoading ? 'Connexion...' : 'Continuer avec Apple'}
                    </span>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                {/* Formulaire de connexion */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email
                    </label>
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      onKeyDown={handleEmailKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                      placeholder="votre@email.com"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <input
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                      placeholder="••••••••"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Code de vérification
                  </label>
                  <div className="flex justify-center space-x-3">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (codeRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          index === 0 ? 'border-orange-400 bg-orange-50' :
                          index === 1 ? 'border-purple-400 bg-purple-50' :
                          index === 2 ? 'border-teal-400 bg-teal-50' :
                          index === 3 ? 'border-pink-400 bg-pink-50' :
                          index === 4 ? 'border-indigo-400 bg-indigo-50' :
                          'border-orange-400 bg-orange-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShow2FA(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-all duration-200"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleVerify2FA}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isLoading ? 'Vérification...' : 'Vérifier'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Getting Started Page - Guide d'onboarding pour alimenter l'outil
  const GetStartedPage = ({ userProfile, setCurrentDashboardPage }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const steps = [
      {
        id: 0,
        title: 'Informations Entreprise',
        description: 'Renseignez les données de base de votre entreprise',
        icon: Building,
        color: 'from-blue-500 to-indigo-600',
        required: true,
        completed: completedSteps.includes(0),
        action: () => setCurrentDashboardPage('profile')
      },
      {
        id: 1,
        title: 'Données Financières',
        description: 'Importez vos états financiers et comptabilité',
        icon: FileText,
        color: 'from-green-500 to-emerald-600',
        required: true,
        completed: completedSteps.includes(1),
        action: () => setCurrentDashboardPage('profile')
      },
      {
        id: 2,
        title: 'Configuration IA',
        description: 'Paramétrez les agents d\'analyse intelligents',
        icon: Brain,
        color: 'from-purple-500 to-pink-600',
        required: false,
        completed: completedSteps.includes(2),
        action: () => setCurrentDashboardPage('analytics')
      },
      {
        id: 3,
        title: 'Première Évaluation',
        description: 'Lancez votre première évaluation d\'entreprise',
        icon: Calculator,
        color: 'from-orange-500 to-red-600',
        required: true,
        completed: completedSteps.includes(3),
        action: () => setCurrentDashboardPage('evaluation')
      }
    ];

    const progressPercentage = (completedSteps.length / steps.filter(s => s.required).length) * 100;

    const handleStepComplete = (stepId) => {
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps(prev => [...prev, stepId]);
      }
    };

    const handleQuickAction = (action) => {
      setIsLoading(true);
      setTimeout(() => {
        action();
        setIsLoading(false);
      }, 500);
    };

    return (
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚀 Bienvenue dans Valorix !
          </h1>
          <p className="text-gray-600 mb-6">
            Suivez ce guide pour configurer votre outil d'évaluation d'entreprise et commencer vos analyses.
          </p>
          
          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            Progression : {completedSteps.length} / {steps.filter(s => s.required).length} étapes requises
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            const isCompleted = step.completed;
            
            return (
              <div
                key={step.id}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : step.required 
                      ? 'border-gray-300 hover:border-indigo-300 cursor-pointer' 
                      : 'border-gray-200 bg-gray-50'
                }`}
                onClick={() => !isCompleted && handleQuickAction(step.action)}
              >
                <div className="flex items-start">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mr-4 shadow-lg`}>
                    {isCompleted ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <IconComponent className="w-8 h-8 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      {step.required && !isCompleted && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                          Requis
                        </span>
                      )}
                      {isCompleted && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">
                          ✓ Terminé
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {!isCompleted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAction(step.action);
                        }}
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : (
                          <ArrowRight className="w-4 h-4 mr-2" />
                        )}
                        Commencer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-8">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">🎯 Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleQuickAction(() => setCurrentDashboardPage('profile'))}
              className="flex items-center p-4 bg-white rounded-lg border border-indigo-200 hover:border-indigo-400 transition-colors"
            >
              <Upload className="w-6 h-6 text-indigo-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Importer Données</div>
                <div className="text-sm text-gray-600">Fichiers FEC, bilans...</div>
              </div>
            </button>
            
            <button
              onClick={() => handleQuickAction(() => setCurrentDashboardPage('evaluation'))}
              className="flex items-center p-4 bg-white rounded-lg border border-indigo-200 hover:border-indigo-400 transition-colors"
            >
              <Zap className="w-6 h-6 text-indigo-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Évaluation Express</div>
                <div className="text-sm text-gray-600">Résultats en 5 min</div>
              </div>
            </button>
            
            <button
              onClick={() => handleQuickAction(() => setCurrentDashboardPage('analytics'))}
              className="flex items-center p-4 bg-white rounded-lg border border-indigo-200 hover:border-indigo-400 transition-colors"
            >
              <Brain className="w-6 h-6 text-indigo-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900">IA Analytics</div>
                <div className="text-sm text-gray-600">Analyses prédictives</div>
              </div>
            </button>
          </div>
        </div>

        {/* Help & Resources */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📚 Ressources & Aide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">🎥 Tutoriels Vidéo</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Play className="w-4 h-4 mr-2 text-indigo-600" />
                  Configuration initiale (3 min)
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Play className="w-4 h-4 mr-2 text-indigo-600" />
                  Import de données financières (5 min)
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Play className="w-4 h-4 mr-2 text-indigo-600" />
                  Première évaluation (8 min)
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">📋 Documentation</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                  Guide d'utilisation complet
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                  FAQ et résolution de problèmes
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                  Méthodes de valorisation
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Support 24/7
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Réserver une démo
            </button>
          </div>
        </div>

        {/* CTA to Dashboard */}
        {progressPercentage >= 75 && (
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                🎉 Configuration presque terminée !
              </h3>
              <p className="text-green-700 mb-4">
                Vous êtes prêt à utiliser Valorix. Accédez à votre tableau de bord pour commencer vos analyses.
              </p>
              <button
                onClick={() => setCurrentDashboardPage('home')}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Accéder au Tableau de Bord
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Dashboard Component - Page d'accueil après connexion
  const Dashboard = ({ userProfile, currentDashboardPage, setCurrentDashboardPage, onLogout }) => {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bonjour {userProfile.firstName || 'Utilisateur'} ! 👋
          </h1>
          <p className="text-gray-600">Bienvenue sur votre tableau de bord Valorix</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            onClick={() => setCurrentDashboardPage('evaluation')}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Calculator className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Nouvelle Évaluation</h3>
            <p className="text-indigo-100 text-sm">Lancez une évaluation complète de votre entreprise</p>
          </div>

          <div
            onClick={() => setCurrentDashboardPage('analytics')}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Brain className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Analytics IA</h3>
            <p className="text-blue-100 text-sm">Analyses stratégiques avec intelligence artificielle</p>
          </div>

          <div
            onClick={() => setCurrentDashboardPage('reports')}
            className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Rapports</h3>
            <p className="text-green-100 text-sm">Consultez vos rapports d'évaluation</p>
          </div>

          <div
            onClick={() => setCurrentDashboardPage('services')}
            className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Briefcase className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Services</h3>
            <p className="text-orange-100 text-sm">Accédez à l'écosystème de services</p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Évaluations</h3>
                <div className="text-3xl font-bold text-indigo-600">3</div>
                <p className="text-sm text-gray-600">Évaluations complétées</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Valorisation</h3>
                <div className="text-3xl font-bold text-green-600">€2.4M</div>
                <p className="text-sm text-gray-600">Dernière évaluation</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Précision IA</h3>
                <div className="text-3xl font-bold text-purple-600">94%</div>
                <p className="text-sm text-gray-600">Confiance moyenne</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Évaluation DCF complétée
                </p>
                <p className="text-xs text-gray-600">Valorisation: €2.4M • Il y a 2 jours</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Analyse PESTEL générée
                </p>
                <p className="text-xs text-gray-600">7 insights stratégiques • Il y a 3 jours</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Certification blockchain confirmée
                </p>
                <p className="text-xs text-gray-600">Hash: 0x7f8a9b... • Il y a 3 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardWrapper = () => {
    const renderCurrentPage = () => {
      switch(currentDashboardPage) {
        case 'getting-started':
          return (
            <GetStartedPage 
              userProfile={userProfile}
              setCurrentDashboardPage={setCurrentDashboardPage}
            />
          );
        case 'home':
        case 'dashboard':
          return (
            <Dashboard 
              userProfile={userProfile}
              currentDashboardPage={currentDashboardPage}
              setCurrentDashboardPage={setCurrentDashboardPage}
              onLogout={handleLogout}
            />
          );
        case 'evaluation':
          return <EvaluationModulePage />;
        case 'analytics':
          return <AnalyticsAIPage />;
        case 'reports':
          return <ReportsPage />;
        case 'services':
          return <ServicesPage />;
        case 'profile':
          return <ProfilePage />;
        case 'settings':
          return <SettingsPage />;
        default:
          return (
            <Dashboard 
              userProfile={userProfile}
              currentDashboardPage={currentDashboardPage}
              setCurrentDashboardPage={setCurrentDashboardPage}
              onLogout={handleLogout}
            />
          );
      }
    };

    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VALORIX
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <button
                onClick={() => setCurrentDashboardPage('getting-started')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'getting-started' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Rocket className="w-5 h-5 mr-3" />
                Démarrage
              </button>

              <button
                onClick={() => setCurrentDashboardPage('home')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'home' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                Tableau de bord
              </button>

              <button
                onClick={() => setCurrentDashboardPage('profile')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'profile' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                Profil
              </button>

              <button
                onClick={() => setCurrentDashboardPage('evaluation')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'evaluation' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Calculator className="w-5 h-5 mr-3" />
                Évaluation
              </button>

              <button
                onClick={() => setCurrentDashboardPage('analytics')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'analytics' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Analytics IA
              </button>

              <button
                onClick={() => setCurrentDashboardPage('reports')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'reports' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FileText className="w-5 h-5 mr-3" />
                Rapports
              </button>

              <button
                onClick={() => setCurrentDashboardPage('services')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'services' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Services
              </button>

              <button
                onClick={() => setCurrentDashboardPage('settings')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  currentDashboardPage === 'settings' 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Paramètres
              </button>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </div>
      </div>
    );
  };

  // Evaluation Module Page Component - Processus moderne en 5 étapes
  const EvaluationModulePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedEvaluationType, setSelectedEvaluationType] = useState(null);
    const [selectedMethods, setSelectedMethods] = useState([]);
    const [evaluationConfig, setEvaluationConfig] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [evaluationResults, setEvaluationResults] = useState(null);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [showPlanComptableConverter, setShowPlanComptableConverter] = useState(false);

    const steps = [
      {
        id: 0,
        title: 'Type d\'Évaluation',
        description: 'Sélectionnez le contexte et l\'objectif de votre évaluation',
        icon: Target,
        color: 'from-blue-500 to-indigo-600'
      },
      {
        id: 1,
        title: 'Méthodes de Valorisation',
        description: 'Choisissez les approches d\'évaluation adaptées',
        icon: Calculator,
        color: 'from-purple-500 to-pink-600'
      },
      {
        id: 2,
        title: 'Configuration',
        description: 'Paramètres et hypothèses d\'évaluation',
        icon: Settings,
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 3,
        title: 'Traitement IA',
        description: 'Analyse par intelligence artificielle avancée',
        icon: Brain,
        color: 'from-orange-500 to-red-600'
      },
      {
        id: 4,
        title: 'Résultats',
        description: 'Rapport d\'évaluation certifié blockchain',
        icon: Award,
        color: 'from-teal-500 to-cyan-600'
      }
    ];

    const evaluationTypes = [
      {
        id: 'acquisition',
        title: 'Acquisition / Rachat',
        description: 'Évaluation dans le cadre d\'une acquisition ou d\'un rachat d\'entreprise',
        icon: Building,
        color: 'from-blue-500 to-indigo-600',
        scenarios: ['Due diligence', 'Négociation prix', 'Audit acquisition'],
        timeline: '2-4 semaines',
        complexity: 'Élevée'
      },
      {
        id: 'succession',
        title: 'Succession Familiale',
        description: 'Transmission d\'entreprise familiale et planification patrimoniale',
        icon: Users,
        color: 'from-green-500 to-emerald-600',
        scenarios: ['Donation', 'Succession', 'Démembrement'],
        timeline: '3-6 semaines',
        complexity: 'Très élevée'
      },
      {
        id: 'lbo',
        title: 'LBO / MBO',
        description: 'Leverage Buy-Out ou Management Buy-Out',
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-600',
        scenarios: ['Structure financière', 'Plan de financement', 'Sortie investisseurs'],
        timeline: '4-8 semaines',
        complexity: 'Très élevée'
      },
      {
        id: 'ipo',
        title: 'Introduction en Bourse',
        description: 'Préparation IPO et valorisation pré-cotation',
        icon: Globe,
        color: 'from-orange-500 to-red-600',
        scenarios: ['Roadshow', 'Pricing IPO', 'Communication financière'],
        timeline: '6-12 semaines',
        complexity: 'Maximale'
      },
      {
        id: 'sale',
        title: 'Vente à un Tiers',
        description: 'Cession à un acquéreur externe stratégique ou financier',
        icon: Briefcase,
        color: 'from-teal-500 to-cyan-600',
        scenarios: ['Process de vente', 'Négociation', 'Closing'],
        timeline: '3-5 semaines',
        complexity: 'Élevée'
      },
      {
        id: 'valuation',
        title: 'Évaluation Périodique',
        description: 'Valorisation annuelle pour reporting ou contrôle de gestion',
        icon: Calendar,
        color: 'from-indigo-500 to-purple-600',
        scenarios: ['Reporting annuel', 'Suivi performance', 'Pilotage stratégique'],
        timeline: '1-2 semaines',
        complexity: 'Moyenne'
      }
    ];

    const valuationMethods = [
      {
        id: 'dcf',
        name: 'DCF - Discounted Cash Flow',
        description: 'Méthode patrimoniale basée sur l\'actualisation des flux futurs',
        complexity: 'Élevée',
        accuracy: 95,
        recommended: true,
        icon: TrendingUp,
        timeline: '3-5 jours'
      },
      {
        id: 'multiples',
        name: 'Méthode des Multiples',
        description: 'Comparaison avec des sociétés cotées et transactions récentes',
        complexity: 'Moyenne',
        accuracy: 85,
        recommended: true,
        icon: BarChart3,
        timeline: '1-2 jours'
      },
      {
        id: 'assets',
        name: 'Valeur Patrimoniale',
        description: 'Méthode basée sur la valeur des actifs nets réévalués',
        complexity: 'Faible',
        accuracy: 70,
        recommended: false,
        icon: Building,
        timeline: '2-3 jours'
      },
      {
        id: 'dividend',
        name: 'Capitalisation des Dividendes',
        description: 'Valorisation basée sur la capacité distributive',
        complexity: 'Moyenne',
        accuracy: 75,
        recommended: false,
        icon: DollarSign,
        timeline: '1-2 jours'
      },
      {
        id: 'revenue',
        name: 'Multiples de Chiffre d\'Affaires',
        description: 'Valorisation simple basée sur le CA et ratios sectoriels',
        complexity: 'Faible',
        accuracy: 65,
        recommended: false,
        icon: Percent,
        timeline: '1 jour'
      },
      {
        id: 'goodwill',
        name: 'Méthode du Goodwill',
        description: 'Évaluation de la survaleur et des actifs incorporels',
        complexity: 'Élevée',
        accuracy: 80,
        recommended: false,
        icon: Star,
        timeline: '2-4 jours'
      }
    ];

    const handleEvaluationTypeSelect = (type) => {
      setSelectedEvaluationType(type);
      // Auto-recommandation de méthodes selon le type
      if (type.id === 'acquisition' || type.id === 'lbo') {
        setSelectedMethods(['dcf', 'multiples']);
      } else if (type.id === 'succession') {
        setSelectedMethods(['dcf', 'assets', 'multiples']);
      } else if (type.id === 'ipo') {
        setSelectedMethods(['dcf', 'multiples', 'revenue']);
      } else {
        setSelectedMethods(['dcf', 'multiples']);
      }
      setCurrentStep(1);
    };

    const handleMethodToggle = (methodId) => {
      setSelectedMethods(prev => 
        prev.includes(methodId) 
          ? prev.filter(id => id !== methodId)
          : [...prev, methodId]
      );
    };

    const handleConfigurationNext = () => {
      setCurrentStep(2);
    };

    const handleStartEvaluation = () => {
      setIsProcessing(true);
      setCurrentStep(3);
      setProcessingProgress(0);
      
      // Simulation du processus d'évaluation avec progression
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
        setEvaluationResults({
              valuation: {
                central: 2400000,
                low: 2100000,
                high: 2700000
              },
              confidenceLevel: 94,
              methods: selectedMethods,
              breakdown: {
                dcf: 2350000,
                multiples: 2450000,
                assets: 2100000,
                dividend: 2200000,
                revenue: 2300000,
                goodwill: 2500000
              },
              kpis: {
                revenue: 1200000,
                ebitda: 280000,
                ebitdaMargin: 23.3,
                growth: 18.5,
                roe: 22.1,
                debt: 470000,
                equity: 420000
              },
              blockchain: {
                certified: true,
                network: 'Solana',
                hash: '0x7f8a9b2c3e5d7a1f9c8e2d4b6a3f7e1c...',
                timestamp: new Date().toISOString(),
                blockHeight: 245678901
              },
              reports: {
                detailed: 'rapport-evaluation-detaille.pdf',
                summary: 'synthese-valorisation.pdf',
                presentation: 'presentation-investisseurs.pptx',
                dataroom: 'dataroom-virtuel-link.html'
              },
              recommendations: [
                'Optimisation de la structure financière pour réduire le coût du capital',
                'Développement de nouvelles lignes de revenus récurrents',
                'Amélioration des marges opérationnelles par automatisation',
                'Renforcement des barrières à l\'entrée concurrentielle'
              ],
              risks: [
                'Concentration client à surveiller (35% du CA)',
                'Dépendance technologique aux fournisseurs clés',
                'Volatilité sectorielle et cycles économiques',
                'Réglementation en évolution (RGPD, PCI-DSS)'
          ]
        });
        setIsProcessing(false);
            setCurrentStep(4);
            return 100;
          }
          return prev + 1.5;
        });
      }, 80);
    };

    const handlePlanComptableConversion = () => {
      setIsProcessing(true);
      setShowPlanComptableConverter(false);
      
      setTimeout(() => {
        setIsProcessing(false);
        // Simulation d'une conversion réussie
        alert('Conversion vers PCG 2025 réussie ! Données mises à jour.');
      }, 2000);
    };

    const renderStepContent = () => {
      switch (currentStep) {
        case 0:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quel est l'objectif de votre évaluation ?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Sélectionnez le contexte de votre évaluation pour adapter les méthodes de valorisation 
                  et optimiser la précision de l'analyse IA.
                </p>
                        </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {evaluationTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <div
                      key={type.id}
                      onClick={() => handleEvaluationTypeSelect(type)}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedEvaluationType?.id === type.id
                          ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                      </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                        
                        <div className="space-y-2 w-full">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Durée:</span>
                            <span className="font-medium text-gray-700">{type.timeline}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Complexité:</span>
                            <span className={`font-medium ${
                              type.complexity === 'Maximale' ? 'text-red-600' :
                              type.complexity === 'Très élevée' ? 'text-orange-600' :
                              type.complexity === 'Élevée' ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {type.complexity}
                            </span>
                  </div>
                </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 w-full">
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Scénarios typiques:</h4>
                          <div className="flex flex-wrap gap-1">
                            {type.scenarios.map((scenario, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                              >
                                {scenario}
                              </span>
                            ))}
                          </div>
                  </div>

                        {selectedEvaluationType?.id === type.id && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}
                </div>
                    </div>
                  );
                })}
              </div>

              {selectedEvaluationType && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedEvaluationType.color} flex items-center justify-center mr-4`}>
                      <selectedEvaluationType.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-900">{selectedEvaluationType.title}</h3>
                      <p className="text-sm text-indigo-700">Méthodes recommandées et configuration optimisée</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Continuer vers les Méthodes
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </button>
                    </div>
                    </div>
              )}
                    </div>
          );

        case 1:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sélectionnez vos Méthodes de Valorisation</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choisissez les approches d'évaluation les plus adaptées à votre contexte. 
                  Les méthodes recommandées sont pré-sélectionnées.
                </p>
                  </div>

              {selectedEvaluationType && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200 mb-6">
                        <div className="flex items-center">
                    <selectedEvaluationType.icon className="w-6 h-6 text-indigo-600 mr-3" />
                          <div>
                      <h3 className="font-semibold text-indigo-900">Contexte: {selectedEvaluationType.title}</h3>
                      <p className="text-sm text-indigo-700">Méthodes optimisées pour ce type d'évaluation</p>
                          </div>
                        </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {valuationMethods.map((method) => {
                  const IconComponent = method.icon;
                  const isSelected = selectedMethods.includes(method.id);
                  const isRecommended = method.recommended;
                  
                  return (
                    <div
                      key={method.id}
                      onClick={() => handleMethodToggle(method.id)}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      {isRecommended && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            <Star className="w-3 h-3 mr-1" />
                            Recommandé
                          </span>
                        </div>
                      )}
                      
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}

                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl ${
                          isSelected ? 'bg-indigo-600' : 'bg-gray-400'
                        } flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Précision:</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${method.accuracy}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700">{method.accuracy}%</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-gray-500">Complexité:</span>
                                <span className={`ml-2 font-medium ${
                                  method.complexity === 'Élevée' ? 'text-orange-600' :
                                  method.complexity === 'Moyenne' ? 'text-yellow-600' :
                                  'text-green-600'
                                }`}>
                                  {method.complexity}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Durée:</span>
                                <span className="ml-2 font-medium text-gray-700">{method.timeline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedMethods.length > 0 && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Méthodes Sélectionnées ({selectedMethods.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {selectedMethods.map((methodId) => {
                      const method = valuationMethods.find(m => m.id === methodId);
                      const IconComponent = method.icon;
                      return (
                        <div key={methodId} className="flex items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <IconComponent className="w-5 h-5 text-indigo-600 mr-3" />
                          <span className="text-sm font-medium text-indigo-900">{method.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1 inline" />
                      Retour au Type
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Configuration
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration de l'Évaluation</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Ajustez les paramètres et hypothèses pour optimiser la précision de votre évaluation.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres Financiers</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Taux d'actualisation (%)</label>
                      <input 
                        type="number" 
                        defaultValue="8.5"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Croissance perpétuelle (%)</label>
                      <input 
                        type="number" 
                        defaultValue="2.5"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Horizon de prévision (années)</label>
                      <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      >
                        <option value="5">5 ans</option>
                        <option value="7">7 ans</option>
                        <option value="10">10 ans</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hypothèses Sectorielles</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Multiples sectoriels</label>
                      <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      >
                        <option value="auto">Détection automatique</option>
                        <option value="tech">Technologie / SaaS</option>
                        <option value="industry">Industrie</option>
                        <option value="service">Services</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prime de risque pays (%)</label>
                      <input 
                        type="number" 
                        defaultValue="0.5"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ajustement liquidité (%)</label>
                      <input 
                        type="number" 
                        defaultValue="-10"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Récapitulatif de Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedMethods.length}</div>
                    <div className="text-sm text-blue-700">Méthodes sélectionnées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedEvaluationType?.timeline || 'N/A'}
                    </div>
                    <div className="text-sm text-blue-700">Durée estimée</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-blue-700">Précision attendue</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1 inline" />
                  Retour aux Méthodes
                </button>
                
                <button
                  onClick={handleStartEvaluation}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors"
                >
                  Lancer l'Évaluation IA
                  <TrendingUp className="w-4 h-4 ml-2 inline" />
                </button>
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Traitement IA en Cours</h3>
                <p className="text-gray-600">Analyse avancée par intelligence artificielle</p>
              </div>

              <div className="mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Progression Globale</h3>
                    <span className="text-2xl font-bold text-purple-600">{processingProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Récupération Données FEC', status: processingProgress > 5 ? 'completed' : 'processing', progress: Math.min(100, processingProgress * 5) },
                  { name: 'Analyse Financière IA', status: processingProgress > 20 ? 'completed' : processingProgress > 5 ? 'processing' : 'waiting', progress: Math.max(0, Math.min(100, (processingProgress - 5) * 6.67)) },
                  { name: 'Calcul Méthodes DCF/Multiples', status: processingProgress > 60 ? 'completed' : processingProgress > 20 ? 'processing' : 'waiting', progress: Math.max(0, Math.min(100, (processingProgress - 20) * 2.5)) },
                  { name: 'Certification Blockchain', status: processingProgress > 85 ? 'completed' : processingProgress > 60 ? 'processing' : 'waiting', progress: Math.max(0, Math.min(100, (processingProgress - 60) * 4)) }
                ].map((agent, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{agent.name}</h4>
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'completed' ? 'bg-green-500' :
                        agent.status === 'processing' ? 'bg-yellow-500 animate-pulse' :
                        'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${agent.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{agent.progress.toFixed(0)}%</div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights IA en Temps Réel</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-900">Données {selectedEvaluationType?.title.toLowerCase()} analysées</p>
                      <p className="text-xs text-gray-600">Confiance: {94 + Math.floor(processingProgress * 0.04)}%</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-900">{selectedMethods.length} méthodes de valorisation appliquées</p>
                      <p className="text-xs text-gray-600">DCF, Multiples, Actifs nets</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Target className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-900">Certification blockchain en cours</p>
                      <p className="text-xs text-gray-600">Réseau Solana - Hash en génération</p>
                    </div>
                  </div>
                </div>
              </div>

              {processingProgress >= 100 && (
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Traitement terminé avec succès
                  </div>
                </div>
              )}
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              {evaluationResults ? (
                <>
                  <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
                    <h3 className="text-2xl font-bold text-green-900 mb-2">Évaluation Complétée</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      €{(evaluationResults.valuation.central / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-green-700">
                      Fourchette: €{(evaluationResults.valuation.low / 1000000).toFixed(1)}M - €{(evaluationResults.valuation.high / 1000000).toFixed(1)}M
                    </p>
                    <div className="flex items-center justify-center mt-4">
                      <Brain className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-700">Confiance IA: {evaluationResults.confidenceLevel}%</span>
                    </div>
                  </div>

                  {/* Blockchain Certification */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-purple-900">Certification Blockchain</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-purple-700">Certifié {evaluationResults.blockchain.network}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-purple-700">Hash de transaction:</p>
                        <p className="text-xs font-mono text-purple-900 bg-purple-100 p-2 rounded">{evaluationResults.blockchain.hash}</p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-700">Bloc #{evaluationResults.blockchain.blockHeight}</p>
                        <p className="text-xs text-purple-600">{new Date(evaluationResults.blockchain.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Méthodes appliquées */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Résultats par Méthode</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMethods.map((methodId) => {
                        const method = valuationMethods.find(m => m.id === methodId);
                        const result = evaluationResults.breakdown[methodId];
                        const IconComponent = method.icon;
                        
                        return (
                          <div key={methodId} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <IconComponent className="w-5 h-5 text-indigo-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        </div>
                              <div className="text-lg font-bold text-indigo-600">
                                €{(result / 1000000).toFixed(1)}M
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                              <span>Précision</span>
                              <span>{method.accuracy}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${method.accuracy}%` }}
                            ></div>
                          </div>
                        </div>
                        );
                      })}
                      </div>
                  </div>

                  {/* KPIs Financiers */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicateurs Financiers Clés</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
                        <p className="text-xl font-bold text-blue-600">
                          €{(evaluationResults.kpis.revenue / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">EBITDA</p>
                        <p className="text-xl font-bold text-green-600">
                          €{(evaluationResults.kpis.ebitda / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-green-500">{evaluationResults.kpis.ebitdaMargin}%</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Croissance</p>
                        <p className="text-xl font-bold text-purple-600">
                          +{evaluationResults.kpis.growth}%
                        </p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">ROE</p>
                        <p className="text-xl font-bold text-orange-600">
                          {evaluationResults.kpis.roe}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                        Recommandations IA
                      </h3>
                      <div className="space-y-3">
                        {evaluationResults.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                        Facteurs de Risque
                      </h3>
                      <div className="space-y-3">
                        {evaluationResults.risks.map((risk, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{risk}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rapports et Documents */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapports Générés</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Rapport Détaillé</h4>
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Analyse complète avec méthodes et justifications</p>
                        <p className="text-xs text-gray-500 mb-3">PDF • 24 pages • Certifié blockchain</p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <Download className="w-4 h-4 mr-2 inline" />
                          Télécharger
                        </button>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Synthèse Exécutive</h4>
                          <Presentation className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Résumé pour la direction et investisseurs</p>
                        <p className="text-xs text-gray-500 mb-3">PPTX • 8 slides • Certifié blockchain</p>
                        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          <Download className="w-4 h-4 mr-2 inline" />
                          Télécharger
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Share2 className="w-4 h-4 mr-2 inline" />
                        Partager via DataRoom
                  </button>
                      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Shield className="w-4 h-4 mr-2 inline" />
                    Vérifier Blockchain
                  </button>
                </div>
              </div>

                  {/* Prochaines étapes */}
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
                    <h3 className="text-lg font-semibold text-teal-900 mb-4">Prochaines Étapes Recommandées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-teal-200">
                        <h4 className="font-medium text-teal-900 mb-2">Monitoring Continu</h4>
                        <p className="text-sm text-teal-700">Surveillance automatique de la valorisation avec alertes</p>
                  </div>
                      <div className="p-4 bg-white rounded-lg border border-teal-200">
                        <h4 className="font-medium text-teal-900 mb-2">Nouvelle Évaluation</h4>
                        <p className="text-sm text-teal-700">Programmation d'une réévaluation dans 6 mois</p>
                  </div>
                </div>
              </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Calcul en Cours</h3>
                  <p className="text-gray-600">Application des méthodes d'évaluation multiples</p>
                </div>
              )}
            </div>
          );



        default:
          return null;
      }
    };

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Module d'Évaluation</h1>
            <p className="text-gray-600 mt-1">Processus d'évaluation guidé par l'IA en 4 étapes</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Agents IA actifs</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? `bg-gradient-to-br ${step.color} border-transparent text-white` 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <h3 className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-96">
            {renderStepContent()}
          </div>
        </div>

        {/* Plan Comptable Converter Modal */}
        {showPlanComptableConverter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Conversion Plan Comptable
                </h3>
                <p className="text-gray-600 mb-6">
                  Conversion automatique vers le Plan Comptable Général 2025 pour une meilleure précision d'analyse.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowPlanComptableConverter(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handlePlanComptableConversion}
                    className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Convertir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Traitement en cours...
                </h3>
                <p className="text-gray-600">
                  Les agents IA analysent vos données
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );

    // Return statement principal pour EvaluationModulePage
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Module d'Évaluation</h1>
          <p className="text-gray-600">Évaluation d'entreprise avec IA et certification blockchain</p>
        </div>
        {renderStepContent()}
      </div>
    );
  };

  const AnalyticsAIPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [showAgentStatus, setShowAgentStatus] = useState(false);

    // Simulation des agents IA
    const agents = [
      { id: 'extraction', name: 'Agent Extraction Financière', status: 'active', confidence: 94, model: 'DeepSeek' },
      { id: 'veille', name: 'Agent Veille Sectorielle', status: 'active', confidence: 89, model: 'Perplexity' },
      { id: 'prediction', name: 'Agent Évaluation Prédictive', status: 'standby', confidence: 92, model: 'DeepSeek' },
      { id: 'blockchain', name: 'Agent Certification Blockchain', status: 'active', confidence: 98, model: 'Solana' },
      { id: 'recommendation', name: 'Agent Recommandation Financière', status: 'processing', confidence: 87, model: 'DeepSeek' },
      { id: 'strategic', name: 'Agent Analyse Stratégique', status: 'active', confidence: 91, model: 'DeepSeek' },
      { id: 'orchestrator', name: 'Orchestrateur', status: 'coordinating', confidence: 96, model: 'Multi-Agent' }
    ];

    const strategicAnalyses = [
      {
        id: 'pestel',
        name: 'Analyse PESTEL',
        description: 'Analyse des facteurs Politiques, Économiques, Sociaux, Technologiques, Environnementaux et Légaux',
        icon: Globe,
        color: 'from-blue-500 to-indigo-600',
        status: 'completed',
        confidence: 92,
        lastUpdate: '2024-06-09',
        insights: [
          { factor: 'Politique', score: 85, trend: 'stable', impact: 'Réglementation favorable aux PME' },
          { factor: 'Économique', score: 78, trend: 'positive', impact: 'Croissance du secteur +12%' },
          { factor: 'Social', score: 91, trend: 'positive', impact: 'Adoption digitale accélérée' },
          { factor: 'Technologique', score: 94, trend: 'positive', impact: 'IA et automatisation' },
          { factor: 'Environnemental', score: 73, trend: 'attention', impact: 'Transition écologique requise' },
          { factor: 'Légal', score: 88, trend: 'stable', impact: 'Conformité RGPD maintenue' }
        ]
      },
      {
        id: 'canvas',
        name: 'Business Model Canvas',
        description: 'Modélisation interactive de votre modèle d\'affaires',
        icon: Target,
        color: 'from-purple-500 to-pink-600',
        status: 'in_progress',
        confidence: 87,
        lastUpdate: '2024-06-09',
        components: [
          { name: 'Segments clients', completion: 95, insights: '3 segments principaux identifiés' },
          { name: 'Proposition de valeur', completion: 88, insights: 'Différenciation technologique forte' },
          { name: 'Canaux de distribution', completion: 72, insights: 'Optimisation digitale recommandée' },
          { name: 'Relations clients', completion: 91, insights: 'Fidélisation excellente (NPS: 67)' },
          { name: 'Sources de revenus', completion: 85, insights: 'Diversification en cours' },
          { name: 'Ressources clés', completion: 93, insights: 'Équipe technique de qualité' },
          { name: 'Activités clés', completion: 89, insights: 'R&D et développement commercial' },
          { name: 'Partenaires clés', completion: 76, insights: 'Élargissement du réseau nécessaire' },
          { name: 'Structure de coûts', completion: 82, insights: 'Optimisation possible sur 15%' }
        ]
      },
      {
        id: 'porter',
        name: 'Forces de Porter',
        description: 'Analyse des 5 forces concurrentielles de votre secteur',
        icon: Shield,
        color: 'from-green-500 to-emerald-600',
        status: 'completed',
        confidence: 89,
        lastUpdate: '2024-06-09',
        forces: [
          { name: 'Rivalité concurrentielle', intensity: 'Élevée', score: 75, analysis: 'Marché fragmenté avec plusieurs acteurs établis' },
          { name: 'Pouvoir des fournisseurs', intensity: 'Modérée', score: 45, analysis: 'Diversité des fournisseurs technologiques' },
          { name: 'Pouvoir des clients', intensity: 'Élevée', score: 70, analysis: 'Clients exigeants avec alternatives disponibles' },
          { name: 'Menace des substituts', intensity: 'Modérée', score: 55, analysis: 'Solutions alternatives émergentes' },
          { name: 'Barrières à l\'entrée', intensity: 'Élevée', score: 80, analysis: 'Investissements technologiques importants requis' }
        ]
      },
      {
        id: 'swot',
        name: 'Analyse SWOT',
        description: 'Forces, Faiblesses, Opportunités et Menaces',
        icon: TrendingUp,
        color: 'from-orange-500 to-red-600',
        status: 'completed',
        confidence: 94,
        lastUpdate: '2024-06-09',
        matrix: {
          strengths: [
            { item: 'Équipe technique experte', impact: 'high', priority: 1 },
            { item: 'Innovation produit continue', impact: 'high', priority: 2 },
            { item: 'Base clients fidèle', impact: 'medium', priority: 3 },
            { item: 'Positionnement marché unique', impact: 'high', priority: 1 }
          ],
          weaknesses: [
            { item: 'Ressources marketing limitées', impact: 'medium', priority: 2 },
            { item: 'Dépendance à quelques clients clés', impact: 'high', priority: 1 },
            { item: 'Processus opérationnels à optimiser', impact: 'medium', priority: 3 }
          ],
          opportunities: [
            { item: 'Expansion internationale', impact: 'high', priority: 1 },
            { item: 'Nouveaux segments de marché', impact: 'medium', priority: 2 },
            { item: 'Partenariats stratégiques', impact: 'high', priority: 1 },
            { item: 'Digitalisation accélérée', impact: 'medium', priority: 2 }
          ],
          threats: [
            { item: 'Concurrence des géants tech', impact: 'high', priority: 1 },
            { item: 'Évolution réglementaire', impact: 'medium', priority: 2 },
            { item: 'Récession économique potentielle', impact: 'high', priority: 1 }
          ]
        }
      }
    ];

    const competitiveIntelligence = {
      competitors: [
        { name: 'Concurrent A', marketShare: 23, growth: 12, threat: 'high', strengths: ['Marketing fort', 'Réseau étendu'] },
        { name: 'Concurrent B', marketShare: 18, growth: 8, threat: 'medium', strengths: ['Prix compétitifs', 'Support client'] },
        { name: 'Concurrent C', marketShare: 15, growth: 15, threat: 'high', strengths: ['Innovation', 'Partenariats'] }
      ],
      marketTrends: [
        { trend: 'Adoption IA', impact: 'positive', confidence: 89, timeframe: '6-12 mois' },
        { trend: 'Consolidation marché', impact: 'neutral', confidence: 76, timeframe: '12-24 mois' },
        { trend: 'Réglementation renforcée', impact: 'negative', confidence: 82, timeframe: '3-6 mois' }
      ]
    };

    const marketSentiment = {
      overall: 72,
      trends: [
        { period: 'Jan', sentiment: 65 },
        { period: 'Fév', sentiment: 68 },
        { period: 'Mar', sentiment: 71 },
        { period: 'Avr', sentiment: 69 },
        { period: 'Mai', sentiment: 74 },
        { period: 'Jun', sentiment: 72 }
      ],
      sources: [
        { source: 'Réseaux sociaux', sentiment: 78, volume: 1250 },
        { source: 'Presse spécialisée', sentiment: 69, volume: 89 },
        { source: 'Forums professionnels', sentiment: 71, volume: 456 },
        { source: 'Avis clients', sentiment: 85, volume: 234 }
      ]
    };

    const handleStartAnalysis = async (analysisType) => {
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      setSelectedAnalysis(analysisType);
      
      // Simulation du processus d'analyse
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setAnalysisProgress(i);
      }
      
      setIsAnalyzing(false);
      // Ajouter un message de l'assistant IA
      setChatMessages(prev => [...prev, {
        type: 'ai',
        content: `Analyse ${analysisType} terminée avec succès. Confiance IA: 94%. Voulez-vous que je vous explique les résultats clés ?`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    };

    const handleSendMessage = () => {
      if (!userInput.trim()) return;
      
      setChatMessages(prev => [...prev, {
        type: 'user',
        content: userInput,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      // Simulation de réponse IA
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          type: 'ai',
          content: `Excellente question ! Basé sur l'analyse de vos données financières des 3 dernières années et la veille sectorielle en temps réel, je recommande de vous concentrer sur l'optimisation de votre marge opérationnelle qui présente un potentiel d'amélioration de 12%. Souhaitez-vous que je détaille les actions spécifiques ?`,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, 1500);
      
      setUserInput('');
    };

    const renderAnalysisDetail = (analysis) => {
      switch (analysis.id) {
        case 'pestel':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{insight.factor}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.trend === 'positive' ? 'bg-green-100 text-green-800' :
                        insight.trend === 'stable' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {insight.trend}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Score</span>
                        <span>{insight.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${insight.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{insight.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        
        case 'canvas':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.components.map((component, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">{component.name}</h4>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Complétude</span>
                        <span>{component.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${component.completion}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{component.insights}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        
        case 'porter':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.forces.map((force, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{force.name}</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        force.intensity === 'Élevée' ? 'bg-red-100 text-red-800' :
                        force.intensity === 'Modérée' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {force.intensity}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Intensité</span>
                        <span>{force.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${force.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{force.analysis}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        
        case 'swot':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Forces
                  </h4>
                  <div className="space-y-2">
                    {analysis.matrix.strengths.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-900">{item.item}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.impact === 'high' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.impact}
                          </span>
                          <span className="text-xs text-gray-500">P{item.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Opportunités
                  </h4>
                  <div className="space-y-2">
                    {analysis.matrix.opportunities.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-900">{item.item}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.impact === 'high' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.impact}
                          </span>
                          <span className="text-xs text-gray-500">P{item.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Faiblesses
                  </h4>
                  <div className="space-y-2">
                    {analysis.matrix.weaknesses.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-900">{item.item}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.impact === 'high' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.impact}
                          </span>
                          <span className="text-xs text-gray-500">P{item.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Menaces
                  </h4>
                  <div className="space-y-2">
                    {analysis.matrix.threats.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-900">{item.item}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.impact === 'high' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.impact}
                          </span>
                          <span className="text-xs text-gray-500">P{item.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        
        default:
          return <div>Analyse en cours de développement...</div>;
      }
    };

    return (
      <div className="space-y-8">
        {/* Header avec statut des agents */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics IA</h1>
            <p className="text-gray-600 mt-1">Architecture multi-agents pour analyses stratégiques avancées</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAgentStatus(!showAgentStatus)}
              className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Activity className="w-4 h-4 mr-2" />
              Statut Agents
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">7 agents actifs</span>
            </div>
          </div>
        </div>

        {/* Statut des agents (collapsible) */}
        {showAgentStatus && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Architecture Multi-Agents Valorix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <div key={agent.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{agent.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-green-500' :
                      agent.status === 'processing' ? 'bg-yellow-500 animate-pulse' :
                      agent.status === 'coordinating' ? 'bg-blue-500 animate-pulse' :
                      'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Modèle: {agent.model}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Confiance</span>
                    <span className="font-medium text-gray-900">{agent.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${agent.confidence}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation par onglets */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
                { id: 'strategic', label: 'Analyses Stratégiques', icon: Target },
                { id: 'competitive', label: 'Veille Concurrentielle', icon: Shield },
                { id: 'sentiment', label: 'Sentiment Marché', icon: TrendingUp },
                { id: 'simulation', label: 'Simulation Impact', icon: Activity },
                { id: 'assistant', label: 'Assistant IA', icon: Brain }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-blue-900">Analyses Complétées</h3>
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">12/15</div>
                    <div className="text-sm text-blue-700">80% de progression</div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-green-900">Confiance IA Moyenne</h3>
                      <Brain className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-900 mb-2">91%</div>
                    <div className="text-sm text-green-700">Très élevée</div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-purple-900">Recommandations</h3>
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">8</div>
                    <div className="text-sm text-purple-700">Actions prioritaires</div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-orange-900">Dernière Mise à Jour</h3>
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-3xl font-bold text-orange-900 mb-2">2min</div>
                    <div className="text-sm text-orange-700">Temps réel</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Analyses Stratégiques Disponibles</h3>
                    <div className="space-y-3">
                      {strategicAnalyses.map((analysis) => (
                        <div key={analysis.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 bg-gradient-to-br ${analysis.color} rounded-lg flex items-center justify-center mr-3`}>
                              <analysis.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{analysis.name}</h4>
                              <p className="text-sm text-gray-600">{analysis.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                              analysis.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {analysis.status === 'completed' ? 'Terminé' :
                               analysis.status === 'in_progress' ? 'En cours' : 'En attente'}
                            </div>
                            <button
                              onClick={() => handleStartAnalysis(analysis.name)}
                              className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Voir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Recommandations IA Prioritaires</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-medium text-green-900">Optimisation Marge Opérationnelle</h4>
                            <p className="text-sm text-green-700 mt-1">
                              Potentiel d'amélioration de 12% identifié sur vos coûts de structure.
                            </p>
                            <div className="flex items-center mt-2 text-xs text-green-600">
                              <Brain className="w-3 h-3 mr-1" />
                              Confiance: 94% | DeepSeek
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-medium text-blue-900">Expansion Géographique</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              Marché allemand présente une opportunité de croissance de 28%.
                            </p>
                            <div className="flex items-center mt-2 text-xs text-blue-600">
                              <Globe className="w-3 h-3 mr-1" />
                              Confiance: 87% | Perplexity
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-medium text-orange-900">Surveillance Trésorerie</h4>
                            <p className="text-sm text-orange-700 mt-1">
                              Ratio d'endettement approche 65%. Attention aux prochains trimestres.
                            </p>
                            <div className="flex items-center mt-2 text-xs text-orange-600">
                              <DollarSign className="w-3 h-3 mr-1" />
                              Confiance: 91% | DeepSeek
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'strategic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {strategicAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer"
                         onClick={() => setSelectedAnalysis(analysis)}>
                      <div className={`w-12 h-12 bg-gradient-to-br ${analysis.color} rounded-xl flex items-center justify-center mb-4`}>
                        <analysis.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{analysis.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{analysis.description}</p>
                      <div className="flex items-center justify-between">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                          analysis.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {analysis.status === 'completed' ? 'Terminé' :
                           analysis.status === 'in_progress' ? 'En cours' : 'En attente'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {analysis.confidence}% confiance
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedAnalysis && (
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${selectedAnalysis.color} rounded-xl flex items-center justify-center mr-4`}>
                          <selectedAnalysis.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedAnalysis.name}</h2>
                          <p className="text-gray-600">{selectedAnalysis.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Confiance IA</div>
                          <div className="text-xl font-bold text-gray-900">{selectedAnalysis.confidence}%</div>
                        </div>
                        <button
                          onClick={() => setSelectedAnalysis(null)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    {renderAnalysisDetail(selectedAnalysis)}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'competitive' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                      Analyse Concurrentielle
                    </h3>
                    <div className="space-y-4">
                      {competitiveIntelligence.competitors.map((competitor, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{competitor.name}</h4>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              competitor.threat === 'high' ? 'bg-red-100 text-red-800' :
                              competitor.threat === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              Menace {competitor.threat}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Part de marché:</span>
                              <span className="font-medium text-gray-900 ml-1">{competitor.marketShare}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Croissance:</span>
                              <span className="font-medium text-gray-900 ml-1">+{competitor.growth}%</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-gray-600">Forces clés:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {competitor.strengths.map((strength, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Tendances Marché
                    </h3>
                    <div className="space-y-4">
                      {competitiveIntelligence.marketTrends.map((trend, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{trend.trend}</h4>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              trend.impact === 'positive' ? 'bg-green-100 text-green-800' :
                              trend.impact === 'negative' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {trend.impact}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Confiance:</span>
                              <span className="font-medium text-gray-900 ml-1">{trend.confidence}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Horizon:</span>
                              <span className="font-medium text-gray-900 ml-1">{trend.timeframe}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-600" />
                    Veille Automatisée (Perplexity AI)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Sources Surveillées</h4>
                      <div className="text-2xl font-bold text-blue-900 mb-1">247</div>
                      <div className="text-sm text-blue-700">Sites web et publications</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Alertes Aujourd'hui</h4>
                      <div className="text-2xl font-bold text-green-900 mb-1">12</div>
                      <div className="text-sm text-green-700">Nouvelles pertinentes</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-900 mb-2">Score Veille</h4>
                      <div className="text-2xl font-bold text-purple-900 mb-1">94/100</div>
                      <div className="text-sm text-purple-700">Couverture sectorielle</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sentiment' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                      Sentiment Global du Marché
                    </h3>
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold text-indigo-600 mb-2">{marketSentiment.overall}/100</div>
                      <div className="text-lg text-gray-600">Score de sentiment</div>
                      <div className="text-sm text-gray-500">Plutôt positif</div>
                    </div>
                    <div className="space-y-3">
                      {marketSentiment.trends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{trend.period}</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${trend.sentiment}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-8">{trend.sentiment}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                      Analyse par Source
                    </h3>
                    <div className="space-y-4">
                      {marketSentiment.sources.map((source, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{source.source}</h4>
                            <div className="text-sm text-gray-600">{source.volume} mentions</div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  source.sentiment >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                  source.sentiment >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                                  'bg-gradient-to-r from-red-500 to-pink-600'
                                }`}
                                style={{ width: `${source.sentiment}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{source.sentiment}/100</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Insights Sentiment IA</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-green-900">Tendance Positive</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Le sentiment s'améliore depuis 3 mois, notamment sur les réseaux sociaux (+15%).
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-blue-900">Opportunité Communication</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            La presse spécialisée montre un sentiment plus faible. Renforcer les relations presse.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-purple-900">Recommandation</h4>
                          <p className="text-sm text-purple-700 mt-1">
                            Capitaliser sur les avis clients positifs (85/100) pour améliorer l'image globale.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'simulation' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    Simulation d'Impact Décisionnel
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Scénarios Disponibles</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'Augmentation prix +10%', impact: '+€240K CA', confidence: 87 },
                          { name: 'Embauche 2 commerciaux', impact: '+€180K CA', confidence: 82 },
                          { name: 'Expansion Allemagne', impact: '+€450K CA', confidence: 74 },
                          { name: 'Lancement produit B2C', impact: '+€320K CA', confidence: 69 }
                        ].map((scenario, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900">{scenario.name}</h5>
                              <div className="text-sm font-medium text-green-600">{scenario.impact}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Confiance IA: {scenario.confidence}%</span>
                              <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors">
                                Simuler
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Résultats de Simulation</h4>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h5 className="font-medium text-purple-900 mb-3">Scénario: Expansion Allemagne</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Impact CA (12 mois)</span>
                            <span className="font-medium text-gray-900">+€450,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Investissement initial</span>
                            <span className="font-medium text-gray-900">€120,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">ROI estimé</span>
                            <span className="font-medium text-green-600">+275%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Délai de retour</span>
                            <span className="font-medium text-gray-900">8 mois</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Niveau de risque</span>
                            <span className="font-medium text-orange-600">Modéré</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">Recommandations IA</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Commencer par un partenariat local</li>
                          <li>• Adapter l'offre aux spécificités allemandes</li>
                          <li>• Prévoir 6 mois de développement commercial</li>
                          <li>• Budget marketing initial: €25,000</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assistant' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 h-96 flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Assistant IA Valorix</h3>
                        <p className="text-sm text-gray-600">Propulsé par DeepSeek - Conseil stratégique personnalisé</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">En ligne</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-sm text-gray-900">
                            Bonjour ! Je suis votre assistant IA spécialisé en analyse stratégique. 
                            J'ai analysé vos données financières des 3 dernières années et je peux vous aider à :
                          </p>
                          <ul className="text-sm text-gray-700 mt-2 space-y-1">
                            <li>• Interpréter vos analyses PESTEL, SWOT, Porter</li>
                            <li>• Recommander des actions stratégiques prioritaires</li>
                            <li>• Simuler l'impact de vos décisions</li>
                            <li>• Analyser votre positionnement concurrentiel</li>
                          </ul>
                          <p className="text-sm text-gray-600 mt-2">
                            Que souhaitez-vous analyser en priorité ?
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Assistant IA • Il y a quelques secondes</div>
                      </div>
                    </div>

                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex items-start ${message.type === 'user' ? 'justify-end' : ''}`}>
                        {message.type === 'ai' && (
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className={`flex-1 max-w-xs ${message.type === 'user' ? 'order-1' : ''}`}>
                          <div className={`rounded-lg p-3 ${
                            message.type === 'user' 
                              ? 'bg-indigo-600 text-white ml-auto' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                            {message.type === 'user' ? 'Vous' : 'Assistant IA'} • {message.timestamp}
                          </div>
                        </div>
                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-3 mt-1 order-2">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Posez votre question stratégique..."
                        className="flex-1 px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500 text-sm"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!userInput.trim()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>Collecte conversationnelle activée</span>
                      <span>DeepSeek • Confiance: 96%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Questions Suggérées</h4>
                    <div className="space-y-2">
                      {[
                        "Comment améliorer ma marge opérationnelle ?",
                        "Quelle stratégie d'expansion recommandez-vous ?",
                        "Comment me différencier de la concurrence ?"
                      ].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setUserInput(question)}
                          className="w-full text-left p-2 text-sm text-blue-700 hover:bg-blue-100 rounded transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Analyses Récentes</h4>
                    <div className="space-y-2 text-sm text-green-700">
                      <div>• Analyse SWOT mise à jour</div>
                      <div>• Veille concurrentielle (2h)</div>
                      <div>• Simulation expansion (1j)</div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Capacités IA</h4>
                    <div className="space-y-2 text-sm text-purple-700">
                      <div>• Analyse prédictive avancée</div>
                      <div>• Recommandations personnalisées</div>
                      <div>• Apprentissage continu</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Indicateur de progression pour les analyses en cours */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analyse en cours...
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedAnalysis} • Architecture multi-agents activée
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  {analysisProgress}% • Agents DeepSeek et Perplexity actifs
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AnalyticsPage = () => {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics IA</h1>
          <p className="text-gray-600">Analyses stratégiques et intelligence artificielle avancée</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Analyses Disponibles</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Modules IA actifs</div>
          </div>
        </div>
      </div>
    );
  };

  // Composants des pages manquants
  const ReportsPage = () => {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Rapports Certifiés</h1>
          <p className="text-gray-600">Génération de rapports d'évaluation et de reprenabilité avec certification blockchain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Certifié
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Rapports Certifiés</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
            <div className="text-sm text-gray-600">+3 ce mois</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Évaluation
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Évaluations</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
            <div className="text-sm text-gray-600">Blockchain certifiées</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Reprenabilité
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reprenabilité</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
            <div className="text-sm text-gray-600">Analyses succession</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Performance
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Temps Génération</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">2.4h</div>
            <div className="text-sm text-gray-600">Moyenne optimisée</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                Actif
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Téléchargements</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-sm text-gray-600">+12 cette semaine</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Historique des Rapports</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { id: 1, company: "TechStart SAS", type: "Évaluation", template: "Acquisition 2024", date: "2024-06-08", value: "€2.4M", status: "Certifié", hash: "0x7f8a9b2c...", network: "Solana" },
                { id: 2, company: "InnovCorp", type: "Reprenabilité", template: "Succession Familiale", date: "2024-06-05", value: "€1.8M", status: "Certifié", hash: "0x3e5d7a1f...", network: "Solana" },
                { id: 3, company: "GreenTech SARL", type: "Évaluation", template: "LBO/MBO", date: "2024-06-02", value: "€3.2M", status: "En cours", hash: "0x9c4b8e6d...", network: "Solana" },
                { id: 4, company: "FamilyCorp", type: "Reprenabilité", template: "Vente Externe", date: "2024-05-28", value: "€950K", status: "Certifié", hash: "0x1a4c6e2b...", network: "Solana" },
                { id: 5, company: "StartupTech", type: "Évaluation", template: "IPO Préparation", date: "2024-05-22", value: "€4.2M", status: "Certifié", hash: "0x8f3d9a5e...", network: "Solana" }
              ].map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      report.type === 'Reprenabilité' 
                        ? 'bg-gradient-to-br from-orange-500 to-red-600' 
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                    }`}>
                      {report.type === 'Reprenabilité' ? (
                        <Building className="w-5 h-5 text-white" />
                      ) : (
                      <FileText className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.company}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          report.type === 'Reprenabilité' 
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {report.type}
                        </span>
                        <span>•</span>
                        <span>{report.template}</span>
                        <span>•</span>
                        <span>Valorisation: {report.value}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-900">{report.date}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        {report.network} • {report.hash}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report.status === 'Certifié' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };



  const ServicesPage = () => {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Services Partenaires</h1>
          <p className="text-gray-600">Accédez à notre écosystème de services financiers et de conseil</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Financement</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Partenaires actifs</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Assurance</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-600">Compagnies</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Conseil</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">15</div>
            <div className="text-sm text-gray-600">Experts certifiés</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Cession</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">6</div>
            <div className="text-sm text-gray-600">Spécialistes M&A</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Financement & Crédit</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "BPI France", type: "Financement public", rate: "2.5%", amount: "Jusqu'à €2M" },
                  { name: "Crédit Agricole", type: "Crédit professionnel", rate: "3.2%", amount: "€50K - €5M" },
                  { name: "Société Générale", type: "Crédit-bail", rate: "2.8%", amount: "€100K - €10M" },
                  { name: "LCL Pro", type: "Ligne de crédit", rate: "4.1%", amount: "€10K - €1M" }
                ].map((partner, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{partner.name}</h3>
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200">
                        Contacter
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-900 ml-1">{partner.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Taux:</span>
                        <span className="font-medium text-gray-900 ml-1">{partner.rate}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Montant:</span>
                      <span className="font-medium text-gray-900 ml-1">{partner.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Conseil & Expertise</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Cabinet Expertise Plus", specialty: "Audit & Conseil", rating: "4.9/5", price: "€150/h" },
                  { name: "Avocats & Associés", specialty: "Droit des affaires", rating: "4.8/5", price: "€200/h" },
                  { name: "Strategy Consulting", specialty: "Stratégie d'entreprise", rating: "4.7/5", price: "€180/h" },
                  { name: "Tax & Legal", specialty: "Fiscalité", rating: "4.9/5", price: "€160/h" }
                ].map((expert, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{expert.name}</h3>
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200">
                        Consulter
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Spécialité:</span>
                        <span className="font-medium text-gray-900 ml-1">{expert.specialty}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Note:</span>
                        <span className="font-medium text-gray-900 ml-1">{expert.rating}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Tarif:</span>
                      <span className="font-medium text-gray-900 ml-1">{expert.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('legal');
    const [fecFile, setFecFile] = useState(null);
    const [fecValidation, setFecValidation] = useState({});
    const [questionnaireResponses, setQuestionnaireResponses] = useState({});
    const [unknownResponses, setUnknownResponses] = useState({});
    const [showFecRequestModal, setShowFecRequestModal] = useState(false);
    const [fecRequestData, setFecRequestData] = useState({
      requestType: '3-years',
      emails: [''],
      customMessage: 'Bonjour,\n\nDans le cadre de l\'évaluation de notre entreprise, nous aurions besoin de récupérer nos fichiers FEC.\n\nPourriez-vous nous transmettre les fichiers via la plateforme Valorix ?\n\nMerci par avance,\nCordialement',
      senderName: 'Jean Dupont',
      companyName: 'TechStart SAS'
    });

    const tabs = [
      { id: 'legal', label: 'Informations Légales', icon: FileText },
      { id: 'financial', label: 'Données financières', icon: Database },
      { id: 'market', label: 'Activités et marché', icon: TrendingUp },
      { id: 'integrations', label: 'Intégrations', icon: Link }
    ];

    const handleFecFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFecFile(file);
        // Simulation de la validation FEC
        setTimeout(() => {
          setFecValidation({
            isValid: true,
            totalLines: 15420,
            dateRange: '01/01/2024 - 31/12/2024',
            accountsToAllocate: 12,
            journalCodes: ['VT', 'AC', 'BQ', 'OD', 'AN']
          });
        }, 2000);
      }
    };

    const handleQuestionnaireResponse = (questionId, value) => {
      setQuestionnaireResponses(prev => ({
        ...prev,
        [questionId]: value
      }));
    };

    const handleUnknownToggle = (questionId) => {
      setUnknownResponses(prev => ({
        ...prev,
        [questionId]: !prev[questionId]
      }));
    };

    const handleFecRequest = () => {
      setShowFecRequestModal(true);
    };

    const handleAddEmail = () => {
      setFecRequestData(prev => ({
        ...prev,
        emails: [...prev.emails, '']
      }));
    };

    const handleRemoveEmail = (index) => {
      setFecRequestData(prev => ({
        ...prev,
        emails: prev.emails.filter((_, i) => i !== index)
      }));
    };

    const handleEmailChange = (index, value) => {
      setFecRequestData(prev => ({
        ...prev,
        emails: prev.emails.map((email, i) => i === index ? value : email)
      }));
    };

    const handleSendFecRequest = async () => {
      // Simulation de l'envoi des emails
      console.log('Envoi des demandes FEC:', fecRequestData);
      
      // Ici, vous intégrerez l'envoi réel des emails
      // await sendFecRequests(fecRequestData);
      
      // Afficher une notification de succès
      alert('Demandes FEC envoyées avec succès !');
      setShowFecRequestModal(false);
    };

    const marketQuestions = [
      {
        section: "1 - Activité générale",
        questions: [
          { id: '1.1', text: "L'entreprise opère-t-elle sur un marché qualifié de \"niche\" ?", aiSuggestion: "Marché de niche détecté (logiciels spécialisés B2B)" },
          { id: '1.2', text: "L'entreprise évolue-t-elle sur un secteur d'activité porteur ?", aiSuggestion: "Secteur porteur : transformation digitale (+15% annuel)" },
          { id: '1.3', text: "Le chiffre d'affaires de l'entreprise est-il concentré sur un produit (ou une activité) porteur ?", aiSuggestion: "Concentration de 78% sur l'activité principale" },
          { id: '1.4', text: "Le chiffre d'affaires est-il fortement saisonnier ?", aiSuggestion: "Saisonnalité faible détectée (+/-12%)" },
          { id: '1.5', text: "Comment le chiffre d'affaires a-t-il évolué depuis 3 ans et comment risque-t-il d'évoluer dans les 5 ans à venir ?", aiSuggestion: "Croissance +12% (3 ans), prévision +8% (5 ans)" },
          { id: '1.6', text: "La marge brute est-elle conforme aux normes du secteur ?", aiSuggestion: "Marge de 65% vs 58% secteur (favorable)" },
          { id: '1.7', text: "La rentabilité est-elle dépendante d'une partie de l'activité ?", aiSuggestion: "Dépendance modérée (60% sur service principal)" },
          { id: '1.8', text: "L'activité de l'entreprise est-elle dépendante de sous-traitants ?", aiSuggestion: "Dépendance faible (< 20% des coûts)" },
          { id: '1.9', text: "L'activité de l'entreprise est-elle essentiellement de la sous-traitance ?", aiSuggestion: "Modèle direct (85% ventes directes)" },
          { id: '1.10', text: "L'entreprise est-elle en conformité avec la réglementation de son marché ?", aiSuggestion: "Conformité RGPD et normes sectorielles validée" },
          { id: '1.11', text: "L'entreprise dépend-elle de certains fournisseurs au niveau des achats de matières premières ?", aiSuggestion: "Diversification fournisseurs correcte" },
          { id: '1.12', text: "Quel est le positionnement de l'entreprise par rapport aux brevet(s), licence(s) et droit(s) de distribution ?", aiSuggestion: "2 brevets déposés, licences tierces limitées" }
        ]
      },
      {
        section: "2 - Savoir-faire et concurrence",
        questions: [
          { id: '2.1', text: "L'entreprise a-t-elle un savoir-faire spécifique ? Lui appartient-il ?", aiSuggestion: "Propriété intellectuelle forte (algorithmes IA)" },
          { id: '2.2', text: "Quelle est l'importance de la sous-traitance confiée à l'extérieur de l'entreprise ?", aiSuggestion: "Sous-traitance stratégique (15% CA)" },
          { id: '2.3', text: "L'entreprise est-elle correctement positionnée par rapport à ses concurrents ?", aiSuggestion: "Position concurrentielle favorable (top 3 marché)" }
        ]
      },
      {
        section: "3 - Clientèle",
        questions: [
          { id: '3.1', text: "L'implantation géographique est-elle favorable ?", aiSuggestion: "Localisation stratégique (proximité clients)" },
          { id: '3.2', text: "La proximité géographique de la clientèle est-elle importante ?", aiSuggestion: "Services digitaux : proximité moins critique" },
          { id: '3.3', text: "Quel est le degré de fidélité des clients (récurrence, contrats, prélèvements) ?", aiSuggestion: "Taux de rétention 87% (excellent)" },
          { id: '3.4', text: "Quelle part de son marché, l'entreprise occupe-t-elle ?", aiSuggestion: "Part de marché estimée à 4.2%" },
          { id: '3.5', text: "Le chiffre d'affaires est-il correctement réparti sur l'ensemble des clients ?", aiSuggestion: "Concentration : top 3 clients = 45% CA" }
        ]
      }
    ];

    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <User className="w-6 h-6 mr-2 text-indigo-600" />
            Informations Entreprise
          </h1>
          <p className="text-gray-600">
            Gérez vos informations détaillées, données financières et activités de marché
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">


            {activeTab === 'legal' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations Légales</h2>
                
                {/* Informations d'identification de l'entreprise */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Identification de l'entreprise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                      <input 
                        type="text" 
                        defaultValue="TechStart SAS"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Numéro SIREN</label>
                      <input 
                        type="text" 
                        defaultValue="123456789"
                        pattern="[0-9]{9}"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                      <input 
                        type="text" 
                        defaultValue="Technologies / SaaS"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Code APE</label>
                      <input 
                        type="text" 
                        defaultValue="6201Z"
                        pattern="[0-9]{4}[A-Z]"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom du gérant</label>
                      <input 
                        type="text" 
                        defaultValue="Jean Dupont"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Qualité du gérant</label>
                      <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      >
                        <option value="president">Président</option>
                        <option value="directeur-general">Directeur Général</option>
                        <option value="gerant">Gérant</option>
                        <option value="administrateur">Administrateur</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Informations légales complémentaires */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations légales complémentaires</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de création</label>
                      <input 
                        type="date" 
                        defaultValue="2019-03-15"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de clôture</label>
                      <input 
                        type="date" 
                        defaultValue="2024-12-31"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Types de bénéfices</label>
                      <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      >
                        <option value="BIC/IS">BIC/IS - Bénéfices Industriels et Commerciaux / Impôt sur les Sociétés</option>
                        <option value="BA">BA - Bénéfices Agricoles</option>
                        <option value="BNC">BNC - Bénéfices Non Commerciaux</option>
                        <option value="RF">RF - Revenus Fonciers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Régime fiscal</label>
                      <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      >
                        <option value="IS">IS - Impôt sur les Sociétés</option>
                        <option value="IR">IR - Impôt sur le Revenu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de salariés</label>
                      <input 
                        type="number" 
                        defaultValue="12"
                        min="0"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Effectif (y compris gérant)</label>
                      <input 
                        type="number" 
                        defaultValue="13"
                        min="1"
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500" 
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900">Information IA</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Ces informations légales sont automatiquement synchronisées avec les bases de données officielles (INSEE, Infogreffe) 
                        pour garantir leur exactitude et leur mise à jour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Données Financières</h2>
                
                {/* Module intégration fichiers FEC */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-indigo-600" />
                    Module Intégration Fichiers FEC
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Import FEC</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
                        <input
                          type="file"
                          accept=".fec,.txt,.csv"
                          onChange={handleFecFileUpload}
                          className="hidden"
                          id="fec-upload"
                        />
                        <label htmlFor="fec-upload" className="cursor-pointer">
                          <FileSpreadsheet className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            {fecFile ? fecFile.name : 'Glissez votre fichier FEC ici'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Format FEC, TXT ou CSV
                          </p>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Demande de fichiers FEC</label>
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-3">
                            Demandez facilement vos fichiers FEC à votre expert-comptable ou commissaire aux comptes
                          </p>
                          <button 
                            onClick={handleFecRequest}
                            className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                          >
                            <Mail className="w-5 h-5 mr-2" />
                            Demander le fichier FEC
                            <Send className="w-4 h-4 ml-2" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          <Info className="w-4 h-4 inline mr-1" />
                          Les destinataires recevront un lien sécurisé pour télécharger les fichiers directement dans l'application
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contrôle fichier FEC */}
                {fecFile && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                      Contrôle Fichier FEC
                    </h3>
                    
                    {fecValidation.isValid ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-medium text-green-900">Statut Validation</h4>
                            <p className="text-sm text-green-700 mt-1">✓ Fichier FEC valide</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900">Nombre de lignes</h4>
                            <p className="text-sm text-blue-700 mt-1">{fecValidation.totalLines?.toLocaleString()}</p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h4 className="font-medium text-purple-900">Période</h4>
                            <p className="text-sm text-purple-700 mt-1">{fecValidation.dateRange}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Comptes à allouer</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200">
                                <span className="text-sm text-orange-700">Comptes en attente</span>
                                <span className="font-medium text-orange-900">{fecValidation.accountsToAllocate}</span>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="unknown-allocation" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor="unknown-allocation" className="ml-2 text-sm text-gray-700">
                                  Je ne sais pas
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Codes journaux détectés</h4>
                            <div className="flex flex-wrap gap-2">
                              {fecValidation.journalCodes?.map((code, index) => (
                                <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm font-medium">
                                  {code}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center mt-2">
                              <input type="checkbox" id="unknown-journals" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                              <label htmlFor="unknown-journals" className="ml-2 text-sm text-gray-700">
                                Je ne sais pas
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Dates d'analyses</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date début analyse</label>
                              <input type="date" defaultValue="2024-01-01" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date fin analyse</label>
                              <input type="date" defaultValue="2024-12-31" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <input type="checkbox" id="unknown-dates" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="unknown-dates" className="ml-2 text-sm text-gray-700">
                              Je ne sais pas
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mr-3"></div>
                        <span className="text-sm text-gray-700">Analyse du fichier FEC en cours...</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-start">
                    <Brain className="w-5 h-5 text-indigo-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-indigo-900">Analyse IA DeepSeek</h4>
                      <p className="text-sm text-indigo-700 mt-1">
                        L'IA analyse automatiquement vos données FEC pour détecter les anomalies, 
                        optimiser la classification comptable et suggérer des améliorations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Module dossier de financement */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Dossier pour le financement de reprise d'entreprise
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Éléments du dossier</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                            <span className="text-sm font-medium text-green-900">Business plan certifié</span>
                          </div>
                          <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Complété</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                            <span className="text-sm font-medium text-green-900">Évaluation multi-méthodes</span>
                          </div>
                          <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Complété</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-orange-600 mr-3" />
                            <span className="text-sm font-medium text-orange-900">Due diligence financière</span>
                          </div>
                          <span className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded">En cours</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900">Garanties et sûretés</span>
                          </div>
                          <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">À faire</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Financement ciblé</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h5 className="font-medium text-blue-900 mb-2">Acquisition d'entreprise</h5>
                          <p className="text-sm text-blue-700 mb-3">
                            Montant estimé: €2,100,000 - €2,600,000
                          </p>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                              Préparer dossier
                            </button>
                            <button className="px-3 py-1 border border-blue-600 text-blue-600 text-xs rounded hover:bg-blue-50 transition-colors">
                              Simulation
                            </button>
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h5 className="font-medium text-purple-900 mb-2">Développement activité</h5>
                          <p className="text-sm text-purple-700 mb-3">
                            Crédit croissance: €500,000 - €1,000,000
                          </p>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors">
                              Préparer dossier
                            </button>
                            <button className="px-3 py-1 border border-purple-600 text-purple-600 text-xs rounded hover:bg-purple-50 transition-colors">
                              Simulation
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start">
                      <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Recommandation IA</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Votre profil financier est adapté pour un financement LBO avec un levier de 65%. 
                          Les banques partenaires Valorix proposent des conditions préférentielles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Activités et Marché</h2>
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">Analyse IA activée</span>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
                  <div className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-purple-900">Intelligence Multi-Agents</h4>
                      <p className="text-sm text-purple-700 mt-1">
                        Les agents IA analysent votre code APE, comptabilité (DeepSeek), secteur d'activité (Perplexity), 
                        zone géographique et concurrence pour vous proposer des réponses pré-remplies intelligentes.
                      </p>
                    </div>
                  </div>
                </div>

                {marketQuestions.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.section}</h3>
                    
                    <div className="space-y-6">
                      {section.questions.map((question, questionIndex) => (
                        <div key={question.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <label className="text-sm font-medium text-gray-900 leading-5 pr-4">
                              {question.id} - {question.text}
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`unknown-${question.id}`}
                                checked={unknownResponses[question.id] || false}
                                onChange={() => handleUnknownToggle(question.id)}
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              />
                              <label htmlFor={`unknown-${question.id}`} className="text-xs text-orange-600 whitespace-nowrap">
                                Je ne sais pas
                              </label>
                            </div>
                          </div>
                          
                          {!unknownResponses[question.id] && (
                            <>
                              <div className="grid grid-cols-4 gap-2 mb-3">
                                {['Très favorable', 'Favorable', 'Défavorable', 'Très défavorable'].map((option) => (
                                  <label key={option} className="flex items-center">
                                    <input
                                      type="radio"
                                      name={question.id}
                                      value={option}
                                      onChange={(e) => handleQuestionnaireResponse(question.id, e.target.value)}
                                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-xs text-gray-700">{option}</span>
                                  </label>
                                ))}
                              </div>
                              
                              <div className="bg-green-50 p-3 rounded border border-green-200">
                                <div className="flex items-start">
                                  <Brain className="w-4 h-4 text-green-600 mt-0.5 mr-2" />
                                  <div>
                                    <p className="text-xs font-medium text-green-900">Suggestion IA (DeepSeek + Perplexity)</p>
                                    <p className="text-xs text-green-700 mt-1">{question.aiSuggestion}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          
                          <textarea
                            placeholder="Commentaires additionnels (optionnel)"
                            rows={2}
                            className="w-full mt-3 px-3 py-2 border-2 border-gray-400 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                            style={{
                              backgroundColor: '#ffffff',
                              color: '#1e293b',
                              fontSize: '16px'
                            }}
                            disabled={unknownResponses[question.id]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900">Analyse Prédictive Avancée</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Vos réponses alimentent notre modèle d'IA pour une valorisation plus précise et des recommandations 
                        stratégiques personnalisées basées sur votre positionnement marché.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Intégrations</h2>
                  <div className="flex items-center space-x-2">
                    <Link className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Connectez vos outils</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900">Synchronisation automatique</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Connectez vos outils comptables et fiscaux pour une importation automatique et sécurisée de vos données.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Métriques des intégrations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Link className="w-6 h-6 text-white" />
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Actif
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Intégrations Actives</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                    <div className="text-sm text-gray-600">Sur 3 disponibles</div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Sync
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Données Synchronisées</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                    <div className="text-sm text-gray-600">Dernière sync: 5min</div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Sécurisé
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Conformité RGPD</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                    <div className="text-sm text-gray-600">Chiffrement bout en bout</div>
                  </div>
                </div>

                {/* Outils Comptables */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                      Logiciels Comptables
                    </h2>
                    <p className="text-gray-600 mt-1">Connectez vos outils comptables pour une synchronisation automatique</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                      {[
                        { 
                          name: "Pennylane", 
                          status: "Connecté", 
                          type: "Comptabilité digitale", 
                          icon: "💰",
                          description: "Synchronisation en temps réel des écritures comptables",
                          lastSync: "il y a 5 minutes"
                        },
                        { 
                          name: "Tiime", 
                          status: "Connecté", 
                          type: "Gestion financière TPE/PME", 
                          icon: "⏰",
                          description: "Import automatique des factures et rapprochements bancaires",
                          lastSync: "il y a 2 heures"
                        },
                        { 
                          name: "Sage 100", 
                          status: "Disponible", 
                          type: "ERP traditionnel", 
                          icon: "📊",
                          description: "Intégration via export FEC manuel ou API",
                          lastSync: null
                        }
                        ].map((software, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl">{software.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900">{software.name}</h3>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-600">{software.type}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{software.description}</p>
                              {software.lastSync && (
                                <p className="text-xs text-gray-500 mt-1">Dernière synchronisation: {software.lastSync}</p>
                              )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              software.status === 'Connecté' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {software.status}
                              </div>
                            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              software.status === 'Connecté' 
                                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            }`}>
                              {software.status === 'Connecté' ? 'Déconnecter' : 'Connecter'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                {/* PDP - Réforme Facture Électronique */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-emerald-600" />
                      PDP - Facture Électronique
                    </h2>
                    <p className="text-gray-600 mt-1">Plateforme de Dématérialisation Partenaire pour la réforme 2026</p>
                      </div>
                  <div className="p-6">
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-emerald-900">Conforme réforme 2026</h4>
                          <p className="text-sm text-emerald-700 mt-1">
                            Valorix est certifié PDP pour la dématérialisation obligatoire des factures (Ordonnance n° 2024-1411)
                          </p>
                            </div>
                          </div>
                        </div>

                    <div className="space-y-6">
                      {/* Statut de conformité */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-3">Statut de conformité</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-blue-800">Certification PDP</span>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-blue-800">Format Factur-X</span>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-blue-800">Archivage légal</span>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-blue-800">API Chorus Pro</span>
                              <Clock className="w-4 h-4 text-orange-500" />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-purple-900 mb-3">Échéances légales</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-purple-900">Grandes entreprises</p>
                                <p className="text-xs text-purple-700">Factures reçues</p>
                      </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-purple-900">1er Sept 2026</p>
                                <p className="text-xs text-purple-700">Dans 20 mois</p>
                    </div>
                      </div>
                            <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-900">PME/TPE</p>
                                <p className="text-xs text-purple-700">Factures émises</p>
                            </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-purple-900">1er Sept 2027</p>
                                <p className="text-xs text-purple-700">Dans 32 mois</p>
                          </div>
                        </div>
                            </div>
                          </div>
                        </div>

                      {/* Configuration PDP */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-4">Configuration PDP Valorix</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type d'entreprise</label>
                            <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                              style={{
                                backgroundColor: '#ffffff',
                                color: '#1e293b',
                                fontSize: '16px'
                              }}
                            >
                              <option>TPE (&lt; 10 salariés)</option>
                              <option>PME (10-249 salariés)</option>
                              <option>ETI (250-4999 salariés)</option>
                              <option>Grande entreprise (&ge; 5000 salariés)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Secteur public</label>
                            <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                              style={{
                                backgroundColor: '#ffffff',
                                color: '#1e293b',
                                fontSize: '16px'
                              }}
                            >
                              <option>Non concerné</option>
                              <option>Fournisseur secteur public</option>
                              <option>Organisme public</option>
                            </select>
                  </div>
                </div>

                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-start">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2" />
                    <div>
                              <p className="text-sm font-medium text-yellow-900">Préparation recommandée</p>
                              <p className="text-xs text-yellow-800 mt-1">
                                Commencez dès maintenant à tester la dématérialisation pour être prêt avant l'échéance légale
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-4">
                        <button className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                          Activer PDP Valorix
                        </button>
                        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Guide de migration
                        </button>
                        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Documentation technique
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}




          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Sauvegarder les modifications
          </button>
        </div>

        {/* Modal Demande FEC */}
        {showFecRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Demander les fichiers FEC</h2>
                  <button
                    onClick={() => setShowFecRequestModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Envoyez une demande professionnelle pour obtenir vos fichiers FEC via email sécurisé
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Type de demande */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Type de demande FEC</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="requestType"
                        value="3-years"
                        checked={fecRequestData.requestType === '3-years'}
                        onChange={(e) => setFecRequestData(prev => ({ ...prev, requestType: e.target.value }))}
                        className="mr-3 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">3 derniers exercices</div>
                        <div className="text-sm text-gray-600">2022, 2023, 2024</div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="requestType"
                        value="current-year"
                        checked={fecRequestData.requestType === 'current-year'}
                        onChange={(e) => setFecRequestData(prev => ({ ...prev, requestType: e.target.value }))}
                        className="mr-3 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Exercice en cours</div>
                        <div className="text-sm text-gray-600">2024 seulement</div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="requestType"
                        value="custom"
                        checked={fecRequestData.requestType === 'custom'}
                        onChange={(e) => setFecRequestData(prev => ({ ...prev, requestType: e.target.value }))}
                        className="mr-3 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Période personnalisée</div>
                        <div className="text-sm text-gray-600">Choisir les années</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Destinataires */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Destinataires</label>
                  <div className="space-y-3">
                    {fecRequestData.emails.map((email, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-1">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            placeholder="email@exemple.com"
                            className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                            style={{
                              backgroundColor: '#ffffff',
                              color: '#1e293b',
                              fontSize: '16px'
                            }}
                          />
                        </div>
                        {fecRequestData.emails.length > 1 && (
                          <button
                            onClick={() => handleRemoveEmail(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={handleAddEmail}
                      className="flex items-center px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un destinataire
                    </button>
                  </div>
                </div>

                {/* Message personnalisé */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Message personnalisé</label>
                  <textarea
                    value={fecRequestData.customMessage}
                    onChange={(e) => setFecRequestData(prev => ({ ...prev, customMessage: e.target.value }))}
                    rows={6}
                    className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#1e293b',
                      fontSize: '16px'
                    }}
                    placeholder="Votre message..."
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    Ce message sera inclus dans l'email envoyé aux destinataires
                  </div>
                </div>

                {/* Aperçu de l'email */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Aperçu de l'email</h4>
                  <div className="bg-white p-4 rounded border border-gray-200 text-sm">
                    <div className="border-b border-gray-200 pb-3 mb-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">De:</span>
                          <span className="ml-2 font-medium">{fecRequestData.senderName} ({fecRequestData.companyName})</span>
                        </div>
                        <div>
                          <span className="text-gray-600">À:</span>
                          <span className="ml-2">{fecRequestData.emails.filter(email => email.trim()).join(', ') || 'Aucun destinataire'}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-600">Objet:</span>
                        <span className="ml-2 font-medium">Demande de fichiers FEC - {fecRequestData.companyName}</span>
                      </div>
                    </div>
                    <div className="whitespace-pre-wrap text-gray-700">
                      {fecRequestData.customMessage}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center text-blue-700">
                        <Shield className="w-4 h-4 mr-2" />
                        <strong>Lien de téléchargement sécurisé Valorix</strong>
                      </div>
                      <div className="text-sm text-blue-600 mt-1">
                        https://app.valorix.fr/secure-upload/abc123xyz (Expire dans 7 jours)
                      </div>
                      <div className="text-xs text-blue-600 mt-2">
                        Les fichiers téléchargés seront automatiquement intégrés à l'évaluation de {fecRequestData.companyName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-4">
                <button
                  onClick={() => setShowFecRequestModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSendFecRequest}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer les demandes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [billingPeriod, setBillingPeriod] = useState('monthly');
    
    // États pour les notifications
    const [notifications, setNotifications] = useState({
      email: true,
      push: true,
      sms: false,
      reports: true,
      marketing: false,
      evaluations: true,
      billing: true,
      system: true,
      collaborators: false
    });
    

    
    const handleNotificationChange = (key) => {
      setNotifications(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };
    


    const tabs = [
      { id: 'profile', name: 'Profil', icon: User },
      { id: 'subscription', name: 'Abonnement', icon: CreditCard },
      { id: 'notifications', name: 'Notifications', icon: Bell },
      { id: 'security', name: 'Sécurité', icon: Shield }
    ];

    const subscriptionPlans = [
      {
        id: 'gratuit',
        name: 'Gratuit',
        price: 0,
        period: 'mois',
        description: 'Services financiers uniquement',
        features: [
          'Accès aux services financiers',
          'Intégrations comptables basiques',
          'Support communautaire'
        ],
        limitations: [
          'Pas d\'évaluation d\'entreprise',
          'Pas d\'analyses IA',
          'Pas de rapports détaillés'
        ],
        color: 'gray',
        isCurrentPlan: false
      },
      {
        id: 'essentiel',
        name: 'Essentiel',
        price: billingPeriod === 'monthly' ? 39 : 390,
        period: billingPeriod === 'monthly' ? 'mois' : 'an',
        description: 'Idéal pour les TPE',
        features: [
          'Évaluations trimestrielles',
          '2 entreprises max',
          '1 rapport blockchain/an',
          'Analyses sectorielles basiques',
          'Support prioritaire email'
        ],
        color: 'indigo',
        popular: true,
        isCurrentPlan: true
      },
      {
        id: 'business',
        name: 'Business',
        price: billingPeriod === 'monthly' ? 129 : 1290,
        period: billingPeriod === 'monthly' ? 'mois' : 'an',
        description: 'Pour les PME',
        features: [
          'Évaluations mensuelles illimitées',
          '5 entreprises max',
          '4 rapports blockchain/an',
          'API basique',
          'Support téléphonique'
        ],
        color: 'purple',
        isCurrentPlan: false
      },
      {
        id: 'premium',
        name: 'Premium',
        price: billingPeriod === 'monthly' ? 399 : 3990,
        period: billingPeriod === 'monthly' ? 'mois' : 'an',
        description: 'Pour les ETI',
        features: [
          'Suivi temps réel',
          'Entreprises illimitées',
          'Rapports blockchain illimités',
          'IA personnalisée',
          'Support 24/7 dédié'
        ],
        color: 'gold',
        isCurrentPlan: false
      }
    ];

    const handleSubscriptionPlan = (planId) => {
      setSelectedPlan(planId);
      setShowSubscriptionModal(true);
    };

    const handleStripePayment = async (planId) => {
      // Simulation d'intégration Stripe
      console.log(`Initialisation du paiement Stripe pour le plan: ${planId}`);
      
      // Ici on intégrerait Stripe
      const stripe = await loadStripe('pk_test_...');
      
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: planId === 'essentiel' ? 'price_1...' : 'price_2...',
          quantity: 1,
        }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });
    };

    const renderTabContent = () => {
      switch (activeTab) {
        case 'profile':
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input defaultValue="Jean" className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input defaultValue="Dupont" className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input defaultValue="jean.dupont@techstart.fr" className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input defaultValue="+33 1 23 45 67 89" className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>
                <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Sauvegarder
                </button>
              </div>
            </div>
          );

        case 'subscription':
          return (
            <div className="space-y-6">
              {/* Plan actuel */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Abonnement actuel</h3>
                    <p className="text-sm text-gray-600">Plan Essentiel • €39/mois</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Actif</span>
                    <button 
                      onClick={() => handleSubscriptionPlan('change')}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Changer de plan
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Prochaine facturation</span>
                    <p className="font-semibold text-gray-900">15 janvier 2025</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Méthode de paiement</span>
                    <p className="font-semibold text-gray-900">•••• 4242</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Statut</span>
                    <p className="font-semibold text-green-600">Renouvellement automatique</p>
                  </div>
                </div>
              </div>

              {/* Prestations à la demande */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Prestations à la demande</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Rapport supplémentaire</h4>
                      <span className="text-lg font-bold text-indigo-600">€49</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Rapport certifié blockchain additionnel</p>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Acheter maintenant
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Entreprise additionnelle</h4>
                      <span className="text-lg font-bold text-indigo-600">€15/mois</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Ajouter une entreprise à votre plan</p>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>

              {/* Historique des paiements */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Historique des paiements</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Plan Essentiel</p>
                        <p className="text-sm text-gray-600">15 décembre 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">€39.00</p>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">Télécharger</button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Rapport supplémentaire</p>
                        <p className="text-sm text-gray-600">8 décembre 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">€49.00</p>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">Télécharger</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'notifications':
          return (
            <div className="space-y-6">
              {/* Préférences générales */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Préférences de notification</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Notifications par email</p>
                        <p className="text-sm text-gray-600">Recevez les alertes importantes par email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Notifications push</p>
                        <p className="text-sm text-gray-600">Notifications dans le navigateur</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">SMS</p>
                        <p className="text-sm text-gray-600">Alertes critiques par SMS</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Notifications par catégorie */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Alertes par catégorie</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-blue-900">Évaluations</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.evaluations}
                            onChange={() => handleNotificationChange('evaluations')}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Nouvelle évaluation terminée</li>
                        <li>• Analyse IA disponible</li>
                        <li>• Recommandations générées</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-green-900">Facturation</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.billing}
                            onChange={() => handleNotificationChange('billing')}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-green-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Prélèvement effectué</li>
                        <li>• Échec de paiement</li>
                        <li>• Facture disponible</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-purple-900">Système</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.system}
                            onChange={() => handleNotificationChange('system')}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-purple-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Maintenance planifiée</li>
                        <li>• Mises à jour disponibles</li>
                        <li>• Connexions suspectes</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-orange-900">Collaborateurs</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.collaborators}
                            onChange={() => handleNotificationChange('collaborators')}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-orange-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                      </div>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Nouveaux membres ajoutés</li>
                        <li>• Permissions modifiées</li>
                        <li>• Activité suspecte</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fréquence des rapports */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Rapports périodiques</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fréquence des rapports</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    >
                      <option>Quotidien</option>
                      <option>Hebdomadaire</option>
                      <option selected>Mensuel</option>
                      <option>Trimestriel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jour d'envoi</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    >
                      <option>Lundi</option>
                      <option>Mardi</option>
                      <option>Mercredi</option>
                      <option>Jeudi</option>
                      <option selected>Vendredi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heure d'envoi</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    >
                      <option>08:00</option>
                      <option selected>09:00</option>
                      <option>10:00</option>
                      <option>14:00</option>
                      <option>17:00</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'security':
          return (
            <div className="space-y-6">
              {/* Aperçu de la sécurité */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">État de la sécurité</h3>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="text-xl font-bold text-green-600">Excellent</h4>
                        <p className="text-sm text-gray-600">Score de sécurité : 95/100</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 h-20 relative">
                      <svg className="transform -rotate-90 w-20 h-20">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          className="text-gray-200"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={`${95 * 2.2} ${220}`}
                          className="text-green-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-green-600">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">2FA activé</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Mot de passe fort</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-yellow-800">Dernière connexion: il y a 2j</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authentification à deux facteurs */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Authentification à deux facteurs (2FA)</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900">Application d'authentification</p>
                        <p className="text-sm text-green-700">Google Authenticator configuré</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Actif</span>
                      <button className="text-green-700 hover:text-green-800 text-sm">Reconfigurer</button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">SMS de secours</p>
                        <p className="text-sm text-gray-600">+33 6 ** ** ** 89</p>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                      Configurer
                    </button>
                  </div>
                </div>
              </div>

              {/* Sessions actives */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Sessions actives</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Windows PC - Chrome</p>
                        <p className="text-sm text-gray-600">Session actuelle • Paris, France</p>
                        <p className="text-xs text-gray-500">Dernière activité: maintenant</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Actuelle
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">iPhone - Safari</p>
                        <p className="text-sm text-gray-600">Paris, France</p>
                        <p className="text-xs text-gray-500">Dernière activité: il y a 3 heures</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Déconnecter
                    </button>
                  </div>
                </div>
              </div>

              {/* Paramètres de mot de passe */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Changer le mot de passe</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                    <input type="password" className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                    <input type="password" className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                    <div className="mt-2 text-xs text-gray-600">
                      Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                    <input type="password" className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Mettre à jour le mot de passe
                  </button>
                </div>
              </div>

              {/* Codes de récupération */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Codes de récupération</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Codes de récupération</p>
                      <p className="text-sm text-yellow-800 mt-1">
                        Vous avez utilisé 2 codes sur 10. Générez de nouveaux codes si il en reste moins de 3.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    Voir les codes
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    Générer nouveaux codes
                  </button>
                </div>
              </div>
            </div>
          );

        default:
          return <div>Contenu de l'onglet en cours de développement</div>;
      }
    };



  // Return statement principal du composant SettingsPage
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez votre compte et vos préférences</p>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      {renderTabContent()}

      {/* Modal de sélection d'abonnement */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Choisir votre plan</h2>
                  <p className="text-gray-600 mt-2">Sélectionnez le plan qui correspond à vos besoins</p>
                </div>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Toggle mensuel/annuel */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Mensuel
                </span>
                <button
                  onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
                <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Annuel
                </span>
                {billingPeriod === 'yearly' && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    2 mois offerts
                  </span>
                )}
              </div>

              {/* Plans d'abonnement */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-6 shadow-lg border-2 transition-all ${
                      plan.isCurrentPlan
                        ? 'border-indigo-500 bg-indigo-50'
                        : plan.popular
                        ? 'border-indigo-300 bg-white'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Populaire
                        </span>
                      </div>
                    )}
                    
                    {plan.isCurrentPlan && (
                      <div className="absolute -top-3 right-4">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Plan actuel
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="text-4xl font-bold text-gray-900">{plan.price}€</div>
                      <div className="text-gray-500">/{plan.period}</div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations && (
                        <>
                          {plan.limitations.map((limitation, index) => (
                            <div key={index} className="flex items-center">
                              <X className="w-4 h-4 text-gray-400 mr-3" />
                              <span className="text-sm text-gray-500">{limitation}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => handleStripePayment(plan.id)}
                      disabled={plan.isCurrentPlan}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                        plan.isCurrentPlan
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : plan.popular
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.isCurrentPlan ? 'Plan actuel' : 'Souscrire'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>Paiements sécurisés avec Stripe • Annulation à tout moment</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  };

  // Return statements principaux pour AppContent
  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  if (currentPage === 'auth') {
    return <AuthPage />;
  }
  
  if (showOnboarding) {
    return <OnboardingPage />;
  }
  
  if (currentPage === 'dashboard' && isAuthenticated) {
    return <DashboardWrapper />;
  }
  
  return <LandingPage />;
} // Fermeture de AppContent

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;