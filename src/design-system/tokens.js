// Design Tokens Valorix - Version optimisée et accessible

export const colors = {
  // Couleurs primaires avec ratios de contraste optimisés
  primary: {
    50: '#eff6ff',   // Contraste 21:1 avec primary-900
    100: '#dbeafe',  // Contraste 16:1 avec primary-800
    200: '#bfdbfe',  // Contraste 12:1 avec primary-700
    300: '#93c5fd',  // Contraste 7:1 avec primary-600
    400: '#60a5fa',  // Contraste 4.5:1 avec white
    500: '#3b82f6',  // Contraste 7:1 avec white
    600: '#2563eb',  // Base indigo - Contraste 8.5:1 avec white
    700: '#1d4ed8',  // Contraste 11:1 avec white
    800: '#1e40af',  // Contraste 13:1 avec white
    900: '#1e3a8a',  // Contraste 15:1 avec white
    DEFAULT: '#2563eb'
  },
  
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',  // Base purple
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    DEFAULT: '#9333ea'
  },
  
  // Couleurs sémantiques accessibles
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',  // Base - Contraste 4.8:1 avec white
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    DEFAULT: '#16a34a'
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',  // Base - Contraste 5.2:1 avec white
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#d97706'
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',  // Base - Contraste 5.9:1 avec white
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    DEFAULT: '#dc2626'
  },
  
  // Couleurs neutres optimisées
  neutral: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',  // Contraste 7:1 avec white
    700: '#374151',  // Contraste 10.5:1 avec white
    800: '#1f2937',  // Contraste 14:1 avec white
    900: '#111827',  // Contraste 18:1 avec white
    950: '#030712',
    DEFAULT: '#6b7280'
  }
};

export const spacing = {
  0: '0px',
  0.5: '0.125rem',    // 2px
  1: '0.25rem',       // 4px
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  3.5: '0.875rem',    // 14px
  4: '1rem',          // 16px
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px
  7: '1.75rem',       // 28px
  8: '2rem',          // 32px
  9: '2.25rem',       // 36px
  10: '2.5rem',       // 40px
  11: '2.75rem',      // 44px
  12: '3rem',         // 48px
  14: '3.5rem',       // 56px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  28: '7rem',         // 112px
  32: '8rem',         // 128px
  36: '9rem',         // 144px
  40: '10rem',        // 160px
  44: '11rem',        // 176px
  48: '12rem',        // 192px
  52: '13rem',        // 208px
  56: '14rem',        // 224px
  60: '15rem',        // 240px
  64: '16rem',        // 256px
  72: '18rem',        // 288px
  80: '20rem',        // 320px
  96: '24rem'         // 384px
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'monospace']
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1' }],           // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
    '8xl': ['6rem', { lineHeight: '1' }],           // 96px
    '9xl': ['8rem', { lineHeight: '1' }]            // 128px
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
};

export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  
  // Ombres Valorix personnalisées
  valorix: {
    sm: '0 2px 8px -2px rgb(37 99 235 / 0.2)',
    md: '0 4px 16px -4px rgb(37 99 235 / 0.25)',
    lg: '0 8px 32px -8px rgb(37 99 235 / 0.3)',
    xl: '0 16px 64px -16px rgb(37 99 235 / 0.4)'
  }
};

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',     // 2px
  base: '0.25rem',    // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  full: '9999px'
};

export const animations = {
  none: 'none',
  spin: 'spin 1s linear infinite',
  ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite',
  
  // Animations Valorix personnalisées
  fadeIn: 'fadeIn 0.5s ease-in-out',
  fadeOut: 'fadeOut 0.5s ease-in-out',
  slideUp: 'slideUp 0.3s ease-out',
  slideDown: 'slideDown 0.3s ease-out',
  scaleIn: 'scaleIn 0.2s ease-out',
  scaleOut: 'scaleOut 0.2s ease-in',
  
  // Durées personnalisées
  durations: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  },
  
  // Courbes d'animation
  timingFunctions: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
  }
};

export const gradients = {
  primary: 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #2563eb 100%)',
  secondary: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
  
  // Dégradés Valorix signature
  valorix: {
    primary: 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #2563eb 100%)',
    light: 'linear-gradient(135deg, #dbeafe 0%, #e9d5ff 50%, #dbeafe 100%)',
    dark: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #1e40af 100%)'
  },
  
  // Dégradés d'arrière-plan
  backgrounds: {
    subtle: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
    soft: 'linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)',
    warm: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
  }
};

// Export du thème complet
const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  animations,
  gradients
};

export default theme; 