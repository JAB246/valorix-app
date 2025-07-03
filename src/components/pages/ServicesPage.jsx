import React, { useState } from 'react';
import {
  CreditCard, Briefcase, TrendingUp, Shield, Users, Building,
  DollarSign, Calculator, FileText, Globe, Award, Star,
  Clock, Calendar, CheckCircle2, AlertTriangle, Info,
  ArrowRight, Plus, Edit, Eye, Download, Upload,
  Phone, Mail, Settings, HelpCircle, Search, Filter,
  X, ChevronDown, ChevronRight, ExternalLink, Zap,
  BarChart3, Target, Activity, Percent, Banknote,
  Wallet, PiggyBank, TrendingDown, AlertCircle,
  LineChart, PieChart, Package, Truck, Lock
} from 'lucide-react';

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedService, setSelectedService] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const serviceCategories = [
    { id: 'financing', name: 'Financement', count: 8, icon: DollarSign, color: 'green' },
    { id: 'banking', name: 'Services Bancaires', count: 6, icon: CreditCard, color: 'blue' },
    { id: 'insurance', name: 'Assurances', count: 4, icon: Shield, color: 'purple' },
    { id: 'advisory', name: 'Conseil', count: 5, icon: Users, color: 'orange' },
    { id: 'legal', name: 'Juridique', count: 3, icon: FileText, color: 'red' },
    { id: 'analytics', name: 'Analytics', count: 7, icon: BarChart3, color: 'indigo' }
  ];

  const availableServices = [
    {
      id: 'credit_line',
      name: 'Ligne de Crédit',
      category: 'financing',
      provider: 'Valorix Finance',
      description: 'Accédez à une ligne de crédit flexible basée sur votre évaluation',
      icon: DollarSign,
      color: 'green',
      price: 'Dès 2.5% APR',
      duration: '24-60 mois',
      amount: '10K - 500K €',
      requirements: ['Score Valorix > 75', 'CA > 100K€', 'Activité > 2 ans'],
      features: ['Déblocage flexible', 'Remboursement anticipé', 'Taux préférentiel'],
      popularity: 95,
      status: 'available',
      processing: '48h',
      documents: ['Bilan', 'Compte de résultat', 'Kbis'],
      advantages: ['Pas de garantie personnelle', 'Décision automatisée', 'Fonds disponibles sous 48h']
    },
    {
      id: 'factoring',
      name: 'Affacturage',
      category: 'financing',
      provider: 'Factor Plus',
      description: 'Financez votre BFR en cédant vos factures clients',
      icon: FileText,
      color: 'blue',
      price: '1.5-3% par mois',
      duration: 'Flexible',
      amount: '5K - 2M €',
      requirements: ['Factures B2B', 'Clients notés', 'Délais < 90j'],
      features: ['Financement immédiat', 'Gestion des impayés', 'Assurance crédit'],
      popularity: 88,
      status: 'available',
      processing: '24h',
      documents: ['Factures', 'Conditions générales', 'Kbis'],
      advantages: ['Amélioration trésorerie', 'Transfert du risque', 'Gestion externalisée']
    },
    {
      id: 'leasing',
      name: 'Crédit-bail mobilier',
      category: 'financing',
      provider: 'Lease Expert',
      description: 'Financez vos équipements sans mobiliser vos fonds propres',
      icon: Package,
      color: 'purple',
      price: '3-7% par an',
      duration: '12-84 mois',
      amount: '5K - 1M €',
      requirements: ['Devis fournisseur', 'Justificatifs activité', 'Score > 60'],
      features: ['Option rachat', 'Entretien inclus', 'Flexibilité'],
      popularity: 82,
      status: 'available',
      processing: '72h',
      documents: ['Devis', 'Bilan', 'Business plan'],
      advantages: ['Préservation trésorerie', 'Avantages fiscaux', 'Renouvellement facilité']
    },
    {
      id: 'business_account',
      name: 'Compte Pro',
      category: 'banking',
      provider: 'Valorix Bank',
      description: 'Compte professionnel avec services intégrés',
      icon: CreditCard,
      color: 'blue',
      price: '9€/mois',
      duration: 'Sans engagement',
      amount: 'Illimité',
      requirements: ['Entreprise française', 'Activité légale', 'Dirigeant majeur'],
      features: ['Cartes incluses', 'Virements SEPA', 'API intégrée'],
      popularity: 92,
      status: 'available',
      processing: '24h',
      documents: ['Kbis', 'Pièce identité', 'Justificatif adresse'],
      advantages: ['Ouverture rapide', 'Frais transparents', 'Support dédié']
    },
    {
      id: 'payment_terminal',
      name: 'Terminal de Paiement',
      category: 'banking',
      provider: 'PayTech',
      description: 'Solutions de paiement pour vos clients',
      icon: CreditCard,
      color: 'green',
      price: '0.8-2.2% par transaction',
      duration: 'Sans engagement',
      amount: 'Illimité',
      requirements: ['Compte pro', 'Activité commerciale', 'Local'],
      features: ['Sans contact', 'Paiement mobile', 'Reporting'],
      popularity: 85,
      status: 'available',
      processing: '48h',
      documents: ['Kbis', 'Attestation bancaire', 'Photos local'],
      advantages: ['Installation gratuite', 'Support technique', 'Encaissement rapide']
    },
    {
      id: 'cyber_insurance',
      name: 'Cyber-assurance',
      category: 'insurance',
      provider: 'CyberSafe',
      description: 'Protection contre les risques cyber et data breach',
      icon: Shield,
      color: 'red',
      price: '150-800€/an',
      duration: '12 mois',
      amount: '100K - 5M €',
      requirements: ['Audit sécurité', 'Politique IT', 'Formation équipe'],
      features: ['Réponse incident', 'Récupération données', 'Assistance juridique'],
      popularity: 78,
      status: 'available',
      processing: '5 jours',
      documents: ['Audit IT', 'Questionnaire', 'Politique sécurité'],
      advantages: ['Couverture complète', 'Expertise technique', 'Assistance 24/7']
    },
    {
      id: 'business_coaching',
      name: 'Coaching Business',
      category: 'advisory',
      provider: 'Expert Conseil',
      description: 'Accompagnement personnalisé pour votre développement',
      icon: Users,
      color: 'orange',
      price: '150-300€/h',
      duration: '3-12 mois',
      amount: 'Sur mesure',
      requirements: ['Diagnostic initial', 'Objectifs définis', 'Engagement dirigeant'],
      features: ['Suivi personnalisé', 'Outils dédiés', 'ROI mesurable'],
      popularity: 89,
      status: 'available',
      processing: '7 jours',
      documents: ['Diagnostic', 'Objectifs', 'Planning'],
      advantages: ['Expertise métier', 'Résultats mesurés', 'Réseau professionnel']
    },
    {
      id: 'legal_support',
      name: 'Support Juridique',
      category: 'legal',
      provider: 'LegalTech',
      description: 'Assistance juridique et veille réglementaire',
      icon: FileText,
      color: 'purple',
      price: '99-299€/mois',
      duration: 'Abonnement',
      amount: 'Illimité',
      requirements: ['Entreprise française', 'Secteur légal', 'Besoins identifiés'],
      features: ['Hotline juridique', 'Documents types', 'Veille réglementaire'],
      popularity: 76,
      status: 'available',
      processing: '24h',
      documents: ['Kbis', 'Statuts', 'Questionnaire besoins'],
      advantages: ['Expertise pointue', 'Réactivité', 'Coût maîtrisé']
    }
  ];

  const myServices = [
    {
      id: 'current_credit',
      name: 'Ligne de Crédit Active',
      category: 'financing',
      provider: 'Valorix Finance',
      status: 'active',
      startDate: '2024-03-15',
      endDate: '2026-03-15',
      amount: '150,000 €',
      used: '45,000 €',
      available: '105,000 €',
      rate: '2.8% APR',
      nextPayment: '2024-06-15',
      paymentAmount: '1,250 €',
      usage: 30,
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 'current_account',
      name: 'Compte Pro Valorix',
      category: 'banking',
      provider: 'Valorix Bank',
      status: 'active',
      startDate: '2024-01-10',
      balance: '23,750 €',
      transactions: 142,
      lastTransaction: '2024-06-10',
      monthlyFees: '9 €',
      features: ['Carte Gold', 'Virements SEPA', 'API'],
      icon: CreditCard,
      color: 'blue'
    },
    {
      id: 'pending_insurance',
      name: 'Cyber-assurance',
      category: 'insurance',
      provider: 'CyberSafe',
      status: 'pending',
      applicationDate: '2024-06-05',
      expectedDate: '2024-06-15',
      coverage: '1,000,000 €',
      premium: '450 €/an',
      documents: 'En cours de validation',
      icon: Shield,
      color: 'orange'
    }
  ];

  const serviceStats = {
    totalServices: myServices.length,
    activeServices: myServices.filter(s => s.status === 'active').length,
    pendingServices: myServices.filter(s => s.status === 'pending').length,
    monthlyCost: 1309,
    totalFinancing: 150000,
    usedFinancing: 45000
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'expired': return 'text-red-600 bg-red-50';
      case 'suspended': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'suspended': return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category) => {
    const categoryData = serviceCategories.find(c => c.id === category);
    return categoryData ? categoryData.icon : Briefcase;
  };

  const handleRequestService = (service) => {
    setSelectedService(service);
    setShowRequestModal(true);
  };

  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Financiers</h1>
          <p className="text-gray-600 mt-1">Découvrez notre écosystème de services partenaires</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowRequestModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2 inline" />
            Demander un service
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Services Actifs</span>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Services Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{serviceStats.activeServices}</p>
              <p className="text-xs text-green-600">+{serviceStats.pendingServices} en attente</p>
            </div>
            <Briefcase className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coût Mensuel</p>
              <p className="text-2xl font-bold text-gray-900">{serviceStats.monthlyCost.toLocaleString()} €</p>
              <p className="text-xs text-blue-600">Optimisé</p>
            </div>
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Financement Total</p>
              <p className="text-2xl font-bold text-gray-900">{(serviceStats.totalFinancing / 1000).toFixed(0)}K €</p>
              <p className="text-xs text-green-600">{((serviceStats.usedFinancing / serviceStats.totalFinancing) * 100).toFixed(0)}% utilisé</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Disponible</p>
              <p className="text-2xl font-bold text-gray-900">{((serviceStats.totalFinancing - serviceStats.usedFinancing) / 1000).toFixed(0)}K €</p>
              <p className="text-xs text-purple-600">Crédit disponible</p>
            </div>
            <Wallet className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Mes Services', count: myServices.length },
              { id: 'available', label: 'Services Disponibles', count: availableServices.length },
              { id: 'categories', label: 'Par Catégorie', count: serviceCategories.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Search */}
          {activeTab === 'available' && (
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
                />
              </div>
            </div>
          )}

          {/* Contenu des tabs */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {myServices.map(service => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-${service.color}-100 flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 text-${service.color}-600`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                              {getStatusIcon(service.status)}
                              <span className="ml-1">
                                {service.status === 'active' ? 'Actif' :
                                 service.status === 'pending' ? 'En attente' :
                                 service.status === 'expired' ? 'Expiré' : 'Suspendu'}
                              </span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{service.provider}</p>
                          
                          {service.status === 'active' && (
                            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {service.amount && (
                                <div>
                                  <span className="text-gray-600">Montant: </span>
                                  <span className="font-medium">{service.amount}</span>
                                </div>
                              )}
                              {service.balance && (
                                <div>
                                  <span className="text-gray-600">Solde: </span>
                                  <span className="font-medium">{service.balance}</span>
                                </div>
                              )}
                              {service.used && (
                                <div>
                                  <span className="text-gray-600">Utilisé: </span>
                                  <span className="font-medium">{service.used}</span>
                                </div>
                              )}
                              {service.nextPayment && (
                                <div>
                                  <span className="text-gray-600">Prochaine échéance: </span>
                                  <span className="font-medium">{service.nextPayment}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {service.status === 'pending' && (
                            <div className="mt-2 text-sm">
                              <span className="text-gray-600">Demande du: </span>
                              <span className="font-medium">{service.applicationDate}</span>
                              <span className="text-gray-600 ml-4">Réponse attendue: </span>
                              <span className="font-medium">{service.expectedDate}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Barre de progression pour les financements */}
                    {service.usage && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Utilisation</span>
                          <span>{service.usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${service.color}-500 h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${service.usage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {myServices.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service actif</h3>
                  <p className="text-gray-600 mb-6">Découvrez nos services partenaires pour développer votre entreprise</p>
                  <button
                    onClick={() => setActiveTab('available')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Voir les services disponibles
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'available' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="p-6 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-${service.color}-100 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${service.color}-600`} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span className="text-xs text-gray-600">{service.popularity}%</span>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {service.processing}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.provider}</p>
                    <p className="text-sm text-gray-700 mb-4">{service.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Prix:</span>
                          <div className="font-medium text-gray-900">{service.price}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Durée:</span>
                          <div className="font-medium text-gray-900">{service.duration}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Montant:</span>
                          <div className="font-medium text-gray-900">{service.amount}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Délai:</span>
                          <div className="font-medium text-gray-900">{service.processing}</div>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-gray-500">Avantages:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.advantages.slice(0, 2).map(advantage => (
                            <span
                              key={advantage}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {advantage}
                            </span>
                          ))}
                          {service.advantages.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{service.advantages.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-gray-500">Prérequis:</span>
                        <div className="text-xs text-gray-700 mt-1">
                          {service.requirements.slice(0, 2).join(', ')}
                          {service.requirements.length > 2 && '...'}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRequestService(service)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        Demander
                      </button>
                      <button
                        onClick={() => setSelectedService(service)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map(category => {
                const IconComponent = category.icon;
                return (
                  <div key={category.id} className="p-6 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-${category.color}-100 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} services</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Services populaires dans cette catégorie
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails du service */}
      {selectedService && !showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <selectedService.icon className={`w-8 h-8 text-${selectedService.color}-600`} />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedService.name}</h2>
                    <p className="text-gray-600">{selectedService.provider}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700">{selectedService.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Conditions</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Prix:</span>
                        <div className="font-medium text-gray-900">{selectedService.price}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Durée:</span>
                        <div className="font-medium text-gray-900">{selectedService.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Montant:</span>
                        <div className="font-medium text-gray-900">{selectedService.amount}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Délai:</span>
                        <div className="font-medium text-gray-900">{selectedService.processing}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Avantages</h3>
                    <ul className="space-y-2">
                      {selectedService.advantages.map(advantage => (
                        <li key={advantage} className="flex items-center text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Prérequis</h3>
                    <ul className="space-y-2">
                      {selectedService.requirements.map(requirement => (
                        <li key={requirement} className="flex items-center text-sm text-gray-700">
                          <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents nécessaires</h3>
                    <ul className="space-y-2">
                      {selectedService.documents.map(document => (
                        <li key={document} className="flex items-center text-sm text-gray-700">
                          <FileText className="w-4 h-4 text-blue-600 mr-2" />
                          {document}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Fonctionnalités</h3>
                    <ul className="space-y-2">
                      {selectedService.features.map(feature => (
                        <li key={feature} className="flex items-center text-sm text-gray-700">
                          <Zap className="w-4 h-4 text-purple-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => handleRequestService(selectedService)}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Faire une demande
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de demande de service */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Demande de service
                  {selectedService && ` - ${selectedService.name}`}
                </h2>
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    setSelectedService(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de service
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="">Sélectionner un service</option>
                    {availableServices.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.provider}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant souhaité
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 50,000 €"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée souhaitée
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option>12 mois</option>
                      <option>24 mois</option>
                      <option>36 mois</option>
                      <option>48 mois</option>
                      <option>60 mois</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contexte et besoins
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre projet et vos besoins spécifiques..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Échéance souhaitée
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Information</p>
                      <p>
                        Votre demande sera étudiée par nos partenaires dans un délai de 48h. 
                        Vous recevrez une réponse personnalisée par email.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Envoyer la demande
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRequestModal(false);
                      setSelectedService(null);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;

