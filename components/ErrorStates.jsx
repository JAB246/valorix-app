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
        className={`
          w-full px-4 py-3 rounded-lg border transition-all duration-200
          ${hasError 
            ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
          }
          focus:ring-2 focus:outline-none
        `}
      />
      {hasError && (
        <div className="flex items-center mt-1">
          <XCircle className="w-4 h-4 text-red-500 mr-2" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}
    </div>
  );
};

// Composant FormError pour afficher les erreurs générales
export const FormError = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Une erreur est survenue
          </h3>
          <p className="text-sm text-red-700 mt-1">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

// Page d'erreur 404
export const NotFoundError = ({ onGoBack, onGoHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <FileX className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </button>
          )}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Retour à l'accueil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Erreur de connexion réseau
export const NetworkError = ({ onRetry }) => {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
      <div className="text-center">
        <WifiOff className="w-12 h-12 text-orange-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-orange-800 mb-2">
          Problème de connexion
        </h3>
        <p className="text-orange-700 mb-4">
          Impossible de se connecter au serveur. Vérifiez votre connexion internet.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </button>
        )}
      </div>
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

// Empty State
export const EmptyState = ({ 
  icon: Icon = FileX,
  title,
  description,
  action,
  actionLabel = "Commencer",
  className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || "Aucun élément"}
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        {description || "Il n'y a rien à afficher pour le moment."}
      </p>
      {action && (
        <button
          onClick={action}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// Hook pour validation de formulaires
export const useFormValidation = (validationRules) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return '';
  };

  const validateForm = (values) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const setFieldTouched = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field) => {
    return touched[field] ? errors[field] : '';
  };

  return {
    errors,
    validateForm,
    setFieldTouched,
    getFieldError,
    clearErrors: () => setErrors({}),
    clearTouched: () => setTouched({})
  };
};

// Validation rules communes
export const validationRules = {
  required: (value) => {
    if (!value || value.toString().trim() === '') {
      return 'Ce champ est obligatoire';
    }
    return '';
  },
  
  email: (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Adresse email invalide';
    }
    return '';
  },
  
  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Minimum ${min} caractères requis`;
    }
    return '';
  },
  
  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Maximum ${max} caractères autorisés`;
    }
    return '';
  },
  
  siret: (value) => {
    if (value && !/^\d{14}$/.test(value.replace(/\s/g, ''))) {
      return 'SIRET invalide (14 chiffres requis)';
    }
    return '';
  },
  
  password: (value) => {
    if (value && value.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
    }
    return '';
  }
}; 