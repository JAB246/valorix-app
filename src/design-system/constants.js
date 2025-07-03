// Constantes du Design System Valorix

// Breakpoints responsifs
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Z-index hiérarchique
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};

// Constantes d'animation
export const animationDurations = {
  fastest: '75ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '700ms'
};

export const animationEasings = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
  'in-quart': 'cubic-bezier(0.5, 0, 0.75, 0)',
  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// Tailles standardisées
export const sizes = {
  icon: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px'
  },
  
  button: {
    xs: { height: '24px', minWidth: '40px' },
    sm: { height: '32px', minWidth: '64px' },
    md: { height: '40px', minWidth: '80px' },
    lg: { height: '48px', minWidth: '96px' },
    xl: { height: '56px', minWidth: '112px' }
  },
  
  input: {
    sm: { height: '32px' },
    md: { height: '40px' },
    lg: { height: '48px' }
  },
  
  avatar: {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px',
    '2xl': '96px'
  }
};

// Configuration des focus rings
export const focusRings = {
  default: 'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  primary: 'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  secondary: 'focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
  success: 'focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
  warning: 'focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
  error: 'focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  none: 'focus:ring-0'
};

// États des composants
export const componentStates = {
  default: 'default',
  hover: 'hover',
  focus: 'focus',
  active: 'active',
  disabled: 'disabled',
  loading: 'loading',
  error: 'error',
  success: 'success',
  warning: 'warning'
};

// Types de contenus
export const contentTypes = {
  text: 'text',
  number: 'number',
  email: 'email',
  password: 'password',
  url: 'url',
  tel: 'tel',
  search: 'search',
  date: 'date',
  time: 'time',
  datetime: 'datetime-local',
  file: 'file',
  image: 'image',
  video: 'video',
  audio: 'audio'
};

// Positions
export const positions = {
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end'
};

// Orientations
export const orientations = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};

// Alignements
export const alignments = {
  start: 'start',
  center: 'center',
  end: 'end',
  stretch: 'stretch',
  baseline: 'baseline'
};

// Justifications
export const justifications = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'between',
  around: 'around',
  evenly: 'evenly'
};

// Directions
export const directions = {
  row: 'row',
  'row-reverse': 'row-reverse',
  column: 'column',
  'column-reverse': 'column-reverse'
};

// Wrap modes
export const wraps = {
  wrap: 'wrap',
  nowrap: 'nowrap',
  'wrap-reverse': 'wrap-reverse'
};

// Constantes d'accessibilité
export const ariaRoles = {
  alert: 'alert',
  alertdialog: 'alertdialog',
  application: 'application',
  article: 'article',
  banner: 'banner',
  button: 'button',
  cell: 'cell',
  checkbox: 'checkbox',
  columnheader: 'columnheader',
  combobox: 'combobox',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  definition: 'definition',
  dialog: 'dialog',
  directory: 'directory',
  document: 'document',
  feed: 'feed',
  figure: 'figure',
  form: 'form',
  grid: 'grid',
  gridcell: 'gridcell',
  group: 'group',
  heading: 'heading',
  img: 'img',
  link: 'link',
  list: 'list',
  listbox: 'listbox',
  listitem: 'listitem',
  main: 'main',
  menu: 'menu',
  menubar: 'menubar',
  menuitem: 'menuitem',
  navigation: 'navigation',
  none: 'none',
  option: 'option',
  presentation: 'presentation',
  progressbar: 'progressbar',
  radio: 'radio',
  radiogroup: 'radiogroup',
  region: 'region',
  row: 'row',
  rowgroup: 'rowgroup',
  rowheader: 'rowheader',
  scrollbar: 'scrollbar',
  search: 'search',
  searchbox: 'searchbox',
  separator: 'separator',
  slider: 'slider',
  spinbutton: 'spinbutton',
  status: 'status',
  switch: 'switch',
  tab: 'tab',
  table: 'table',
  tablist: 'tablist',
  tabpanel: 'tabpanel',
  textbox: 'textbox',
  timer: 'timer',
  toolbar: 'toolbar',
  tooltip: 'tooltip',
  tree: 'tree',
  treegrid: 'treegrid',
  treeitem: 'treeitem'
};

// États ARIA
export const ariaStates = {
  expanded: 'aria-expanded',
  selected: 'aria-selected',
  checked: 'aria-checked',
  disabled: 'aria-disabled',
  hidden: 'aria-hidden',
  pressed: 'aria-pressed',
  current: 'aria-current',
  invalid: 'aria-invalid',
  required: 'aria-required',
  readonly: 'aria-readonly',
  multiselectable: 'aria-multiselectable',
  sort: 'aria-sort'
};

// Propriétés ARIA
export const ariaProperties = {
  label: 'aria-label',
  labelledby: 'aria-labelledby',
  describedby: 'aria-describedby',
  controls: 'aria-controls',
  owns: 'aria-owns',
  activedescendant: 'aria-activedescendant',
  atomic: 'aria-atomic',
  autocomplete: 'aria-autocomplete',
  busy: 'aria-busy',
  dropeffect: 'aria-dropeffect',
  flowto: 'aria-flowto',
  grabbed: 'aria-grabbed',
  haspopup: 'aria-haspopup',
  level: 'aria-level',
  live: 'aria-live',
  multiline: 'aria-multiline',
  orientation: 'aria-orientation',
  posinset: 'aria-posinset',
  relevant: 'aria-relevant',
  setsize: 'aria-setsize',
  valuemax: 'aria-valuemax',
  valuemin: 'aria-valuemin',
  valuenow: 'aria-valuenow',
  valuetext: 'aria-valuetext'
};

// Constantes de performance
export const performance = {
  // Temps de rendu cibles (en ms)
  renderTimes: {
    fast: 16,      // 60fps
    acceptable: 50, // Perceptible mais acceptable
    slow: 100      // Ressenti comme lent
  },
  
  // Tailles de bundles (en KB)
  bundleSizes: {
    small: 50,
    medium: 150,
    large: 300,
    huge: 500
  },
  
  // Délais pour debounce (en ms)
  debounceDelays: {
    search: 300,
    input: 500,
    resize: 250,
    scroll: 100
  }
};

// Configuration Valorix spécifique
export const valorixConfig = {
  brand: {
    name: 'VALORIX',
    tagline: 'Plateforme d\'Évaluation d\'Entreprise IA & Blockchain',
    version: '2.0.0'
  },
  
  features: {
    ai: {
      provider: 'DeepSeek',
      accuracy: '96%',
      analysisTime: '< 30s'
    },
    
    blockchain: {
      network: 'Solana',
      confirmations: 156,
      hashAlgorithm: 'SHA-256'
    },
    
    integrations: ['Sage', 'Cegid', 'QuickBooks'],
    
    formats: ['PDF', 'Excel', 'CSV', 'FEC']
  },
  
  limits: {
    fileSize: '50MB',
    documentsPerMonth: {
      free: 3,
      pro: 50,
      enterprise: 'unlimited'
    }
  }
};

// Export de toutes les constantes
export default {
  breakpoints,
  zIndex,
  animationDurations,
  animationEasings,
  sizes,
  focusRings,
  componentStates,
  contentTypes,
  positions,
  orientations,
  alignments,
  justifications,
  directions,
  wraps,
  ariaRoles,
  ariaStates,
  ariaProperties,
  performance,
  valorixConfig
}; 