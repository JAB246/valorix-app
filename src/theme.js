// Design System Valorix - Centralisé
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb', // indigo-600
      700: '#1d4ed8', // indigo-700
      800: '#1e40af',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea', // purple-600
      700: '#7c3aed', // purple-700
      800: '#6b21a8',
      900: '#581c87'
    },
    accent: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb', // blue-600
      700: '#1d4ed8', // blue-700
      800: '#1e40af',
      900: '#1e3a8a'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // green-500
      600: '#16a34a', // green-600
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // orange-500
      600: '#d97706', // orange-600
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // red-500
      600: '#dc2626', // red-600
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  
  gradients: {
    primary: 'from-indigo-600 via-purple-600 to-blue-600',
    secondary: 'from-purple-500 to-pink-600',
    success: 'from-green-400 to-blue-500',
    warning: 'from-yellow-400 to-orange-500',
    error: 'from-red-500 to-pink-600',
    valorix: 'from-indigo-600 via-purple-600 to-blue-600'
  },
  
  spacing: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: 'py-12 sm:py-16 lg:py-20',
    card: 'p-6 sm:p-8',
    button: 'px-4 py-2 sm:px-6 sm:py-3'
  },
  
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    valorix: 'shadow-2xl shadow-indigo-500/25'
  },
  
  transitions: {
    fast: 'transition-all duration-150 ease-in-out',
    normal: 'transition-all duration-200 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out'
  }
};

// Helper function pour obtenir les classes thème
export const getThemeClasses = (component, variant = 'default', size = 'md') => {
  const classes = {
    container: theme.spacing.container,
    
    button: {
      base: `inline-flex items-center justify-center rounded-lg font-medium ${theme.transitions.normal} focus:outline-none focus:ring-2 focus:ring-offset-2`,
      primary: `bg-gradient-to-r ${theme.gradients.primary} text-white hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 focus:ring-indigo-500`,
      secondary: `border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-300 focus:ring-indigo-500`,
      outline: `border-2 border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500`,
      ghost: `text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500`,
      sizes: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl'
      }
    },
    
    input: {
      base: `w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 ${theme.transitions.fast}`,
      error: `border-red-500 focus:border-red-500 focus:ring-red-500`,
      success: `border-green-500 focus:border-green-500 focus:ring-green-500`
    },
    
    card: {
      base: `bg-white rounded-lg border border-gray-200 ${theme.shadows.sm}`,
      elevated: `bg-white rounded-lg border border-gray-200 ${theme.shadows.lg}`,
      valorix: `bg-white rounded-lg border border-gray-200 ${theme.shadows.valorix}`
    }
  };
  
  if (component === 'button') {
    const buttonClasses = classes.button;
    return `${buttonClasses.base} ${buttonClasses[variant] || buttonClasses.primary} ${buttonClasses.sizes[size]}`;
  }
  
  return classes[component]?.[variant] || classes[component]?.base || classes[component] || '';
};

export default theme; 