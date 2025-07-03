# Security Policy

## 🔒 Reporting Security Vulnerabilities

We take the security of Valorix seriously. If you discover a security vulnerability, please follow these steps:

### 🚨 Do NOT
- Do not open a public issue
- Do not disclose the vulnerability publicly before it's fixed

### ✅ Do
1. Email us at: security@valorix.com (or create a private security advisory on GitHub)
2. Include detailed information:
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## 🛡️ Security Measures

### Current Implementation
- **Authentication**: Supabase Auth with JWT tokens
- **2FA**: Mandatory for paid plans using TOTP
- **Data Encryption**: All sensitive data encrypted at rest
- **API Security**: Rate limiting and authentication required
- **Session Management**: 30-minute timeout for free tier

### Best Practices
- Never store sensitive data in localStorage
- All API calls include proper auth headers
- Row Level Security (RLS) enabled on all Supabase tables
- Financial calculations happen server-side only
- Regular security audits and dependency updates

## 📋 Security Checklist for Contributors

When contributing code, ensure:
- [ ] No hardcoded secrets or API keys
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention (using parameterized queries)
- [ ] XSS prevention (sanitizing outputs)
- [ ] CSRF protection on state-changing operations
- [ ] Proper error handling without exposing sensitive info

## 🔄 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.2.x   | :white_check_mark: |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :x:                |
| < 1.0   | :x:                |

## 📊 Known Security Requirements

### Environment Variables
Never commit `.env` files. Use `.env.example` as a template:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- etc.

### Dependencies
We regularly update dependencies to patch vulnerabilities:
```bash
npm audit
npm audit fix
```

## 🎯 Response Timeline

- **Critical**: Fixed within 24 hours
- **High**: Fixed within 3 days
- **Medium**: Fixed within 1 week
- **Low**: Fixed in next release

## 🏆 Security Hall of Fame

We appreciate security researchers who help us maintain Valorix's security. 

Thank you for helping keep Valorix secure! 🔐 