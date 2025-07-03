import { useState, useEffect } from 'react';
import { 
  Brain, 
  Shield, 
  Zap, 
  TrendingUp, 
  CheckCircle, 
  Star,
  ArrowRight,
  Play,
  Users,
  Award,
  BarChart3,
  Sparkles,
  Rocket,
  Globe,
  Lock,
  Target,
  Activity,
  FileText,
  DollarSign,
  Building,
  CreditCard,
  UserCheck,
  PieChart,
  LineChart,
  Briefcase,
  Search,
  Lightbulb,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

export function LandingPage({ onGetStarted }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDemoClick = () => {
    console.log('Ouverture de la démo');
  };

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
              <button onClick={handleScrollToFeatures} className="text-gray-600 hover:text-indigo-600 transition-colors">
                Fonctionnalités
              </button>
              <a href="#services" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Services
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Témoignages
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Tarifs
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366F1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10 animate-pulse delay-500"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium rounded-full border border-indigo-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-5 h-5 mr-2" />
                Powered by AI & Blockchain
                <Rocket className="w-5 h-5 ml-2" />
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
              Révolutionnez la valorisation
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                de votre entreprise
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              <strong>Valorix</strong> combine intelligence artificielle adaptative, certification blockchain et écosystème de services financiers 
              pour transformer votre analyse d'entreprise en stratégie de croissance concrète.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-lg font-semibold"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
              
              <button 
                onClick={handleDemoClick}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-indigo-300 px-10 py-5 text-lg transition-all duration-300 hover:shadow-lg rounded-lg font-semibold"
              >
                <Play className="mr-2 w-5 h-5 inline" />
                Voir la démo
              </button>
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
            <div className="flex items-center justify-center space-x-12 opacity-60 mb-12">
              {['MEDEF', 'CCI Paris', 'Ordre des Experts-Comptables', 'BPI France', 'Réseau Entreprendre'].map((partner) => (
                <div key={partner} className="text-lg font-semibold text-gray-400 hover:text-indigo-500 transition-colors duration-200">
                  {partner}
                </div>
              ))}
            </div>
          </div>
          
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
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2">(4,247 avis)</span>
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
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Valorix</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Combinez la puissance de l'IA, la sécurité de la blockchain et l'expertise financière 
              pour des évaluations d'entreprise d'une précision inégalée et une stratégie de croissance optimisée.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl mb-6 shadow-lg">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IA Adaptative</h3>
              <p className="text-gray-600 leading-relaxed">
                Algorithmes spécialisés par secteur qui s'adaptent aux spécificités de votre entreprise
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-600">96% de précision</div>
            </div>
            
            <div className="p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-green-50/50 rounded-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl mb-6 shadow-lg">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Certification Blockchain</h3>
              <p className="text-gray-600 leading-relaxed">
                Vos évaluations sont horodatées et certifiées de manière immuable sur la blockchain
              </p>
              <div className="mt-4 text-sm font-medium text-green-600">100% sécurisé</div>
            </div>
            
            <div className="p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50/50 rounded-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl mb-6 shadow-lg">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analyse Stratégique</h3>
              <p className="text-gray-600 leading-relaxed">
                Analyse SWOT approfondie et recommandations stratégiques pour optimiser votre croissance
              </p>
              <div className="mt-4 text-sm font-medium text-purple-600">Données temps réel</div>
            </div>
            
            <div className="p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-orange-50/50 rounded-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl mb-6 shadow-lg">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intégration Automatique</h3>
              <p className="text-gray-600 leading-relaxed">
                Connexion directe avec vos logiciels comptables pour un import de données transparent
              </p>
              <div className="mt-4 text-sm font-medium text-orange-600">5x plus rapide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment Valorix transforme la gestion d'entreprise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dubois",
                role: "CEO, TechStart",
                company: "Startup Tech",
                avatar: "👩‍💼",
                rating: 5,
                text: "Valorix a révolutionné notre approche de la valorisation. L'IA nous donne des insights que nous n'aurions jamais découverts seuls."
              },
              {
                name: "Pierre Martin",
                role: "Directeur Financier",
                company: "Consulting Pro",
                avatar: "👨‍💼",
                rating: 5,
                text: "La certification blockchain nous donne une crédibilité totale auprès de nos investisseurs. Un outil indispensable."
              },
              {
                name: "Sophie Laurent",
                role: "Fondatrice",
                company: "InnovCorp",
                avatar: "👩‍🚀",
                rating: 5,
                text: "En 5 minutes, j'ai obtenu une évaluation plus précise que celle de mon expert-comptable. Impressionnant !"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choisissez votre plan
            </h2>
            <p className="text-xl text-gray-600">
              Des solutions adaptées à chaque étape de votre croissance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Essentiel",
                price: "Gratuit",
                period: "",
                description: "Parfait pour découvrir Valorix",
                features: [
                  "1 évaluation par mois",
                  "Rapport de base",
                  "Support email",
                  "Accès communauté"
                ],
                cta: "Commencer gratuitement",
                popular: false
              },
              {
                name: "Business",
                price: "99€",
                period: "/mois",
                description: "Idéal pour les entreprises en croissance",
                features: [
                  "Évaluations illimitées",
                  "Rapports détaillés",
                  "Certification blockchain",
                  "Support prioritaire",
                  "Analyses IA avancées",
                  "Intégrations comptables"
                ],
                cta: "Essai gratuit 14 jours",
                popular: true
              },
              {
                name: "Enterprise",
                price: "299€",
                period: "/mois",
                description: "Pour les grandes organisations",
                features: [
                  "Tout du plan Business",
                  "API dédiée",
                  "Support 24/7",
                  "Formation équipe",
                  "Rapports personnalisés",
                  "Gestionnaire de compte"
                ],
                cta: "Contactez-nous",
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-2 border-indigo-500' 
                  : 'bg-white hover:shadow-2xl'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Plus populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-4 ${plan.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`ml-1 ${plan.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 ${plan.popular ? 'text-green-300' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-indigo-100' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={onGetStarted}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-white text-indigo-600 hover:bg-gray-50'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à révolutionner votre valorisation ?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Rejoignez les milliers d'entrepreneurs qui font confiance à Valorix pour optimiser leur croissance.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-indigo-600 hover:bg-gray-50 px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">VALORIX</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                La plateforme d'évaluation d'entreprise nouvelle génération qui combine IA adaptative et certification blockchain.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📱</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">💼</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intégrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Statut</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Communauté</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Valorix. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



export default LandingPage;

