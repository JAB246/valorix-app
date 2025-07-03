import React, { useState } from 'react';
import {
  FileText, Download, Share2, Eye, Shield, Clock, Calendar,
  Search, Filter, Star, BarChart3, TrendingUp, Activity,
  CheckCircle2, AlertTriangle, Globe, Users, Building,
  DollarSign, Percent, Target, Zap, Award, PieChart,
  Plus, Edit, Trash2, Send, Mail, Printer, ExternalLink,
  FileSpreadsheet, Presentation, Image, Archive, Bookmark,
  Copy, RefreshCw, Settings, HelpCircle, ChevronDown,
  ChevronRight, ArrowLeft, ArrowRight, X, Layers,
  Lock, Unlock, Key, CreditCard, Hash, Network,
  UserCheck, HandHeart, Briefcase2, LineChart
} from 'lucide-react';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReports, setSelectedReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [blockchainVerification, setBlockchainVerification] = useState(false);

  // Types de rapports avec certification blockchain pour reprenabilité et évaluation
  const reportTypes = [
    {
      id: 'evaluation',
      name: 'Évaluation d\'Entreprise',
      description: 'Valorisation complète certifiée blockchain avec 4 méthodes',
      icon: Building,
      color: 'blue',
      templates: 4,
      avgTime: '15-20 min',
      blockchainCertified: true,
      priority: 'high',
      features: ['DCF', 'Multiples', 'Actif Net', 'IA Prédictive']
    },
    {
      id: 'reprenability',
      name: 'Rapport de Reprenabilité',
      description: 'Analyse complète de transmissibilité et succession d\'entreprise',
      icon: HandHeart,
      color: 'emerald',
      templates: 3,
      avgTime: '25-30 min',
      blockchainCertified: true,
      priority: 'high',
      features: ['Due Diligence', 'Valorisation', 'Fiscalité', 'Legal']
    },
    {
      id: 'financial',
      name: 'Analyse Financière',
      description: 'Performance financière et tendances sectorielles',
      icon: BarChart3,
      color: 'green',
      templates: 3,
      avgTime: '10-15 min',
      blockchainCertified: false,
      priority: 'medium',
      features: ['KPIs', 'Benchmarks', 'Projections']
    },
    {
      id: 'risk',
      name: 'Analyse de Risques',
      description: 'Identification et mitigation des facteurs de risque',
      icon: Shield,
      color: 'orange',
      templates: 2,
      avgTime: '12-18 min',
      blockchainCertified: false,
      priority: 'medium',
      features: ['ESG', 'Opérationnel', 'Financier']
    },
    {
      id: 'market',
      name: 'Étude de Marché',
      description: 'Positionnement concurrentiel et opportunités',
      icon: TrendingUp,
      color: 'purple',
      templates: 2,
      avgTime: '20-25 min',
      blockchainCertified: false,
      priority: 'low',
      features: ['Concurrence', 'Secteur', 'Opportunités']
    },
    {
      id: 'esg',
      name: 'Rapport ESG',
      description: 'Environnement, Social et Gouvernance',
      icon: Globe,
      color: 'teal',
      templates: 2,
      avgTime: '18-22 min',
      blockchainCertified: false,
      priority: 'medium',
      features: ['Carbon', 'Social Impact', 'Governance']
    }
  ];

  // Rapports générés avec focus sur la certification blockchain
  const generatedReports = [
    {
      id: 1,
      name: 'Évaluation TechStart SAS - Acquisition 2024',
      type: 'evaluation',
      status: 'completed',
      date: '2024-06-09',
      size: '32 pages',
      format: 'PDF + Blockchain',
      certified: true,
      blockchainHash: '0x4a8b9c...df123',
      views: 23,
      downloads: 8,
      confidenceScore: 97,
      value: '€2,350,000',
      blockchainNetwork: 'Solana',
      certificationDate: '2024-06-09 14:30 UTC'
    },
    {
      id: 2,
      name: 'Reprenabilité InnovCorp - Succession Familiale',
      type: 'reprenability',
      status: 'completed',
      date: '2024-06-05',
      size: '45 pages',
      format: 'PDF + Blockchain',
      certified: true,
      blockchainHash: '0x7e2f1a...bc456',
      views: 15,
      downloads: 4,
      transmissibilityScore: 89,
      fiscalOptimization: '€120,000',
      blockchainNetwork: 'Solana',
      certificationDate: '2024-06-05 16:45 UTC'
    },
    {
      id: 3,
      name: 'Analyse Financière Q2 2024',
      type: 'financial',
      status: 'completed',
      date: '2024-06-01',
      size: '16 pages',
      format: 'PDF + Excel',
      certified: false,
      views: 18,
      downloads: 12,
      trend: '+15.2%',
      performance: 'Excellente'
    },
    {
      id: 4,
      name: 'Évaluation BioTech Labs - IPO Prep',
      type: 'evaluation',
      status: 'in_progress',
      date: '2024-06-10',
      size: 'En cours...',
      format: 'PDF + Blockchain',
      certified: false,
      progress: 78,
      estimatedValue: '€8,500,000'
    },
    {
      id: 5,
      name: 'Rapport ESG - Conformité 2024',
      type: 'esg',
      status: 'draft',
      date: '2024-06-08',
      size: '22 pages',
      format: 'PDF',
      certified: false,
      carbonScore: 'B+',
      socialImpact: 'Positif'
    }
  ];

  // Templates spécialisés avec certification blockchain
  const templates = {
    evaluation: [
      {
        id: 'eval_ipo',
        name: 'Évaluation IPO/Acquisition',
        description: 'Rapport complet pour introduction en bourse ou cession',
        features: ['DCF Avancé', 'Multiples Sectoriels', 'Analyse Concurrentielle', 'Certification Blockchain'],
        certification: true,
        blockchain: true,
        pages: '30-40',
        price: 'Premium'
      },
      {
        id: 'eval_standard',
        name: 'Évaluation Standard',
        description: 'Valorisation complète avec 4 méthodes certifiées',
        features: ['DCF', 'Multiples', 'Actif Net', 'Méthode Mixte IA'],
        certification: true,
        blockchain: true,
        pages: '20-25',
        price: 'Standard'
      },
      {
        id: 'eval_express',
        name: 'Évaluation Express',
        description: 'Version condensée pour présentation rapide',
        features: ['Synthèse exécutive', 'Valorisation principale', 'Recommandations'],
        certification: true,
        blockchain: false,
        pages: '8-12',
        price: 'Basic'
      },
      {
        id: 'eval_detailed',
        name: 'Évaluation Due Diligence',
        description: 'Analyse exhaustive pour investisseurs institutionnels',
        features: ['Audit complet', 'Benchmarks', 'Scénarios', 'Risk Assessment'],
        certification: true,
        blockchain: true,
        pages: '40-60',
        price: 'Enterprise'
      }
    ],
    reprenability: [
      {
        id: 'repren_family',
        name: 'Succession Familiale',
        description: 'Transmission intergénérationnelle avec optimisation fiscale',
        features: ['Évaluation', 'Pacte Dutreil', 'Holding', 'Optimisation fiscale'],
        certification: true,
        blockchain: true,
        pages: '35-45',
        price: 'Premium'
      },
      {
        id: 'repren_management',
        name: 'LBO/Management Buy-Out',
        description: 'Reprise par l\'équipe dirigeante avec montage financier',
        features: ['Business Plan', 'Montage financier', 'Due Diligence', 'Garanties'],
        certification: true,
        blockchain: true,
        pages: '40-50',
        price: 'Premium'
      },
      {
        id: 'repren_external',
        name: 'Cession à Tiers',
        description: 'Préparation à la vente avec optimisation de valeur',
        features: ['Vendor DD', 'Teasing', 'Process de vente', 'Négociation'],
        certification: true,
        blockchain: true,
        pages: '30-40',
        price: 'Premium'
      }
    ],
    financial: [
      {
        id: 'fin_dashboard',
        name: 'Tableau de Bord Financier',
        description: 'KPIs et indicateurs clés en temps réel',
        features: ['Métriques temps réel', 'Alertes', 'Benchmarks'],
        certification: false,
        blockchain: false,
        pages: '6-8',
        price: 'Basic'
      },
      {
        id: 'fin_analysis',
        name: 'Analyse Financière Complète',
        description: 'Performance sur 3 ans avec projections',
        features: ['Historiques', 'Projections', 'Ratios sectoriels'],
        certification: false,
        blockchain: false,
        pages: '15-20',
        price: 'Standard'
      },
      {
        id: 'fin_audit',
        name: 'Audit Financier',
        description: 'Revue approfondie des comptes et procédures',
        features: ['Audit comptes', 'Procédures', 'Recommandations'],
        certification: false,
        blockchain: false,
        pages: '25-30',
        price: 'Premium'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-yellow-600 bg-yellow-50';
      case 'draft': return 'text-gray-600 bg-gray-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'draft': return 'Brouillon';
      case 'error': return 'Erreur';
      default: return 'Inconnu';
    }
  };

  const handleGenerateReport = (templateId) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedReport(null);
    }, 3000);
  };

  const filteredReports = generatedReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || report.type === filterBy;
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'completed' && report.status === 'completed') ||
      (activeTab === 'in_progress' && report.status === 'in_progress') ||
      (activeTab === 'drafts' && report.status === 'draft') ||
      (activeTab === 'blockchain' && report.certified && report.blockchainHash);
    
    return matchesSearch && matchesFilter && matchesTab;
  });

  return (
    <div className="space-y-8">
      {/* Header avec focus sur la certification blockchain */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports Certifiés</h1>
          <p className="text-gray-600 mt-1">
            Génération de rapports d'évaluation et de reprenabilité avec certification blockchain
          </p>
          <div className="flex items-center mt-3 space-x-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-600 font-medium">Certification Blockchain Active</span>
            </div>
            <div className="flex items-center">
              <Network className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-600">Réseau Solana</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedReport('new')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2 inline" />
            Nouveau Rapport Certifié
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Blockchain Active</span>
          </div>
        </div>
      </div>

      {/* Stats avec focus blockchain */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rapports Certifiés</p>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-xs text-green-600">Blockchain</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Évaluations</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-xs text-blue-600">+2 ce mois</p>
            </div>
            <Building className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reprenabilité</p>
              <p className="text-2xl font-bold text-emerald-600">4</p>
              <p className="text-xs text-emerald-600">Succession</p>
            </div>
            <HandHeart className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temps Moyen</p>
              <p className="text-2xl font-bold text-purple-600">18min</p>
              <p className="text-xs text-purple-600">Génération</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Téléchargements</p>
              <p className="text-2xl font-bold text-orange-600">247</p>
              <p className="text-xs text-orange-600">+45% ce mois</p>
            </div>
            <Download className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Types de Rapports avec mise en avant blockchain */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Types de Rapports Disponibles</h2>
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-lg">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Certification Blockchain</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map(type => (
            <div
              key={type.id}
              className={`relative p-6 border-2 rounded-xl hover:shadow-lg transition-all cursor-pointer ${
                type.blockchainCertified 
                  ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-300' 
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => setSelectedReport(type.id)}
            >
              {type.blockchainCertified && (
                <div className="absolute top-3 right-3">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-lg bg-${type.color}-100 flex items-center justify-center mb-4`}>
                <type.icon className={`w-6 h-6 text-${type.color}-600`} />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{type.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-1">
                  {type.features.slice(0, 3).map(feature => (
                    <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{type.templates} modèles</span>
                <span>{type.avgTime}</span>
              </div>
              
              {type.blockchainCertified && (
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <Key className="w-3 h-3 mr-1" />
                  <span>Certification Blockchain</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filtres et Recherche avec onglet blockchain */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              {[
                { id: 'all', label: 'Tous', icon: null },
                { id: 'completed', label: 'Terminés', icon: CheckCircle2 },
                { id: 'in_progress', label: 'En cours', icon: Clock },
                { id: 'drafts', label: 'Brouillons', icon: Edit },
                { id: 'blockchain', label: 'Blockchain', icon: Shield }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? tab.id === 'blockchain' 
                        ? 'bg-green-600 text-white'
                        : 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un rapport..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="evaluation">Évaluation</option>
              <option value="reprenability">Reprenabilité</option>
              <option value="financial">Financier</option>
              <option value="risk">Risques</option>
              <option value="market">Marché</option>
              <option value="esg">ESG</option>
            </select>
          </div>
        </div>

        {/* Liste des Rapports avec détails blockchain */}
        <div className="space-y-4">
          {filteredReports.map(report => (
            <div key={report.id} className={`p-6 border rounded-xl transition-all ${
              report.certified && report.blockchainHash 
                ? 'border-green-200 bg-green-50/30 hover:bg-green-50/50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    report.certified && report.blockchainHash ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {report.certified && report.blockchainHash ? (
                      <Shield className="w-6 h-6 text-green-600" />
                    ) : (
                    <FileText className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {report.name}
                      {report.certified && report.blockchainHash && (
                        <Shield className="w-4 h-4 text-green-600 ml-2" />
                      )}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                      <span className="text-sm text-gray-600">{report.date}</span>
                      <span className="text-sm text-gray-600">{report.size}</span>
                      {report.certified && report.blockchainHash && (
                        <div className="flex items-center">
                          <Hash className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600 font-mono">
                            {report.blockchainHash}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {report.status === 'in_progress' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${report.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{report.progress}%</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    {report.certified && report.blockchainHash && (
                      <button className="p-2 text-green-400 hover:text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                        <Shield className="w-4 h-4" />
                    </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Métriques spécialisées */}
              <div className="mt-4 space-y-3">
                {/* Blockchain info */}
                {report.certified && report.blockchainHash && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Network className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">
                          Certifié Blockchain {report.blockchainNetwork}
                        </span>
                      </div>
                      <span className="text-xs text-green-600">
                        {report.certificationDate}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-green-700 font-mono">
                      Hash: {report.blockchainHash}
                    </div>
                  </div>
                )}

                {/* Métriques par type */}
                <div className="flex items-center space-x-6 text-sm">
                  {report.confidenceScore && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-gray-600">Confiance: {report.confidenceScore}%</span>
                    </div>
                  )}
                  {report.value && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-gray-600">Valorisation: {report.value}</span>
                    </div>
                  )}
                  {report.transmissibilityScore && (
                    <div className="flex items-center">
                      <HandHeart className="w-4 h-4 text-emerald-600 mr-1" />
                      <span className="text-gray-600">Transmissibilité: {report.transmissibilityScore}%</span>
                    </div>
                  )}
                  {report.fiscalOptimization && (
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-gray-600">Économie fiscale: {report.fiscalOptimization}</span>
                    </div>
                  )}
                  {report.trend && (
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-gray-600">Tendance: {report.trend}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-gray-600">{report.views || 0} vues</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-gray-600">{report.downloads || 0} téléchargements</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rapport trouvé</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterBy !== 'all' 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par créer votre premier rapport certifié'
              }
            </p>
            <button
              onClick={() => setSelectedReport('new')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Créer un rapport certifié
            </button>
          </div>
        )}
      </div>

      {/* Modal de sélection de template avec blockchain */}
      {selectedReport && selectedReport !== 'new' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  Nouveau Rapport - {reportTypes.find(t => t.id === selectedReport)?.name}
                  {reportTypes.find(t => t.id === selectedReport)?.blockchainCertified && (
                    <Shield className="w-5 h-5 text-green-600 ml-2" />
                  )}
                </h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {reportTypes.find(t => t.id === selectedReport)?.blockchainCertified && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-800 font-medium">
                      Ce rapport sera automatiquement certifié sur la blockchain Solana
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Choisissez un modèle</h3>
              <div className="space-y-4">
                {templates[selectedReport]?.map(template => (
                  <div
                    key={template.id}
                    className={`p-6 border rounded-xl hover:shadow-md transition-all cursor-pointer ${
                      template.blockchain 
                        ? 'border-green-200 bg-green-50/30 hover:bg-green-50/50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => handleGenerateReport(template.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-gray-900">{template.name}</h4>
                          {template.blockchain && (
                            <Shield className="w-4 h-4 text-green-600 ml-2" />
                          )}
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            template.price === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                            template.price === 'Premium' ? 'bg-blue-100 text-blue-800' :
                            template.price === 'Standard' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {template.price}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{template.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {template.features.map(feature => (
                            <span
                              key={feature}
                              className={`px-3 py-1 text-xs rounded-full ${
                                feature.includes('Blockchain') 
                                  ? 'bg-green-100 text-green-700 font-medium'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="flex items-center mb-2">
                          {template.certification && (
                            <Shield className="w-4 h-4 text-green-600 mr-1" />
                          )}
                          <span className="text-sm text-gray-600">{template.pages} pages</span>
                        </div>
                        <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          template.blockchain
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}>
                          {template.blockchain ? 'Générer + Certifier' : 'Générer'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de génération avec blockchain */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Génération et Certification</h3>
              <p className="text-gray-600 mb-4">Notre IA génère votre rapport et le certifie sur la blockchain</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Génération IA</span>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Validation qualité</span>
                  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Certification blockchain</span>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full"></div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full animate-pulse w-2/3"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Temps estimé: 3-4 minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;


