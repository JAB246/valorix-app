import React, { useState, useRef, useEffect } from 'react';
import { Zap, Mail, Lock, User, Building, ArrowLeft, Eye, EyeOff, Sparkles, Shield } from 'lucide-react';

export function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    confirmPassword: ''
  });

  const codeRefs = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLogin) {
        setShow2FA(true);
      } else {
        console.log('Création de compte:', formData);
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        codeRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify2FA = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin();
    } catch (error) {
      console.error('Erreur 2FA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShow2FA(false);
    setCode(['', '', '', '', '', '']);
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  if (show2FA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366F1%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        
        <div className="relative flex min-h-screen items-center justify-center p-8">
          <div className="w-full max-w-md">
            <button 
              onClick={handleGoHome}
              className="flex items-center text-slate-700 mb-6 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Retour à l'accueil
            </button>
            
            <div className="bg-white shadow-2xl p-8 rounded-2xl border border-slate-200">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Authentification à deux facteurs
                </h2>
                <p className="text-slate-600">
                  Saisissez le code à 6 chiffres envoyé sur votre téléphone
                </p>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-4 text-center">
                  Code de vérification
                </label>
                <div className="flex justify-center space-x-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => codeRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                        index === 0 ? 'bg-blue-50 border-blue-300 text-blue-900' :
                        index === 1 ? 'bg-orange-50 border-orange-300 text-orange-900' :
                        index === 2 ? 'bg-purple-50 border-purple-300 text-purple-900' :
                        index === 3 ? 'bg-teal-50 border-teal-300 text-teal-900' :
                        index === 4 ? 'bg-pink-50 border-pink-300 text-pink-900' :
                        'bg-indigo-50 border-indigo-300 text-indigo-900'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={handleBackToLogin}
                  className="w-full py-3 px-6 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-indigo-300 transition-all duration-200"
                >
                  Retour
                </button>
                
                <button 
                  onClick={handleVerify2FA}
                  disabled={isLoading || code.some(digit => !digit)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Vérification...
                    </div>
                  ) : (
                    'Vérifier'
                  )}
                </button>
                
                <button className="w-full py-3 px-6 text-red-600 hover:text-red-700 transition-colors">
                  Renvoyer le code
                </button>
              </div>
            </div>
            
            <div className="text-center mt-8 text-sm text-slate-500">
              <div className="flex items-center justify-center space-x-4">
                <span className="flex items-center">
                  <Lock className="w-4 h-4 mr-1" />
                  Sécurisé SSL
                </span>
                <span className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Conforme RGPD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            {isLogin ? 'Connexion à Valorix' : 'Créer votre compte Valorix'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isLogin 
              ? 'Connectez-vous pour accéder à votre tableau de bord' 
              : 'Rejoignez la communauté Valorix dès aujourd\'hui'
            }
          </p>
        </div>

        {/* Formulaire */}
        <div className="mt-8 bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Boutons sociaux */}
            <div className="space-y-3">
              {/* Bouton Google */}
              <button className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-slate-300 rounded-lg shadow-sm bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-all duration-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continuer avec Google</span>
              </button>

              {/* Bouton Microsoft */}
              <button className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-slate-300 rounded-lg shadow-sm bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-all duration-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M13 1h10v10H13z"/>
                  <path fill="#05a6f0" d="M1 13h10v10H1z"/>
                  <path fill="#ffba08" d="M13 13h10v10H13z"/>
                </svg>
                <span>Continuer avec Microsoft</span>
              </button>

              {/* Bouton Apple */}
              <button className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-slate-300 rounded-lg shadow-sm bg-white text-slate-900 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-all duration-200">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" style={{ fill: '#000000 !important' }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000000"/>
                </svg>
                <span style={{ color: '#000000', fontWeight: '500' }}>Continuer avec Apple</span>
              </button>
            </div>

            {/* Séparateur */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">ou</span>
              </div>
            </div>

            {/* Champs du formulaire */}
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white placeholder-slate-400"
                    placeholder="votre@email.com"
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#1e293b',
                      fontSize: '16px',
                      border: '2px solid #94a3b8'
                    }}
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white placeholder-slate-400"
                    placeholder="••••••••"
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#1e293b',
                      fontSize: '16px',
                      border: '2px solid #94a3b8'
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmation mot de passe (inscription seulement) */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white placeholder-slate-400"
                      placeholder="••••••••"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontSize: '16px',
                        border: '2px solid #94a3b8'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Liens */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-slate-700">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Mot de passe oublié ?
                </a>
              </div>
            )}

            {/* Bouton de soumission */}
            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-3 px-6 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Connexion...' : 'Création du compte...'}
                  </div>
                ) : (
                  isLogin ? 'Se connecter' : 'Créer mon compte gratuit'
                )}
              </button>
            </div>

            {/* Basculer entre connexion et inscription */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                {isLogin 
                  ? "Pas encore de compte ? Créer un compte gratuit" 
                  : "Déjà un compte ? Se connecter"
                }
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          <p>
            En vous connectant, vous acceptez nos{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">conditions d'utilisation</a>
            {' '}et notre{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

