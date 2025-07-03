import React from 'react';
import { Loader2, Zap } from 'lucide-react';

// Spinner personnalisé Valorix
export const ValorixSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative">
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-full animate-pulse"></div>
        <Zap className="absolute inset-0 w-1/2 h-1/2 m-auto text-white animate-spin" />
      </div>
    </div>
  );
};

// Loading button
export const LoadingButton = ({ 
  loading = false, 
  children, 
  disabled = false, 
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const isDisabled = loading || disabled;
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 focus:ring-indigo-500',
    secondary: 'border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-300 focus:ring-indigo-500',
    outline: 'border-2 border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500',
    ghost: 'text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading && (
        <ValorixSpinner size="sm" className="mr-2" />
      )}
      {children}
    </button>
  );
};

// Skeleton Card
export const SkeletonCard = ({ className = '', children }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse ${className}`}>
      {children || (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      )}
    </div>
  );
};

// Skeleton pour les métriques du dashboard
export const SkeletonMetricCard = ({ className = '' }) => {
  return (
    <SkeletonCard className={className}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </SkeletonCard>
  );
};

// Loading overlay pour toute la page
export const LoadingOverlay = ({ 
  visible = false, 
  message = 'Chargement...', 
  className = '' 
}) => {
  if (!visible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 shadow-xl">
        <ValorixSpinner size="xl" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

// Barre de progression
export const ProgressBar = ({ 
  progress = 0, 
  variant = 'primary', 
  showPercentage = false,
  className = '' 
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    error: 'bg-gradient-to-r from-red-500 to-pink-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-300 ease-out ${variantClasses[variant]}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
    </div>
  );
};

// Loading de page complet
export const PageLoading = ({ message = 'Chargement de la page...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <ValorixSpinner size="xl" className="mx-auto" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Valorix</h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default {
  ValorixSpinner,
  LoadingButton,
  SkeletonCard,
  SkeletonMetricCard,
  LoadingOverlay,
  ProgressBar,
  PageLoading
}; 