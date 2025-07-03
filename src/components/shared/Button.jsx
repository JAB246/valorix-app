import React, { forwardRef, memo } from 'react';
import { getButtonClasses, validateDesignProps } from '../../design-system/utilities';
import { useAccessibleIds, useAriaLabels } from '../../hooks/useAccessibility';
import { usePerformanceMetrics } from '../../hooks/usePerformance';

// Composant Button optimisé avec design system intégré
const Button = memo(forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  onClick,
  ariaLabel,
  ariaDescribedBy,
  iconLeft,
  iconRight,
  fullWidth = false,
  ...props
}, ref) => {
  // Hooks pour l'accessibilité et la performance
  const getId = useAccessibleIds('button');
  const { getButtonLabel } = useAriaLabels();
  const { measureRender } = usePerformanceMetrics();

  // Validation des props en développement
  if (process.env.NODE_ENV === 'development') {
    validateDesignProps('button', { variant, size });
  }

  // Mesure de performance du rendu
  React.useEffect(() => {
    const stopMeasure = measureRender(`Button-${variant}-${size}`);
    return stopMeasure;
  }, [measureRender, variant, size]);

  // États du bouton
  const isDisabled = disabled || loading;
  const buttonId = getId('main');

  // Classes CSS générées par le design system
  const buttonClasses = getButtonClasses(
    variant,
    size,
    `
      ${fullWidth ? 'w-full' : ''}
      ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `
  );

  // Gestion du clic avec prévention si disabled/loading
  const handleClick = React.useCallback((event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }, [isDisabled, onClick]);

  // Aria-label intelligent
  const effectiveAriaLabel = ariaLabel || 
    (typeof children === 'string' ? children : undefined) ||
    getButtonLabel('action', 'élément');

  return (
    <button
      ref={ref}
      id={buttonId}
      type={type}
      disabled={isDisabled}
      className={buttonClasses}
      onClick={handleClick}
      aria-label={effectiveAriaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={isDisabled}
      aria-busy={loading}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      {...props}
    >
      {/* Icône gauche */}
      {iconLeft && !loading && (
        <span className="mr-2 flex-shrink-0" aria-hidden="true">
          {iconLeft}
        </span>
      )}

      {/* Spinner de chargement */}
      {loading && (
        <span className="mr-2 flex-shrink-0" aria-hidden="true">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      )}

      {/* Contenu principal */}
      <span className={`${loading ? 'opacity-70' : ''} flex items-center justify-center`}>
        {children}
      </span>

      {/* Icône droite */}
      {iconRight && !loading && (
        <span className="ml-2 flex-shrink-0" aria-hidden="true">
          {iconRight}
        </span>
      )}

      {/* Indicateur visuel d'état de chargement pour les lecteurs d'écran */}
      {loading && (
        <span className="sr-only">
          Chargement en cours...
        </span>
      )}
    </button>
  );
}));

Button.displayName = 'Button';

// Variantes prédéfinies pour faciliter l'usage
export const PrimaryButton = memo((props) => (
  <Button variant="primary" {...props} />
));

export const SecondaryButton = memo((props) => (
  <Button variant="secondary" {...props} />
));

export const OutlineButton = memo((props) => (
  <Button variant="outline" {...props} />
));

export const GhostButton = memo((props) => (
  <Button variant="ghost" {...props} />
));

export const SuccessButton = memo((props) => (
  <Button variant="success" {...props} />
));

export const WarningButton = memo((props) => (
  <Button variant="warning" {...props} />
));

export const ErrorButton = memo((props) => (
  <Button variant="error" {...props} />
));

// Types pour TypeScript (optionnel)
Button.propTypes = {
  // Ajout de PropTypes en développement si nécessaire
};

export default Button; 