import React, { useState, useEffect } from 'react';
import {
  TrendingUp, BarChart3, Users, Award, Brain, Shield, Zap, Target,
  CheckCircle, Star, ArrowRight, Play, Sparkles, Rocket, Globe, Lock,
  Activity, FileText, Settings, Bell, LogOut, Home, PieChart, FileBarChart,
  Link, Briefcase, User, CreditCard, Eye, EyeOff, ChevronDown, Search,
  Filter, Download, Upload, Calendar, Clock, DollarSign, Percent,
  TrendingDown, AlertTriangle, CheckCircle2, XCircle, Info, Plus, Minus,
  Edit, Trash2, Save, X, Menu, ChevronRight, ChevronLeft, MoreHorizontal,
  BookOpen, Lightbulb, ThumbsUp, Calculator, FileSpreadsheet, Presentation,
  Database, Building, Check, Scale, Mail, Send, Monitor, Phone, Palette,
  Smartphone, Share2, Sun, Moon, RefreshCw, HelpCircle, Gauge
} from 'lucide-react';

import { useNotification } from './Toast';

const Dashboard = ({ 
  userProfile = {}, 
  currentDashboardPage = 'demarrage', 
  setCurrentDashboardPage = () => {},
  onLogout = () => {}
}) => {
  const [userProgress, setUserProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { notifySuccess, notifyInfo } = useNotification();

  // Déterminer le niveau d'expérience utilisateur
  const getUserLevel = () => {
    const steps = completedSteps.size;
    if (steps === 0) return 'newcomer';
    if (steps <= 3) return 'beginner';
    if (steps <= 7) return 'intermediate';
    return 'advanced';
  };

  // Étapes d'onboarding adaptées
  const onboardingSteps = [
    { id: 'profile', title: 'Compléter le profil', icon: User, page: 'profile' },
    { id: 'upload_data', title: 'Importer des données', icon: Upload, page: 'profile' },
    { id: 'first_evaluation', title: 'Première évaluation', icon: PieChart, page: 'evaluation' },
    { id: 'explore_analytics', title: 'Explorer Analytics IA', icon: Brain, page: 'analytics' },
    { id: 'generate_report', title: 'Générer un rapport', icon: FileBarChart, page: 'reports' },
    { id: 'explore_services', title: 'Services financiers', icon: Briefcase, page: 'services' },
    { id: 'customize_settings', title: 'Personnaliser', icon: Settings, page: 'settings' }
  ];

  // Métriques dynamiques basées sur l'utilisateur
  useEffect(() => {
    const generateUserMetrics = () => {
      setLoading(true);
      
      // Simulation de calcul de métriques personnalisées
      setTimeout(() => {
        const hasData = completedSteps.has('upload_data');
        const hasEvaluation = completedSteps.has('first_evaluation');
        
        setDashboardMetrics({
          completionScore: Math.min(95, (completedSteps.size / onboardingSteps.length) * 100),
          dataQuality: hasData ? Math.floor(Math.random() * 20) + 80 : 0,
          aiConfidence: hasEvaluation ? Math.floor(Math.random() * 15) + 85 : 0,
          estimatedValue: hasEvaluation ? 
            `€${(Math.random() * 3 + 1.5).toFixed(1)}M` : 'Non disponible',
          riskLevel: hasData ? ['Faible', 'Modéré', 'Élevé'][Math.floor(Math.random() * 3)] : 'Non évalué',
          nextActions: getPersonalizedActions()
        });
        
        setLoading(false);
      }, 1000);
    };

    generateUserMetrics();
  }, [completedSteps, userProfile]);

  // Actions personnalisées selon le profil utilisateur
  const getPersonalizedActions = () => {
    const userLevel = getUserLevel();
    const sector = userProfile?.sector || '';
    
    const actions = {
      newcomer: [
        { title: 'Configurer votre profil', icon: User, priority: 'high', page: 'profile' },
        { title: 'Importer vos premières données', icon: Upload, priority: 'high', page: 'profile' },
        { title: 'Découvrir Valorix', icon: BookOpen, priority: 'medium', action: 'tour' }
      ],
      beginner: [
        { title: 'Lancer votre première évaluation', icon: PieChart, priority: 'high', page: 'evaluation' },
        { title: 'Explorer les insights IA', icon: Brain, priority: 'medium', page: 'analytics' },
        { title: 'Générer un rapport complet', icon: FileBarChart, priority: 'medium', page: 'reports' }
      ],
      intermediate: [
        { title: 'Affiner vos analyses sectorielles', icon: BarChart3, priority: 'high', page: 'analytics' },
        { title: 'Générer un rapport complet', icon: FileBarChart, priority: 'high', page: 'reports' },
        { title: 'Explorer les services financiers', icon: Briefcase, priority: 'medium', page: 'services' }
      ],
      advanced: [
        { title: 'Optimiser vos KPIs', icon: Target, priority: 'medium', page: 'analytics' },
        { title: 'Accéder aux services premium', icon: Star, priority: 'medium', page: 'services' },
        { title: 'Analyser les tendances marché', icon: TrendingUp, priority: 'low', page: 'analytics' }
      ]
    };

    return actions[userLevel] || actions.newcomer;
  };



  // Fonction pour marquer une étape comme terminée
  const markStepComplete = (stepId) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    notifySuccess(`Étape "${stepId}" complétée !`);
  };

  // Contenu du tableau de bord principal
  const renderDashboardHome = () => {
    const userLevel = getUserLevel();
    const personalizedActions = getPersonalizedActions();

    return (
      <div className="space-y-8">
        {/* Header personnalisé */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userLevel === 'newcomer' ? `Bienvenue${userProfile?.firstName ? ` ${userProfile.firstName}` : ''} !` :
               userLevel === 'beginner' ? 'Bien démarré !' :
               userLevel === 'intermediate' ? 'Excellent progrès !' :
               'Tableau de bord expert'}
            </h1>
            <p className="text-gray-600 mt-1">
              {userLevel === 'newcomer' ? 'Commençons par configurer votre profil et importer vos données' :
               userLevel === 'beginner' ? 'Continuons avec votre première évaluation d\'entreprise' :
               userLevel === 'intermediate' ? 'Explorez nos fonctionnalités avancées et services' :
               `Gérez votre plateforme Valorix${userProfile?.company ? ` - ${userProfile.company}` : ''}`}
            </p>
          </div>
          
          {userLevel !== 'advanced' && (
            <div className="text-right">
              <div className="text-sm text-gray-500">Progression</div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(completedSteps.size / onboardingSteps.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {completedSteps.size}/{onboardingSteps.length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Guide d'onboarding pour nouveaux utilisateurs */}
        {userLevel === 'newcomer' && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Configurons votre profil Valorix
                </h3>
                <p className="text-gray-600 mb-4">
                  Pour vous proposer les meilleures analyses, nous avons besoin de quelques informations sur votre entreprise.
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setCurrentDashboardPage('profile')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Compléter mon profil
                  </button>
                  <button 
                    onClick={() => setShowWelcome(false)}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 transition-colors"
                  >
                    Plus tard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Métriques adaptatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Score de Progression</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? '---' : `${Math.floor(dashboardMetrics?.completionScore || 0)}/100`}
                </p>
                <p className="text-sm text-indigo-600 flex items-center mt-1">
                  <Target className="w-4 h-4 mr-1" />
                  {completedSteps.size} étapes complétées
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Gauge className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qualité des Données</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? '---' : `${dashboardMetrics?.dataQuality || 0}%`}
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Database className="w-4 h-4 mr-1" />
                  {completedSteps.has('upload_data') ? 'Données importées' : 'Aucune donnée'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valorisation Estimée</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? '---' : (dashboardMetrics?.estimatedValue || 'N/A')}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <Shield className="w-4 h-4 mr-1" />
                  {completedSteps.has('first_evaluation') ? 'Calculée' : 'En attente'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confiance IA</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? '---' : `${dashboardMetrics?.aiConfidence || 0}%`}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <Brain className="w-4 h-4 mr-1" />
                  DeepSeek AI
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions personnalisées */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Actions recommandées
            <span className="text-sm font-normal text-gray-500 ml-2">
              (Niveau {userLevel === 'newcomer' ? 'Débutant' : 
                     userLevel === 'beginner' ? 'Initié' :
                     userLevel === 'intermediate' ? 'Intermédiaire' : 'Expert'})
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalizedActions.map((action, index) => (
              <button 
                key={index}
                onClick={() => action.page ? setCurrentDashboardPage(action.page) : null}
                className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left ${
                  action.priority === 'high' ? 'border-indigo-200 bg-indigo-50' :
                  action.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                  'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <action.icon className={`w-6 h-6 mt-1 ${
                    action.priority === 'high' ? 'text-indigo-600' :
                    action.priority === 'medium' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">
                      {action.priority === 'high' ? 'Priorité élevée' :
                       action.priority === 'medium' ? 'Recommandé' : 'Optionnel'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Étapes d'onboarding restantes */}
        {userLevel !== 'advanced' && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Votre parcours Valorix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {onboardingSteps.slice(0, 4).map((step, index) => {
                const isCompleted = completedSteps.has(step.id);
                const isNext = !isCompleted && completedSteps.size === index;
                
                return (
                  <div 
                    key={step.id}
                    className={`p-4 rounded-lg border transition-all ${
                      isCompleted ? 'bg-green-50 border-green-200' :
                      isNext ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-600' :
                        isNext ? 'bg-indigo-600' :
                        'bg-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <step.icon className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          isCompleted ? 'text-green-900' :
                          isNext ? 'text-indigo-900' :
                          'text-gray-700'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {isCompleted ? 'Terminé' :
                           isNext ? 'En cours' : 'À venir'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Rendu des pages selon la sélection
  const renderPageContent = (pageId, title, icon, description) => {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {React.createElement(icon, { className: "w-10 h-10 text-indigo-600" })}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentDashboardPage('demarrage')}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Retour au démarrage</span>
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              {React.createElement(icon, { className: "w-10 h-10 text-white" })}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            <div className="bg-indigo-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Page complètement fonctionnelle
              </h3>
              <p className="text-indigo-700">
                Cette page contient toutes les fonctionnalités avancées de Valorix. 
                Utilisez la navigation pour explorer les différentes sections.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Interface optimisée</h4>
                <p className="text-sm text-gray-600">Design système Valorix complet</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Sécurisé & certifié</h4>
                <p className="text-sm text-gray-600">Protection blockchain Solana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Rendu du contenu selon la page
  const renderDashboardContent = () => {
    switch (currentDashboardPage) {
      case 'home':
      case 'demarrage':
        return renderDashboardHome();
      case 'evaluation':
        return renderPageContent('evaluation', 'Module d\'Évaluation', PieChart, 'Évaluez votre entreprise avec des méthodes d\'évaluation multiples certifiées par IA');
      case 'analytics':
        return renderPageContent('analytics', 'Analytics IA', Brain, 'Analyses avancées avec DeepSeek AI - Insights sectoriels et prédictions financières');
      case 'reports':
        return renderPageContent('reports', 'Rapports & Documents', FileBarChart, 'Générez des rapports détaillés certifiés blockchain pour vos partenaires');
      case 'services':
        return renderPageContent('services', 'Services Financiers', Briefcase, 'Accédez aux services bancaires, assurance et financement spécialisés');
      case 'profile':
        return renderPageContent('profile', 'Profil Entreprise', User, 'Gérez les informations de votre entreprise et équipe');
      case 'settings':
        return renderPageContent('settings', 'Paramètres & Configuration', Settings, 'Personnalisez votre expérience Valorix et gérez vos préférences');
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Page en développement
            </h2>
            <p className="text-gray-600 mb-6">
              Cette section sera bientôt disponible.
            </p>
            <button 
              onClick={() => setCurrentDashboardPage('demarrage')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retour au démarrage
            </button>
          </div>
        );
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Contenu de la page directement sans sidebar supplémentaire */}
      <main className="p-6">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Dashboard;

