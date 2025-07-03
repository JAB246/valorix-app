import React, { useState } from 'react';
import { AlertTriangle, XCircle, RefreshCw, ArrowLeft, FileX, WifiOff, AlertCircle } from 'lucide-react';

// Composant Input avec validation
export const ValidatedInput = ({ 
  label, 
  error, 
  type = 'text', 
  required = false,
  placeholder,
  value,
  onChange,
  className = '',
  ...props 
}) => {
  const [touched, setTouched] = useState(false);
  const hasError = touched && error;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        {...props}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-colors ${
          hasError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        }`}
      />
      {hasError && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

// Hook de validation de formulaire
export const useFormValidation = (rules) => {
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const fieldRules = rules[fieldName] || [];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        setErrors(prev => ({ ...prev, [fieldName]: error }));
        return error;
      }
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: null }));
    return null;
  };

  const validateForm = (data) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    validateField,
    validateForm,
    setErrors
  };
};

// Règles de validation prédéfinies
export const validationRules = {
  required: (value) => {
    if (!value || value.trim() === '') {
      return 'Ce champ est obligatoire';
    }
    return null;
  },
  
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return 'Adresse email invalide';
    }
    return null;
  },
  
  password: (value) => {
    if (value && value.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre';
    }
    return null;
  },
  
  siret: (value) => {
    if (value && !/^\d{14}$/.test(value.replace(/\s/g, ''))) {
      return 'Le SIRET doit contenir 14 chiffres';
    }
    return null;
  },
  
  phone: (value) => {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (value && !phoneRegex.test(value)) {
      return 'Numéro de téléphone invalide';
    }
    return null;
  }
};

// Erreur de formulaire générale
export const FormError = ({ message, errors = [] }) => {
  if (!message && errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex">
        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
        <div className="ml-3">
          {message && (
            <p className="text-sm font-medium text-red-800">{message}</p>
          )}
          {errors.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Page 404 / Ressource non trouvée
export const NotFoundError = ({ 
  title = "Page introuvable", 
  message = "La page que vous cherchez n'existe pas ou a été déplacée.",
  onRetry,
  retryLabel = "Retour à l'accueil"
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-center">
          <FileX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

// Erreur réseau
export const NetworkError = ({ 
  onRefresh,
  onRetry,
  message = "Impossible de se connecter au serveur. Vérifiez votre connexion internet."
}) => {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="text-center">
        <WifiOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur de connexion</h2>
        <p className="text-gray-600 max-w-md mx-auto">{message}</p>
      </div>
      <div className="flex justify-center space-x-4">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </button>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
};

// État vide
export const EmptyState = ({ 
  icon: Icon = FileX,
  title = "Aucune donnée",
  message = "Il n'y a rien à afficher pour le moment.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="text-center">
        <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{message}</p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// Erreur générique avec possibilité de retry
export const ErrorBoundaryFallback = ({ error, resetError }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Oups ! Une erreur est survenue
          </h2>
          <p className="text-gray-600 mb-6">
            Une erreur inattendue s'est produite. Notre équipe a été notifiée.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-100 rounded-lg p-4 mb-6">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Détails de l'erreur (développement)
              </summary>
              <pre className="text-xs text-gray-600 overflow-auto">
                {error?.stack || error?.message || 'Erreur inconnue'}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetError}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  ValidatedInput,
  useFormValidation,
  validationRules,
  FormError,
  NotFoundError,
  NetworkError,
  EmptyState,
  ErrorBoundaryFallback
}; 