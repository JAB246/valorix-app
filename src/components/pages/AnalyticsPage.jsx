import React, { useState } from 'react';
import {
  BarChart3, Brain, Target, Shield, TrendingUp, Activity, Globe, 
  CheckCircle2, AlertTriangle, XCircle, Search, Filter, Download,
  Upload, Users, Award, Zap, DollarSign, Percent, Calendar,
  Clock, FileText, Settings, Bell, ChevronDown, ArrowRight,
  Plus, Minus, Edit, Trash2, Save, X, RefreshCw, Info,
  ThumbsUp, Star, Lightbulb, Calculator, Database, Building
} from 'lucide-react';

const AnalyticsPage = () => {
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
                  <div className="text-sm text-green-700">DeepSeek + Multi-Agent</div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-purple-900">Insights Générés</h3>
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-900 mb-2">47</div>
                  <div className="text-sm text-purple-700">Cette semaine</div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-orange-900">Alertes Actives</h3>
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-900 mb-2">3</div>
                  <div className="text-sm text-orange-700">Surveillance continue</div>
                </div>
              </div>

              {/* Analyses stratégiques rapides */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyses Stratégiques Disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {strategicAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => setActiveTab('strategic')}>
                      <div className="flex items-center justify-between mb-3">
                        <analysis.icon className="w-8 h-8 text-indigo-600" />
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                          analysis.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {analysis.status === 'completed' ? 'Terminé' :
                           analysis.status === 'in_progress' ? 'En cours' : 'En attente'}
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{analysis.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{analysis.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Confiance</span>
                        <span className="font-medium text-gray-900">{analysis.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'strategic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {strategicAnalyses.map((analysis) => (
                  <div 
                    key={analysis.id} 
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${
                      selectedAnalysis?.id === analysis.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAnalysis(analysis)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <analysis.icon className="w-8 h-8 text-indigo-600" />
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                        analysis.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {analysis.status === 'completed' ? 'Terminé' :
                         analysis.status === 'in_progress' ? 'En cours' : 'En attente'}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{analysis.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{analysis.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{analysis.lastUpdate}</span>
                      <span className="text-sm font-medium text-indigo-600">{analysis.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedAnalysis && (
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <selectedAnalysis.icon className="w-8 h-8 text-indigo-600" />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{selectedAnalysis.name}</h2>
                        <p className="text-gray-600">{selectedAnalysis.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartAnalysis(selectedAnalysis.name)}
                      disabled={isAnalyzing}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                    >
                      {isAnalyzing ? 'Analyse...' : 'Actualiser'}
                    </button>
                  </div>

                  {isAnalyzing && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progression de l'analyse</span>
                        <span className="text-sm font-medium text-gray-900">{analysisProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${analysisProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {renderAnalysisDetail(selectedAnalysis)}
                </div>
              )}
            </div>
          )}

          {activeTab === 'assistant' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Assistant IA Valorix</h2>
                    <p className="text-gray-600">Posez vos questions sur vos analyses stratégiques</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 h-96 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>Commencez une conversation avec l'assistant IA</p>
                    </div>
                  ) : (
                    chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-indigo-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Posez votre question..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Autres onglets avec contenu simplifié */}
          {activeTab === 'competitive' && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Veille Concurrentielle</h3>
              <p className="text-gray-600">Module de surveillance des concurrents en temps réel</p>
            </div>
          )}

          {activeTab === 'sentiment' && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sentiment Marché</h3>
              <p className="text-gray-600">Analyse du sentiment marché via IA sociale</p>
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simulation Impact</h3>
              <p className="text-gray-600">Modélisation d'impact de décisions stratégiques</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

