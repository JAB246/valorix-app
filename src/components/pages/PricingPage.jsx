import { useState } from 'react';
import { Check, Star, ArrowLeft, Zap, Sparkles, Crown, Lock, TrendingUp, Brain, Shield, BarChart3 } from 'lucide-react';

export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      name: 'Gratuit',
      price: '0',
      period: 'mois',
      description: 'Découvrez Valorix et accédez aux services financiers',
      features: [
        'Accès complet aux services financiers',
        'Intégrations comptables de base',
        'Support communautaire',
        'Gestion des informations entreprise',
        'Mise en relation avec partenaires'
      ],
      limitations: [
        'Pas d\'évaluation d\'entreprise',
        'Pas d\'analyses IA avancées',
        'Pas de rapports détaillés',
        'Pas de certification blockchain'
      ],
      cta: 'Commencer gratuitement',
      popular: false,
      color: 'gray',
      icon: null,
      highlight: 'Services uniquement'
    },
    {
      name: 'Essentiel',
      price: billingPeriod === 'monthly' ? '39' : '390',
      period: billingPeriod === 'monthly' ? 'mois' : 'an',
      description: 'Idéal pour les TPE et entrepreneurs',
      features: [
        'Évaluations trimestrielles complètes',
        'Jusqu\'à 2 entreprises',
        '1 rapport certifié blockchain/an',
        'Analyses sectorielles basiques',
        'Support prioritaire par email',
        'Export PDF professionnel',
        'Historique 12 mois',
        'Tous les services financiers'
      ],
      addons: [
        'Rapport supplémentaire: 49€',
        'Entreprise additionnelle: 15€/mois'
      ],
      cta: 'Essayer 14 jours gratuit',
      popular: true,
      color: 'indigo',
      icon: Zap,
      highlight: 'Le plus populaire',
      savings: billingPeriod === 'yearly' ? '2 mois offerts' : null
    },
    {
      name: 'Business',
      price: billingPeriod === 'monthly' ? '129' : '1290',
      period: billingPeriod === 'monthly' ? 'mois' : 'an',
      description: 'Pour les PME et cabinets comptables',
      features: [
        'Évaluations mensuelles illimitées',
        'Jusqu\'à 5 entreprises',
        '4 rapports certifiés blockchain/an',
        'API basique incluse',
        'Analyses prédictives avancées IA',
        'Intégrations comptables premium',
        'Support téléphonique dédié',
        'Historique illimité',
        'Services financiers prioritaires'
      ],
      addons: [
        'Entreprises supplémentaires: 29€/mois',
        'Formation équipe: 990€'
      ],
      cta: 'Essayer 14 jours gratuit',
      popular: false,
      color: 'purple',
      icon: Brain,
      highlight: 'Recommandé PME',
      savings: billingPeriod === 'yearly' ? '2 mois offerts' : null
    },
    {
      name: 'Premium',
      price: billingPeriod === 'monthly' ? '399' : '3990',
      period: billingPeriod === 'monthly' ? 'mois' : 'an',
      description: 'Pour les ETI et fonds d\'investissement',
      features: [
        'Suivi continu via API temps réel',
        'Entreprises illimitées',
        'Rapports certifiés blockchain illimités',
        'Analyses sectorielles complètes',
        'IA prédictive avancée personnalisée',
        'Intégrations sur mesure',
        'Support 24/7 dédié',
        'Accès bêta nouvelles fonctionnalités',
        'Services financiers VIP',
        'Gestionnaire de compte dédié'
      ],
      addons: [
        'Intégrations sur mesure: Sur devis',
        'Formation avancée: 2990€'
      ],
      cta: 'Contacter l\'équipe',
      popular: false,
      color: 'gold',
      icon: Crown,
      highlight: 'Enterprise',
      savings: billingPeriod === 'yearly' ? '2 mois offerts' : null
    }
  ];

  const features = [
    {
      category: 'Évaluation d\'entreprise',
      items: [
        { name: 'Évaluations automatisées', free: false, essential: true, business: true, premium: true },
        { name: 'Analyses sectorielles', free: false, essential: 'Basique', business: 'Avancée', premium: 'Complète' },
        { name: 'Prédictions IA', free: false, essential: false, business: true, premium: true },
        { name: 'Suivi temps réel', free: false, essential: false, business: false, premium: true }
      ]
    },
    {
      category: 'Rapports et certification',
      items: [
        { name: 'Rapports PDF', free: false, essential: true, business: true, premium: true },
        { name: 'Certification blockchain', free: false, essential: '1/an', business: '4/an', premium: 'Illimité' },
        { name: 'Historique des données', free: false, essential: '12 mois', business: 'Illimité', premium: 'Illimité' },
        { name: 'Export des données', free: false, essential: true, business: true, premium: true }
      ]
    },
    {
      category: 'Intégrations',
      items: [
        { name: 'Intégrations comptables', free: 'Basique', essential: 'Standard', business: 'Premium', premium: 'Sur mesure' },
        { name: 'API access', free: false, essential: false, business: 'Basique', premium: 'Complète' },
        { name: 'Webhooks', free: false, essential: false, business: true, premium: true },
        { name: 'Intégrations personnalisées', free: false, essential: false, business: false, premium: true }
      ]
    },
    {
      category: 'Support',
      items: [
        { name: 'Support communautaire', free: true, essential: true, business: true, premium: true },
        { name: 'Support email', free: false, essential: 'Prioritaire', business: 'Prioritaire', premium: '24/7' },
        { name: 'Support téléphonique', free: false, essential: false, business: true, premium: true },
        { name: 'Gestionnaire de compte', free: false, essential: false, business: false, premium: true }
      ]
    }
  ];

  const getColorClasses = (color, popular = false) => {
    const baseClasses = {
      gray: 'border-gray-200 bg-white',
      indigo: popular ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 ring-2 ring-indigo-500' : 'border-indigo-200 bg-white',
      purple: 'border-purple-200 bg-white',
      gold: 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50'
    };
    return baseClasses[color] || baseClasses.gray;
  };

  const getButtonClasses = (color, popular = false) => {
    const baseClasses = {
      gray: 'bg-gray-600 hover:bg-gray-700 text-white',
      indigo: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg',
      purple: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white',
      gold: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white'
    };
    return baseClasses[color] || baseClasses.gray;
  };

  const renderFeatureValue = (value) => {
    if (value === true) return <Check className="w-5 h-5 text-green-500" />;
    if (value === false) return <span className="text-gray-400">—</span>;
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour au dashboard
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VALORIX
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choisissez votre plan
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Valorix
            </span>
          </h1>
          <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto">
            De l'accès aux services financiers à l'évaluation d'entreprise complète avec IA et blockchain
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-slate-900' : 'text-slate-600'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-slate-900' : 'text-slate-600'}`}>
              Annuel
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                2 mois offerts
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl ${getColorClasses(plan.color, plan.popular)}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {plan.highlight}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                {plan.icon && (
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-700 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}€</span>
                  <span className="text-slate-700 ml-2">/{plan.period}</span>
                </div>
                {plan.savings && (
                  <p className="text-green-600 text-sm font-medium mt-2">{plan.savings}</p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-800 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations && (
                  <div className="pt-4 border-t border-gray-200">
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start mb-2">
                        <Lock className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${getButtonClasses(plan.color, plan.popular)}`}>
                {plan.cta}
              </button>

              {plan.addons && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-slate-700 mb-2">Options supplémentaires:</p>
                  {plan.addons.map((addon, addonIndex) => (
                    <p key={addonIndex} className="text-xs text-slate-600">{addon}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h2 className="text-2xl font-bold text-white text-center">Comparaison détaillée des fonctionnalités</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fonctionnalités</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Gratuit</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Essentiel</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Business</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-3 text-sm font-semibold text-slate-900 bg-slate-100">
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureValue(item.free)}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureValue(item.essential)}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureValue(item.business)}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureValue(item.premium)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-3">Puis-je changer de plan à tout moment ?</h3>
              <p className="text-slate-700 text-sm">Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-3">Y a-t-il des frais de configuration ?</h3>
              <p className="text-slate-700 text-sm">Non, aucun frais de configuration. Vous ne payez que votre abonnement mensuel ou annuel.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-3">Que se passe-t-il si j'annule ?</h3>
              <p className="text-slate-700 text-sm">Vous gardez l'accès jusqu'à la fin de votre période de facturation. Vos données sont conservées 90 jours.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-3">Support technique inclus ?</h3>
              <p className="text-slate-700 text-sm">Oui, tous les plans incluent un support technique. Le niveau varie selon votre plan.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez plus de 15 000 entreprises qui font confiance à Valorix
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Essayer gratuitement
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Contacter l'équipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

