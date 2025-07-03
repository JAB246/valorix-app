import React, { useState } from 'react';
import {
  Upload, Brain, Calculator, FileText, Share2, Download, Shield,
  AlertTriangle, CheckCircle2, Info, Target, Clock, FileSpreadsheet,
  Presentation, Settings, ArrowRight, ArrowLeft, RotateCcw, Play,
  Pause, Plus, X, Check, Eye, BarChart3, TrendingUp, DollarSign,
  Users, Building, Activity, Zap, Award, Star, Lightbulb
} from 'lucide-react';

const EvaluationModule = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [extractedData, setExtractedData] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [showPlanComptableConverter, setShowPlanComptableConverter] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Import des Données',
      description: 'Téléchargement et extraction automatique des documents financiers',
      icon: Upload,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Analyse IA',
      description: 'Traitement par les agents IA spécialisés (DeepSeek)',
      icon: Brain,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Évaluation',
      description: 'Calcul de la valorisation avec méthodes multiples',
      icon: Calculator,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      title: 'Rapport Final',
      description: 'Génération du rapport certifié blockchain',
      icon: FileText,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const supportedFormats = [
    { type: 'FEC', description: 'Fichier des Écritures Comptables (ancien et PCG 2025)', icon: FileSpreadsheet },
    { type: 'PDF', description: 'Bilans, comptes de résultat, liasses fiscales', icon: FileText },
    { type: 'Excel', description: 'Balances, grands livres, prévisionnels', icon: FileSpreadsheet },
    { type: 'PowerPoint', description: 'Présentations financières', icon: Presentation }
  ];

  const evaluationMethods = [
    {
      name: 'DCF (Discounted Cash Flow)',
      description: 'Actualisation des flux de trésorerie futurs',
      confidence: 92,
      result: '€2,450,000',
      details: 'Taux d\'actualisation: 8.5% | Croissance perpétuelle: 2.5%'
    },
    {
      name: 'Multiples Sectoriels',
      description: 'Comparaison avec entreprises similaires',
      confidence: 87,
      result: '€2,280,000',
      details: 'P/E: 15.2x | EV/EBITDA: 8.7x | P/B: 2.1x'
    },
    {
      name: 'Actif Net Réévalué',
      description: 'Valeur patrimoniale ajustée',
      confidence: 94,
      result: '€1,950,000',
      details: 'Actifs corporels: €1.2M | Incorporels: €750K'
    },
    {
      name: 'Méthode Mixte (Valorix)',
      description: 'Synthèse pondérée par IA',
      confidence: 96,
      result: '€2,350,000',
      details: 'Pondération optimisée par machine learning'
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Simulation de l'extraction automatique
    setIsProcessing(true);
    setTimeout(() => {
      setExtractedData({
        chiffreAffaires: '€1,250,000',
        resultatNet: '€185,000',
        totalActif: '€890,000',
        capitauxPropres: '€420,000',
        endettement: '€470,000',
        ebitda: '€245,000',
        planComptable: 'PCG 2014', // Ancien plan détecté
        qualiteData: 94
      });
      setIsProcessing(false);
    }, 3000);
  };

  const handlePlanComptableConversion = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setExtractedData(prev => ({
        ...prev,
        planComptable: 'PCG 2025',
        qualiteData: 98
      }));
      setIsProcessing(false);
      setShowPlanComptableConverter(false);
    }, 2000);
  };

  const handleStartEvaluation = () => {
    setIsProcessing(true);
    setCurrentStep(3);
    
    setTimeout(() => {
      setEvaluationResults({
        valorisationPrincipale: '€2,350,000',
        fourchette: '€2,100,000 - €2,600,000',
        confianceIA: 96,
        recommandations: [
          'Optimiser la structure de coûts pour améliorer l\'EBITDA',
          'Diversifier les sources de revenus',
          'Renforcer les fonds propres avant expansion'
        ],
        risques: [
          'Dépendance à quelques clients majeurs',
          'Secteur en mutation technologique',
          'Concurrence accrue'
        ]
      });
      setIsProcessing(false);
    }, 4000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Formats Supportés</h3>
                <div className="space-y-3">
                  {supportedFormats.map((format, index) => (
                    <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <format.icon className="w-8 h-8 text-indigo-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">{format.type}</h4>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Zone de Téléchargement</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Glissez vos fichiers ici
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    ou cliquez pour sélectionner
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.xlsx,.xls,.fec,.ppt,.pptx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Sélectionner les fichiers
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Fichiers téléchargés:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {extractedData && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Données Extraites par IA</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Qualité: {extractedData.qualiteData}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
                    <p className="text-lg font-bold text-blue-600">{extractedData.chiffreAffaires}</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Résultat Net</p>
                    <p className="text-lg font-bold text-green-600">{extractedData.resultatNet}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Actif</p>
                    <p className="text-lg font-bold text-purple-600">{extractedData.totalActif}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">EBITDA</p>
                    <p className="text-lg font-bold text-orange-600">{extractedData.ebitda}</p>
                  </div>
                </div>

                {extractedData.planComptable === 'PCG 2014' && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Plan Comptable Ancien Détecté</h4>
                          <p className="text-sm text-yellow-700">Conversion vers PCG 2025 recommandée pour une meilleure précision</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPlanComptableConverter(true)}
                        className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Convertir
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Lancer l'Analyse IA
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyse IA en Cours</h3>
              <p className="text-gray-600">Les agents spécialisés traitent vos données financières</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Agent Extraction Financière', status: 'completed', progress: 100 },
                { name: 'Agent Analyse Sectorielle', status: 'processing', progress: 75 },
                { name: 'Agent Évaluation Prédictive', status: 'processing', progress: 45 },
                { name: 'Agent Certification Blockchain', status: 'waiting', progress: 0 }
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
                  <div className="text-xs text-gray-600 mt-1">{agent.progress}%</div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights IA Préliminaires</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-900">Données financières cohérentes et fiables</p>
                    <p className="text-xs text-gray-600">Confiance: 94%</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-900">Croissance régulière sur les 3 dernières années</p>
                    <p className="text-xs text-gray-600">Tendance: +12% annuel</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-900">Positionnement sectoriel favorable</p>
                    <p className="text-xs text-gray-600">Top 25% du secteur</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleStartEvaluation}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Procéder à l'Évaluation
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {evaluationResults ? (
              <>
                <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Valorisation Calculée</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">{evaluationResults.valorisationPrincipale}</div>
                  <p className="text-green-700">Fourchette: {evaluationResults.fourchette}</p>
                  <div className="flex items-center justify-center mt-4">
                    <Brain className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-green-700">Confiance IA: {evaluationResults.confianceIA}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {evaluationMethods.map((method, index) => (
                    <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <div className="text-lg font-bold text-indigo-600">{method.result}</div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Confiance</span>
                          <span>{method.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${method.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{method.details}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                      Recommandations IA
                    </h3>
                    <div className="space-y-3">
                      {evaluationResults.recommandations.map((rec, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                          <p className="text-sm text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                      Facteurs de Risque
                    </h3>
                    <div className="space-y-3">
                      {evaluationResults.risques.map((risque, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                          <p className="text-sm text-gray-700">{risque}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Générer le Rapport Final
                  </button>
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

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapport d'Évaluation Généré</h3>
              <p className="text-gray-600">Document certifié blockchain disponible</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rapport_Evaluation_TechStart_2024.pdf</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Certifié Solana</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Pages</p>
                  <p className="text-lg font-bold text-blue-600">24</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Hash Blockchain</p>
                  <p className="text-lg font-bold text-green-600">Vérifié</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Généré le</p>
                  <p className="text-lg font-bold text-purple-600">09/06/2024</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Contenu du Rapport:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Synthèse exécutive',
                    'Analyse financière détaillée',
                    'Méthodes d\'évaluation appliquées',
                    'Comparaisons sectorielles',
                    'Analyse des risques',
                    'Recommandations stratégiques',
                    'Annexes techniques',
                    'Certification blockchain'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Download className="w-4 h-4 mr-2 inline" />
                  Télécharger PDF
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Share2 className="w-4 h-4 mr-2 inline" />
                  Partager
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Shield className="w-4 h-4 mr-2 inline" />
                  Vérifier Blockchain
                </button>
              </div>
            </div>
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
          <p className="text-gray-600 mt-1">Évaluation d'entreprise par IA avec certification blockchain</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <RotateCcw className="w-4 h-4 mr-2 inline" />
            Nouvelle Évaluation
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">IA Active</span>
          </div>
        </div>
      </div>

      {/* Indicateur de progression */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                currentStep >= step.id
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                <step.icon className="w-6 h-6" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-indigo-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        {renderStepContent()}
      </div>

      {/* Convertisseur Plan Comptable Modal */}
      {showPlanComptableConverter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Conversion Plan Comptable</h3>
              <button
                onClick={() => setShowPlanComptableConverter(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">
                  Conversion automatique PCG 2014 → PCG 2025
                </p>
                <div className="flex items-center text-xs text-yellow-700">
                  <Info className="w-4 h-4 mr-1" />
                  Amélioration de la précision d'évaluation (+4%)
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPlanComptableConverter(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handlePlanComptableConversion}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? 'Conversion...' : 'Convertir'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Précédent
        </button>
        
        {currentStep < 4 && (
          <button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={!extractedData && currentStep === 1}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Suivant
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EvaluationModule;

