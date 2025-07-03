// Utilitaires pour le Design System Valorix
import { buttonVariants, inputVariants, cardVariants, badgeVariants, alertVariants } from './components';
import { colors, spacing, typography, shadows } from './tokens';

// Fonction principale pour générer les classes CSS des composants
export const cn = (...inputs) => {
  // Filtre et combine les classes en supprimant les doublons
  return inputs
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(' ');
};

// Générateur de classes pour les boutons
export const getButtonClasses = (variant = 'primary', size = 'md', className = '') => {
  return cn(
    buttonVariants.base,
    buttonVariants.variants[variant] || buttonVariants.variants.primary,
    buttonVariants.sizes[size] || buttonVariants.sizes.md,
    className
  );
};

// Générateur de classes pour les inputs
export const getInputClasses = (variant = 'default', size = 'md', className = '') => {
  return cn(
    inputVariants.base,
    inputVariants.variants[variant] || inputVariants.variants.default,
    inputVariants.sizes[size] || inputVariants.sizes.md,
    className
  );
};

// Générateur de classes pour les cartes
export const getCardClasses = (variant = 'default', padding = 'md', className = '') => {
  return cn(
    cardVariants.base,
    cardVariants.variants[variant] || cardVariants.variants.default,
    cardVariants.padding[padding] || cardVariants.padding.md,
    className
  );
};

// Générateur de classes pour les badges
export const getBadgeClasses = (variant = 'default', size = 'md', className = '') => {
  return cn(
    badgeVariants.base,
    badgeVariants.variants[variant] || badgeVariants.variants.default,
    badgeVariants.sizes[size] || badgeVariants.sizes.md,
    className
  );
};

// Générateur de classes pour les alertes
export const getAlertClasses = (variant = 'info', className = '') => {
  return cn(
    alertVariants.base,
    alertVariants.variants[variant] || alertVariants.variants.info,
    className
  );
};

// Utilitaires pour les couleurs
export const getColorValue = (colorPath) => {
  // Exemple: 'primary.600' ou 'neutral.500'
  const [colorName, shade] = colorPath.split('.');
  return colors[colorName]?.[shade] || colors[colorName]?.DEFAULT || colorPath;
};

// Vérification du contraste des couleurs
export const getContrastRatio = (color1, color2) => {
  // Fonction simplifée pour calculer le ratio de contraste
  // En production, utiliser une bibliothèque comme 'color' ou 'chroma-js'
  const getLuminance = (color) => {
    // Conversion RGB vers luminance (formule simplifiée)
    const r = parseInt(color.substr(1, 2), 16) / 255;
    const g = parseInt(color.substr(3, 2), 16) / 255;
    const b = parseInt(color.substr(5, 2), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

// Validation de l'accessibilité des couleurs
export const isAccessibleColor = (foreground, background, level = 'AA') => {
  const contrast = getContrastRatio(foreground, background);
  const requirements = {
    'AA': 4.5,      // WCAG AA
    'AAA': 7,       // WCAG AAA
    'AA-Large': 3,  // WCAG AA pour texte large
    'AAA-Large': 4.5 // WCAG AAA pour texte large
  };
  
  return contrast >= (requirements[level] || requirements['AA']);
};

// Générateur de classes responsives
export const getResponsiveClasses = (mobile, tablet, desktop) => {
  const classes = [];
  if (mobile) classes.push(mobile);
  if (tablet) classes.push(`md:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  return classes.join(' ');
};

// Générateur de classes d'espacement
export const getSpacingClasses = (type, value, breakpoint = '') => {
  const prefix = breakpoint ? `${breakpoint}:` : '';
  const spacingTypes = {
    p: 'p',     // padding
    px: 'px',   // padding horizontal
    py: 'py',   // padding vertical
    pt: 'pt',   // padding top
    pr: 'pr',   // padding right
    pb: 'pb',   // padding bottom
    pl: 'pl',   // padding left
    m: 'm',     // margin
    mx: 'mx',   // margin horizontal
    my: 'my',   // margin vertical
    mt: 'mt',   // margin top
    mr: 'mr',   // margin right
    mb: 'mb',   // margin bottom
    ml: 'ml'    // margin left
  };
  
  return `${prefix}${spacingTypes[type] || type}-${value}`;
};

// Générateur de classes de typographie
export const getTypographyClasses = (size, weight, lineHeight) => {
  const classes = [];
  if (size) classes.push(`text-${size}`);
  if (weight) classes.push(`font-${weight}`);
  if (lineHeight) classes.push(`leading-${lineHeight}`);
  return classes.join(' ');
};

// Utilitaire pour les animations conditionnelles (respecter prefers-reduced-motion)
export const getAnimationClasses = (animation, respectReducedMotion = true) => {
  if (respectReducedMotion) {
    return `motion-safe:${animation} motion-reduce:transition-none`;
  }
  return animation;
};

// Générateur de classes d'ombre personnalisées
export const getShadowClasses = (type = 'md', color = 'gray') => {
  const shadowMap = {
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    valorix: 'shadow-lg shadow-indigo-500/25'
  };
  
  return shadowMap[type] || shadowMap.md;
};

// Utilitaire pour les dégradés
export const getGradientClasses = (direction = 'to-r', colors = ['indigo-600', 'purple-600']) => {
  const colorClasses = colors.map(color => `${color.includes('-') ? '' : 'from-'}${color}`);
  return `bg-gradient-${direction} ${colorClasses.join(' ')}`;
};

// Validation des propriétés de design
export const validateDesignProps = (component, props) => {
  const validations = {
    button: {
      variant: ['primary', 'secondary', 'outline', 'ghost', 'success', 'warning', 'error'],
      size: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    input: {
      variant: ['default', 'error', 'success', 'warning'],
      size: ['sm', 'md', 'lg']
    },
    card: {
      variant: ['default', 'elevated', 'interactive', 'success', 'warning', 'error', 'valorix'],
      padding: ['none', 'sm', 'md', 'lg', 'xl']
    },
    badge: {
      variant: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'outline'],
      size: ['sm', 'md', 'lg']
    }
  };

  const componentValidation = validations[component];
  if (!componentValidation) return true;

  for (const [prop, value] of Object.entries(props)) {
    if (componentValidation[prop] && !componentValidation[prop].includes(value)) {
      console.warn(`Propriété "${prop}" invalide pour ${component}. Valeurs acceptées: ${componentValidation[prop].join(', ')}`);
      return false;
    }
  }

  return true;
};

// Générateur de classes pour les états interactifs
export const getInteractiveClasses = (hover = true, focus = true, active = true) => {
  const classes = [];
  
  if (hover) classes.push('hover:bg-gray-50 hover:scale-105');
  if (focus) classes.push('focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2');
  if (active) classes.push('active:scale-95');
  
  return classes.join(' ');
};

// Utilitaire pour la grille adaptative
export const getGridClasses = (cols = 'auto', gap = '6', responsive = true) => {
  if (!responsive) {
    return `grid grid-cols-${cols} gap-${gap}`;
  }

  const responsiveGrids = {
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return `${responsiveGrids[cols] || responsiveGrids.auto} gap-${gap}`;
};

// Utilitaire pour les breakpoints
export const getBreakpointClasses = (config) => {
  // config: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
  return Object.entries(config)
    .map(([breakpoint, className]) => 
      breakpoint === 'base' ? className : `${breakpoint}:${className}`
    )
    .join(' ');
};

// Export de tous les utilitaires
export default {
  cn,
  getButtonClasses,
  getInputClasses,
  getCardClasses,
  getBadgeClasses,
  getAlertClasses,
  getColorValue,
  getContrastRatio,
  isAccessibleColor,
  getResponsiveClasses,
  getSpacingClasses,
  getTypographyClasses,
  getAnimationClasses,
  getShadowClasses,
  getGradientClasses,
  validateDesignProps,
  getInteractiveClasses,
  getGridClasses,
  getBreakpointClasses
}; 