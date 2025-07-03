import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';

// Context pour les préférences d'accessibilité
const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

// Provider d'accessibilité
export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    highContrast: false,
    reduceMotion: false,
    fontSize: 'normal', // small, normal, large, xl
    screenReader: false
  });

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('valorix-accessibility');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
    
    // Détecter les préférences système
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPreferences(prev => ({ ...prev, reduceMotion: true }));
    }
    
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setPreferences(prev => ({ ...prev, highContrast: true }));
    }
  }, []);

  // Sauvegarder les préférences
  useEffect(() => {
    localStorage.setItem('valorix-accessibility', JSON.stringify(preferences));
    
    // Appliquer les classes CSS au body
    document.body.classList.toggle('high-contrast', preferences.highContrast);
    document.body.classList.toggle('reduce-motion', preferences.reduceMotion);
    document.body.classList.toggle('large-text', preferences.fontSize === 'large');
    document.body.classList.toggle('xl-text', preferences.fontSize === 'xl');
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook pour la navigation au clavier
export const useKeyboardNavigation = (containerRef, itemSelector = '[data-keyboard-nav]') => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e) => {
      const items = Array.from(container.querySelectorAll(itemSelector));
      if (items.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev < items.length - 1 ? prev + 1 : 0;
            items[next]?.focus();
            return next;
          });
          break;
        
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev > 0 ? prev - 1 : items.length - 1;
            items[next]?.focus();
            return next;
          });
          break;
        
        case 'Home':
          e.preventDefault();
          items[0]?.focus();
          setFocusedIndex(0);
          break;
        
        case 'End':
          e.preventDefault();
          items[items.length - 1]?.focus();
          setFocusedIndex(items.length - 1);
          break;
        
        case 'Enter':
        case ' ':
          if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
            e.target.click();
          }
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, itemSelector]);

  return { focusedIndex, setFocusedIndex };
};

// Composant Skip Link
export const SkipLink = ({ targetId, children = "Aller au contenu principal" }) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
    >
      {children}
    </a>
  );
};

// Screen Reader Only Text
export const ScreenReaderOnly = ({ children, as: Component = 'span' }) => {
  return (
    <Component className="sr-only">
      {children}
    </Component>
  );
};

// Bouton accessible avec ARIA
export const AccessibleButton = ({ 
  children, 
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  variant = 'primary',
  className = '',
  loading = false,
  ...props 
}) => {
  const { preferences } = useAccessibility();
  
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-indigo-300 px-6 py-3 rounded-lg shadow-sm hover:shadow-lg',
    ghost: 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-lg'
  };

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${preferences.highContrast ? 'ring-2 ring-gray-900' : ''}
        ${className}
      `}
    >
      {loading && (
        <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" 
             aria-hidden="true" />
      )}
      {children}
      {loading && <ScreenReaderOnly>Chargement en cours</ScreenReaderOnly>}
    </button>
  );
};

// Input accessible avec gestion d'erreurs
export const AccessibleInput = ({
  label,
  error,
  required = false,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  helpText,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;
  const { preferences } = useAccessibility();

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label}
        {required && (
          <>
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            <ScreenReaderOnly>obligatoire</ScreenReaderOnly>
          </>
        )}
      </label>
      
      <input
        {...props}
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim()}
        className={`
          w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error 
            ? 'border-red-300 bg-red-50 focus:border-red-500' 
            : 'border-gray-300 focus:border-indigo-500'
          }
          ${preferences.highContrast ? 'ring-2 ring-gray-900' : ''}
        `}
      />
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

// Modal accessible
export const AccessibleModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = '',
  size = 'md' 
}) => {
  const modalRef = useRef(null);
  const [focusedBeforeOpen, setFocusedBeforeOpen] = useState(null);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  useEffect(() => {
    if (isOpen) {
      // Sauvegarder l'élément focusé avant l'ouverture
      setFocusedBeforeOpen(document.activeElement);
      
      // Empêcher le scroll de la page
      document.body.style.overflow = 'hidden';
      
      // Focuser la modal
      modalRef.current?.focus();
    } else {
      // Restaurer le scroll
      document.body.style.overflow = '';
      
      // Restaurer le focus
      if (focusedBeforeOpen) {
        focusedBeforeOpen.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, focusedBeforeOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className={`
          bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-auto
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${className}
        `}
      >
        <div className="p-6">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

// Panneau d'accessibilité
export const AccessibilityPanel = ({ isOpen, onClose }) => {
  const { preferences, updatePreference } = useAccessibility();

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title="Paramètres d'accessibilité"
      size="md"
    >
      <div className="space-y-6">
        {/* Contraste élevé */}
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="high-contrast" className="text-sm font-medium text-gray-900">
              Contraste élevé
            </label>
            <p className="text-sm text-gray-600">
              Améliore la lisibilité avec des couleurs plus contrastées
            </p>
          </div>
          <button
            id="high-contrast"
            onClick={() => updatePreference('highContrast', !preferences.highContrast)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${preferences.highContrast ? 'bg-indigo-600' : 'bg-gray-200'}
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            `}
            role="switch"
            aria-checked={preferences.highContrast}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${preferences.highContrast ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Réduction de mouvement */}
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="reduce-motion" className="text-sm font-medium text-gray-900">
              Réduire les animations
            </label>
            <p className="text-sm text-gray-600">
              Désactive les animations et transitions
            </p>
          </div>
          <button
            id="reduce-motion"
            onClick={() => updatePreference('reduceMotion', !preferences.reduceMotion)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${preferences.reduceMotion ? 'bg-indigo-600' : 'bg-gray-200'}
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            `}
            role="switch"
            aria-checked={preferences.reduceMotion}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${preferences.reduceMotion ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Taille de police */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Taille du texte
          </label>
          <div className="space-y-2">
            {[
              { value: 'small', label: 'Petite' },
              { value: 'normal', label: 'Normale' },
              { value: 'large', label: 'Grande' },
              { value: 'xl', label: 'Très grande' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="fontSize"
                  value={option.value}
                  checked={preferences.fontSize === option.value}
                  onChange={(e) => updatePreference('fontSize', e.target.value)}
                  className="mr-2 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <AccessibleButton variant="secondary" onClick={onClose}>
            Fermer
          </AccessibleButton>
        </div>
      </div>
    </AccessibleModal>
  );
};

// CSS d'accessibilité à ajouter
export const accessibilityStyles = `
  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .sr-only.focus\\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  /* High contrast mode */
  .high-contrast {
    filter: contrast(150%);
  }

  .high-contrast button,
  .high-contrast input,
  .high-contrast select {
    border: 2px solid #000 !important;
  }

  /* Reduced motion */
  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Large text */
  .large-text {
    font-size: 1.125rem;
  }

  .xl-text {
    font-size: 1.25rem;
  }

  /* Focus visible improvements */
  *:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
  }
`; 