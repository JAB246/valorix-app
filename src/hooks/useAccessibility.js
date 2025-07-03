import { useEffect, useRef, useCallback, useState } from 'react';

// Hook pour la gestion du focus
export const useFocusManagement = () => {
  const focusRef = useRef(null);
  
  const setFocus = useCallback(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);
  
  const trapFocus = useCallback((event) => {
    if (!focusRef.current) return;
    
    const focusableElements = focusRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  }, []);
  
  return { focusRef, setFocus, trapFocus };
};

// Hook pour la gestion du clavier
export const useKeyboardNavigation = (onEnter, onEscape, onArrowKeys) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Enter':
          if (onEnter) onEnter(event);
          break;
        case 'Escape':
          if (onEscape) onEscape(event);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          if (onArrowKeys) onArrowKeys(event.key, event);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, onEscape, onArrowKeys]);
};

// Hook pour les annonces aux lecteurs d'écran
export const useScreenReader = () => {
  const [announcements, setAnnouncements] = useState([]);
  
  const announce = useCallback((message, priority = 'polite') => {
    const id = Date.now();
    setAnnouncements(prev => [...prev, { id, message, priority }]);
    
    // Nettoyer après 1 seconde
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(item => item.id !== id));
    }, 1000);
  }, []);
  
  return { announcements, announce };
};

// Hook pour générer des IDs accessibles
export const useAccessibleIds = (prefix = 'valorix') => {
  const idRef = useRef({});
  
  const getId = useCallback((key) => {
    if (!idRef.current[key]) {
      idRef.current[key] = `${prefix}-${key}-${Math.random().toString(36).substr(2, 9)}`;
    }
    return idRef.current[key];
  }, [prefix]);
  
  return getId;
};

// Hook pour la navigation par skip links
export const useSkipLinks = () => {
  const skipLinksRef = useRef([]);
  
  const addSkipLink = useCallback((id, label) => {
    skipLinksRef.current.push({ id, label });
  }, []);
  
  const focusContent = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  
  return { skipLinks: skipLinksRef.current, addSkipLink, focusContent };
};

// Hook pour la détection de préférences utilisateur
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    fontSize: 'normal'
  });
  
  useEffect(() => {
    // Détecter les préférences système
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setPreferences(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast
    }));
  }, []);
  
  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, []);
  
  return { preferences, updatePreference };
};

// Hook pour les aria-labels dynamiques
export const useAriaLabels = () => {
  const getButtonLabel = useCallback((action, context) => {
    const labels = {
      edit: `Modifier ${context}`,
      delete: `Supprimer ${context}`,
      view: `Voir ${context}`,
      download: `Télécharger ${context}`,
      share: `Partager ${context}`,
      close: `Fermer ${context}`,
      open: `Ouvrir ${context}`,
      save: `Enregistrer ${context}`,
      cancel: `Annuler ${context}`
    };
    return labels[action] || `${action} ${context}`;
  }, []);
  
  const getFormLabel = useCallback((field, required = false) => {
    const suffix = required ? ' (obligatoire)' : '';
    return `${field}${suffix}`;
  }, []);
  
  const getStatusLabel = useCallback((status, item) => {
    const labels = {
      loading: `Chargement de ${item}`,
      error: `Erreur lors du chargement de ${item}`,
      success: `${item} chargé avec succès`,
      empty: `Aucun ${item} disponible`
    };
    return labels[status] || status;
  }, []);
  
  return { getButtonLabel, getFormLabel, getStatusLabel };
};

export default {
  useFocusManagement,
  useKeyboardNavigation,
  useScreenReader,
  useAccessibleIds,
  useSkipLinks,
  useUserPreferences,
  useAriaLabels
}; 