import React, { forwardRef, memo } from 'react';
import { getCardClasses, validateDesignProps } from '../../design-system/utilities';
import { useAccessibleIds } from '../../hooks/useAccessibility';
import { usePerformanceMetrics } from '../../hooks/usePerformance';

// Composant Card optimisé avec design system intégré
const Card = memo(forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  href,
  title,
  description,
  image,
  header,
  footer,
  interactive = false,
  loading = false,
  role,
  ariaLabel,
  ariaDescribedBy,
  ...props
}, ref) => {
  // Hooks pour l'accessibilité et la performance
  const getId = useAccessibleIds('card');
  const { measureRender } = usePerformanceMetrics();

  // Validation des props en développement
  if (process.env.NODE_ENV === 'development') {
    validateDesignProps('card', { variant, padding });
  }

  // Mesure de performance du rendu
  React.useEffect(() => {
    const stopMeasure = measureRender(`Card-${variant}`);
    return stopMeasure;
  }, [measureRender, variant]);

  // Détermination du type d'élément (article, div, a, button)
  const isClickable = onClick || href;
  const isLink = href && !onClick;
  const isButton = onClick && !href;
  
  // Composant de base selon le type
  const Component = isLink ? 'a' : isButton ? 'button' : 'div';
  
  // Classes CSS générées par le design system
  const cardClasses = getCardClasses(
    variant,
    padding,
    `
      ${isClickable ? 'valorix-interactive cursor-pointer' : ''}
      ${interactive ? 'hover:shadow-lg transition-shadow duration-200' : ''}
      ${loading ? 'valorix-skeleton' : ''}
      ${className}
    `
  );

  // IDs pour l'accessibilité
  const cardId = getId('main');
  const titleId = title ? getId('title') : undefined;
  const descriptionId = description ? getId('description') : undefined;

  // Props d'accessibilité
  const accessibilityProps = {
    id: cardId,
    role: role || (isClickable ? (isLink ? 'link' : 'button') : 'article'),
    'aria-label': ariaLabel,
    'aria-labelledby': !ariaLabel && titleId ? titleId : undefined,
    'aria-describedby': ariaDescribedBy || descriptionId,
    tabIndex: isClickable ? 0 : undefined
  };

  // Props spécifiques selon le type
  const componentProps = {
    ...accessibilityProps,
    ...(isLink && { href }),
    ...(isButton && { onClick, type: 'button' }),
    className: cardClasses,
    ...props
  };

  // Gestion du clavier pour les cartes interactives
  const handleKeyDown = React.useCallback((event) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (isButton && onClick) {
        onClick(event);
      } else if (isLink && href) {
        window.location.href = href;
      }
    }
  }, [isClickable, isButton, isLink, onClick, href]);

  // Structure du contenu de la carte
  const cardContent = (
    <>
      {/* Image d'en-tête */}
      {image && (
        <div className="relative overflow-hidden rounded-t-lg">
          {typeof image === 'string' ? (
            <img
              src={image}
              alt={title || 'Image de carte'}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          ) : (
            image
          )}
        </div>
      )}

      {/* En-tête personnalisé */}
      {header && (
        <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
          {header}
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1">
        {/* Titre */}
        {title && (
          <h3 
            id={titleId}
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p 
            id={descriptionId}
            className="text-gray-600 mb-4"
          >
            {description}
          </p>
        )}

        {/* Contenu personnalisé */}
        {children}
      </div>

      {/* Pied de page personnalisé */}
      {footer && (
        <div className="border-t border-gray-200 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
          {footer}
        </div>
      )}

      {/* Indicateur de chargement */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="sr-only">Chargement du contenu...</span>
        </div>
      )}
    </>
  );

  return (
    <Component
      ref={ref}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      {...componentProps}
    >
      {cardContent}
    </Component>
  );
}));

Card.displayName = 'Card';

// Variantes prédéfinies pour faciliter l'usage
export const InteractiveCard = memo((props) => (
  <Card variant="interactive" interactive={true} {...props} />
));

export const ElevatedCard = memo((props) => (
  <Card variant="elevated" {...props} />
));

export const ValorixCard = memo((props) => (
  <Card variant="valorix" {...props} />
));

export const SuccessCard = memo((props) => (
  <Card variant="success" {...props} />
));

export const WarningCard = memo((props) => (
  <Card variant="warning" {...props} />
));

export const ErrorCard = memo((props) => (
  <Card variant="error" {...props} />
));

// Composants de contenu spécialisés
export const MetricCard = memo(({ title, value, change, trend, icon, ...props }) => (
  <Card {...props}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {change}
          </p>
        )}
      </div>
      {icon && (
        <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-full">
          {icon}
        </div>
      )}
    </div>
  </Card>
));

export const FeatureCard = memo(({ icon, title, description, features = [], ...props }) => (
  <Card {...props}>
    <div className="text-center">
      {icon && (
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {features.length > 0 && (
        <ul className="text-sm text-gray-600 space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  </Card>
));

export default Card; 