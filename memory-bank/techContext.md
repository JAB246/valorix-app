# Tech Context - Valorix

## Stack technologique

### Frontend
- **React 18.2**: Framework UI principal
- **Vite 5.0**: Build tool ultra-rapide
- **TailwindCSS 3.4**: Utility-first CSS
- **Shadcn/ui**: Composants UI modernes
- **React Router 6**: Navigation SPA
- **Recharts**: Graphiques et visualisations
- **React Hook Form**: Gestion des formulaires
- **Zod**: Validation des schémas

### Backend
- **Supabase**: Backend-as-a-Service
  - PostgreSQL pour la base de données
  - Auth pour l'authentification
  - Storage pour les fichiers
  - Realtime pour les websockets
  - Edge Functions pour la logique serveur

### Services externes
- **Stripe**: Paiements et abonnements
- **OpenAI API**: Analyse IA et prédictions
- **Blockchain API**: Certification des rapports
- **SendGrid**: Emails transactionnels
- **Sentry**: Monitoring des erreurs

## Configuration développement

### Prérequis
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### Installation
```bash
# Cloner le repo
git clone https://github.com/valorix/app.git

# Installer les dépendances
npm install

# Variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés
```

### Variables d'environnement
```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# Services
VITE_AI_SERVICE_URL=https://api.valorix-ai.com
VITE_BLOCKCHAIN_SERVICE_URL=https://api.valorix-blockchain.com

# Feature flags
VITE_ENABLE_2FA=true
VITE_ENABLE_BLOCKCHAIN=true
```

### Scripts disponibles
```json
{
  "dev": "vite",                    // Dev server localhost:5173
  "build": "vite build",            // Build production
  "preview": "vite preview",        // Preview build local
  "test": "vitest",                 // Tests unitaires
  "test:e2e": "cypress run",        // Tests E2E
  "lint": "eslint src",             // Linting
  "format": "prettier --write src", // Formatage
  "type-check": "tsc --noEmit"     // Type checking
}
```

## Architecture technique

### Structure base de données
```sql
-- Tables principales
users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  created_at timestamp,
  subscription_tier text
)

companies (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users,
  name text,
  data jsonb,
  created_at timestamp
)

evaluations (
  id uuid PRIMARY KEY,
  company_id uuid REFERENCES companies,
  results jsonb,
  certified boolean,
  created_at timestamp
)

-- Row Level Security activé sur toutes les tables
```

### Sécurité
- **Authentication**: JWT avec refresh tokens
- **Authorization**: RLS Supabase + policies
- **Encryption**: HTTPS partout, données sensibles chiffrées
- **2FA**: TOTP via authenticator apps
- **Rate limiting**: 100 req/min par IP
- **CORS**: Origines whitelistées uniquement

### Performance
- **Code splitting**: Routes lazy loaded
- **Image optimization**: WebP avec fallback
- **CDN**: Assets statiques sur Cloudflare
- **Caching**: Service Worker + HTTP headers
- **Bundle size**: < 200KB gzipped initial

## Dépendances principales

### Production
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@supabase/supabase-js": "^2.39.0",
  "@stripe/stripe-js": "^2.2.0",
  "recharts": "^2.10.0",
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "date-fns": "^3.0.0",
  "lucide-react": "^0.300.0"
}
```

### Développement
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.2.0",
  "tailwindcss": "^3.4.0",
  "eslint": "^8.56.0",
  "prettier": "^3.1.0",
  "vitest": "^1.1.0",
  "cypress": "^13.6.0",
  "@testing-library/react": "^14.1.0"
}
```

## Contraintes techniques

### Navigateurs supportés
- Chrome/Edge: 2 dernières versions
- Firefox: 2 dernières versions  
- Safari: 2 dernières versions
- Mobile: iOS 14+, Android 8+

### Accessibilité
- WCAG 2.1 niveau AA minimum
- Navigation clavier complète
- Screen readers testés (NVDA, JAWS)
- Contraste minimum 4.5:1

### Performance cibles
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- TTI < 3.5s
- Bundle size < 200KB

## Intégrations API

### Supabase
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);
```

### Stripe
```javascript
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(
  process.env.VITE_STRIPE_PUBLIC_KEY
);
```

### Services custom
```javascript
// AI Service
const analyzeCompany = async (data) => {
  return fetch(`${AI_SERVICE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};

// Blockchain Service  
const certifyReport = async (reportId) => {
  return fetch(`${BLOCKCHAIN_SERVICE_URL}/certify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reportId })
  });
};
```

## Déploiement

### Environnements
- **Development**: localhost:5173
- **Staging**: staging.valorix.com
- **Production**: app.valorix.com

### CI/CD Pipeline
1. Push sur `main` → Tests automatiques
2. Tests passés → Build staging
3. Validation manuelle → Deploy production
4. Rollback automatique si erreurs

### Monitoring
- **Sentry**: Erreurs temps réel
- **LogRocket**: Session replay
- **Google Analytics**: Métriques usage
- **Datadog**: Performance serveur
- **UptimeRobot**: Disponibilité

## Notes importantes

### À ne PAS faire
- Stocker des secrets côté client
- Désactiver les CSP headers
- Ignorer les erreurs TypeScript
- Commit directement sur `main`
- Utiliser `any` en TypeScript

### Bonnes pratiques
- Toujours utiliser les composants Shadcn
- Respecter le design system
- Écrire des tests pour nouvelles features
- Documenter les fonctions complexes
- Optimiser les images avant commit 