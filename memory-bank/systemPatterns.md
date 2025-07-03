# System Patterns - Valorix

## Architecture générale

### Vue d'ensemble
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend API    │────▶│   Services      │
│  React + Vite   │     │    Supabase      │     │  IA/Blockchain  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### Structure des dossiers
```
valorix/
├── src/
│   ├── components/      # Composants React
│   │   ├── ui/         # Composants Shadcn
│   │   ├── pages/      # Pages principales
│   │   └── shared/     # Composants partagés
│   ├── hooks/          # Hooks personnalisés
│   ├── services/       # Services et API
│   ├── lib/            # Utilitaires
│   └── design-system/  # Système de design
├── public/             # Assets statiques
└── docs/              # Documentation
```

## Patterns de développement

### 1. Composition des composants
```jsx
// Pattern: Composition over inheritance
<Dashboard>
  <DashboardHeader user={user} />
  <DashboardContent>
    <MetricsWidget />
    <ChartsWidget />
  </DashboardContent>
  <DashboardFooter />
</Dashboard>
```

### 2. State management
```jsx
// Pattern: Context + useReducer pour état global
const AppContext = createContext();

const appReducer = (state, action) => {
  switch(action.type) {
    case 'SET_USER': return {...state, user: action.payload};
    case 'UPDATE_SETTINGS': return {...state, settings: action.payload};
    default: return state;
  }
};
```

### 3. Hooks personnalisés
```jsx
// Pattern: Logique métier dans hooks
const useEvaluation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const evaluate = async (companyData) => {
    setLoading(true);
    const result = await evaluationService.process(companyData);
    setData(result);
    setLoading(false);
  };
  
  return { data, loading, evaluate };
};
```

### 4. Error boundaries
```jsx
// Pattern: Gestion d'erreurs robuste
class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }
}
```

## Patterns d'architecture

### 1. Service layer
```javascript
// Pattern: Services pour logique métier
class EvaluationService {
  async processEvaluation(data) {
    const validated = this.validateData(data);
    const normalized = this.normalizeData(validated);
    const results = await this.calculate(normalized);
    return this.formatResults(results);
  }
}
```

### 2. API abstraction
```javascript
// Pattern: Abstraction des appels API
const api = {
  get: (endpoint) => supabase.from(endpoint).select(),
  post: (endpoint, data) => supabase.from(endpoint).insert(data),
  update: (endpoint, id, data) => supabase.from(endpoint).update(data).eq('id', id),
  delete: (endpoint, id) => supabase.from(endpoint).delete().eq('id', id)
};
```

### 3. Caching strategy
```javascript
// Pattern: Cache avec TTL
class CacheManager {
  constructor(ttl = 3600000) { // 1 heure
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }
  
  set(key, value) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttl
    });
  }
}
```

## Patterns de sécurité

### 1. Authentication flow
```javascript
// Pattern: Auth avec refresh tokens
const authFlow = {
  login: async (credentials) => {
    const { user, session } = await supabase.auth.signIn(credentials);
    if (session) localStorage.setItem('refresh_token', session.refresh_token);
    return user;
  },
  
  refresh: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const { session } = await supabase.auth.refreshSession(refreshToken);
    return session;
  }
};
```

### 2. Data validation
```javascript
// Pattern: Validation stricte des entrées
const validators = {
  company: z.object({
    name: z.string().min(2).max(100),
    revenue: z.number().positive(),
    employees: z.number().int().positive(),
    sector: z.enum(['tech', 'retail', 'services', 'industry'])
  })
};
```

## Patterns de performance

### 1. Lazy loading
```jsx
// Pattern: Chargement différé des routes
const EvaluationModule = lazy(() => import('./pages/EvaluationModule'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
```

### 2. Memoization
```jsx
// Pattern: Optimisation des re-renders
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => 
    heavyComputation(data), [data]
  );
  
  return <Chart data={processedData} />;
});
```

### 3. Debouncing
```javascript
// Pattern: Limitation des appels
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

## Relations entre composants

### Hiérarchie principale
```
App
├── AuthPage (public)
├── Dashboard (authenticated)
│   ├── DashboardHome
│   ├── EvaluationModule
│   ├── AnalyticsPage
│   ├── ReportsPage
│   ├── ServicesPage
│   ├── SettingsPage
│   └── PricingPage
└── ErrorBoundary
```

### Flux de données
1. **User auth** → Context global → Tous composants
2. **Company data** → Evaluation service → Results
3. **Analytics** → API calls → Charts/Widgets
4. **Settings** → Local storage + API → UI updates

## Conventions et standards

### Naming
- Components: PascalCase (`UserProfile.jsx`)
- Hooks: camelCase avec `use` (`useAuth.js`)
- Services: camelCase (`evaluationService.js`)
- Constants: UPPER_SNAKE (`API_ENDPOINTS.js`)

### Structure fichier composant
```jsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

// 2. Types/Interfaces (si TypeScript)

// 3. Composant principal
export const Component = () => {
  // 4. State et hooks
  
  // 5. Effects
  
  // 6. Handlers
  
  // 7. Render
  return <div>...</div>;
};

// 8. Sous-composants (si nécessaire)

// 9. Styles (si styled-components)
``` 