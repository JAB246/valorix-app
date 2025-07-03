// Composants du Design System Valorix
import { colors, spacing, typography, shadows, borderRadius, animations } from './tokens';

// Configuration des variantes de boutons
export const buttonVariants = {
  // Styles de base
  base: `
    inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95 transform
  `,
  
  // Variantes principales
  variants: {
    primary: `
      bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white 
      hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 
      focus:ring-indigo-500 shadow-lg hover:shadow-xl
      disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400
    `,
    secondary: `
      border-2 border-gray-300 text-gray-700 bg-white 
      hover:bg-gray-50 hover:border-indigo-300 
      focus:ring-indigo-500 shadow-sm hover:shadow-md
      disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200
    `,
    outline: `
      border-2 border-indigo-600 text-indigo-600 bg-transparent 
      hover:bg-indigo-50 hover:border-indigo-700 
      focus:ring-indigo-500 shadow-sm hover:shadow-md
      disabled:border-gray-300 disabled:text-gray-400
    `,
    ghost: `
      text-gray-700 bg-transparent 
      hover:bg-gray-100 hover:text-gray-900 
      focus:ring-gray-500 
      disabled:text-gray-400 disabled:hover:bg-transparent
    `,
    success: `
      bg-green-600 text-white 
      hover:bg-green-700 
      focus:ring-green-500 shadow-lg hover:shadow-xl
      disabled:bg-green-400
    `,
    warning: `
      bg-orange-600 text-white 
      hover:bg-orange-700 
      focus:ring-orange-500 shadow-lg hover:shadow-xl
      disabled:bg-orange-400
    `,
    error: `
      bg-red-600 text-white 
      hover:bg-red-700 
      focus:ring-red-500 shadow-lg hover:shadow-xl
      disabled:bg-red-400
    `
  },
  
  // Tailles
  sizes: {
    xs: 'px-2.5 py-1.5 text-xs rounded',
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 py-4 text-xl rounded-xl'
  }
};

// Configuration des champs de saisie
export const inputVariants = {
  base: `
    w-full rounded-lg border bg-white px-3 py-2 text-gray-900 placeholder-gray-500 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
  `,
  
  variants: {
    default: `
      border-gray-300 
      focus:border-indigo-500 focus:ring-indigo-500
      hover:border-gray-400
    `,
    error: `
      border-red-500 text-red-900 placeholder-red-400
      focus:border-red-500 focus:ring-red-500
      bg-red-50
    `,
    success: `
      border-green-500 text-green-900 placeholder-green-400
      focus:border-green-500 focus:ring-green-500
      bg-green-50
    `,
    warning: `
      border-orange-500 text-orange-900 placeholder-orange-400
      focus:border-orange-500 focus:ring-orange-500
      bg-orange-50
    `
  },
  
  sizes: {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }
};

// Configuration des cartes
export const cardVariants = {
  base: `
    bg-white rounded-lg border transition-all duration-200 ease-in-out
  `,
  
  variants: {
    default: 'border-gray-200 shadow-sm hover:shadow-md',
    elevated: 'border-gray-200 shadow-lg hover:shadow-xl',
    interactive: 'border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 cursor-pointer',
    success: 'border-green-200 bg-green-50 shadow-sm',
    warning: 'border-orange-200 bg-orange-50 shadow-sm',
    error: 'border-red-200 bg-red-50 shadow-sm',
    valorix: 'border-indigo-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30'
  },
  
  padding: {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }
};

// Configuration des badges
export const badgeVariants = {
  base: `
    inline-flex items-center font-medium rounded-full transition-all duration-200 ease-in-out
  `,
  
  variants: {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-orange-100 text-orange-800',
    error: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 text-gray-700 bg-transparent'
  },
  
  sizes: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  }
};

// Configuration des alertes
export const alertVariants = {
  base: `
    rounded-lg border p-4 transition-all duration-200 ease-in-out
  `,
  
  variants: {
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    success: 'border-green-200 bg-green-50 text-green-800',
    warning: 'border-orange-200 bg-orange-50 text-orange-800',
    error: 'border-red-200 bg-red-50 text-red-800'
  }
};

// Configuration des spinners
export const spinnerVariants = {
  base: 'animate-spin rounded-full border-2',
  
  variants: {
    primary: 'border-indigo-200 border-t-indigo-600',
    secondary: 'border-purple-200 border-t-purple-600',
    success: 'border-green-200 border-t-green-600',
    warning: 'border-orange-200 border-t-orange-600',
    error: 'border-red-200 border-t-red-600',
    white: 'border-white/20 border-t-white'
  },
  
  sizes: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }
};

// Configuration des modales/dialogues
export const modalVariants = {
  overlay: `
    fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm
    flex items-center justify-center p-4 z-50
    animate-in fade-in duration-200
  `,
  
  content: `
    bg-white rounded-xl shadow-2xl w-full max-w-md p-6
    animate-in zoom-in-95 duration-200
    focus:outline-none
  `,
  
  sizes: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full'
  }
};

// Configuration des tooltips
export const tooltipVariants = {
  base: `
    absolute z-50 px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded-md shadow-lg
    pointer-events-none transition-all duration-200 ease-in-out
    before:content-[''] before:absolute before:w-2 before:h-2 before:bg-gray-900 before:rotate-45
  `,
  
  positions: {
    top: 'bottom-full mb-2 before:top-full before:left-1/2 before:-translate-x-1/2 before:-mt-1',
    bottom: 'top-full mt-2 before:bottom-full before:left-1/2 before:-translate-x-1/2 before:-mb-1',
    left: 'right-full mr-2 before:left-full before:top-1/2 before:-translate-y-1/2 before:-mr-1',
    right: 'left-full ml-2 before:right-full before:top-1/2 before:-translate-y-1/2 before:-ml-1'
  }
};

// Configuration des layouts
export const layoutVariants = {
  container: {
    sm: 'max-w-screen-sm mx-auto px-4',
    md: 'max-w-screen-md mx-auto px-4 sm:px-6',
    lg: 'max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8',
    xl: 'max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8',
    '2xl': 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
    full: 'w-full px-4 sm:px-6 lg:px-8',
    valorix: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  },
  
  section: {
    base: 'py-12 sm:py-16 lg:py-20',
    hero: 'py-20 sm:py-24 lg:py-32',
    compact: 'py-8 sm:py-12 lg:py-16'
  },
  
  grid: {
    cols1: 'grid grid-cols-1 gap-6',
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
  }
};

// Utilitaires d'animations
export const animationClasses = {
  fadeIn: 'animate-in fade-in duration-500',
  fadeOut: 'animate-out fade-out duration-300',
  slideUp: 'animate-in slide-in-from-bottom-2 duration-300',
  slideDown: 'animate-in slide-in-from-top-2 duration-300',
  slideLeft: 'animate-in slide-in-from-right-2 duration-300',
  slideRight: 'animate-in slide-in-from-left-2 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  scaleOut: 'animate-out zoom-out-95 duration-200',
  
  // Animations de hover
  hoverLift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200',
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverGlow: 'hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300'
};

// Export de toutes les variantes
export default {
  buttonVariants,
  inputVariants,
  cardVariants,
  badgeVariants,
  alertVariants,
  spinnerVariants,
  modalVariants,
  tooltipVariants,
  layoutVariants,
  animationClasses
}; 