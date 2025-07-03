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
  loading, 
  children, 
  disabled, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500',
    secondary: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-indigo-300 shadow-sm hover:shadow-lg focus:ring-indigo-500',
    ghost: 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:ring-indigo-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl'
  };

  const isDisabled = loading || disabled;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};

// Skeleton Card
export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        <div className="h-3 bg-gray-200 rounded w-3/5"></div>
      </div>
    </div>
  );
};

// Skeleton Metric Card
export const SkeletonMetricCard = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

// Skeleton Table Row
export const SkeletonTableRow = ({ columns = 4, className = '' }) => {
  return (
    <tr className={`animate-pulse ${className}`}>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
};

// Skeleton List Item
export const SkeletonListItem = ({ className = '' }) => {
  return (
    <div className={`animate-pulse flex items-center p-4 border-b border-gray-100 ${className}`}>
      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="w-16 h-8 bg-gray-200 rounded"></div>
    </div>
  );
};

// Loading Overlay
export const LoadingOverlay = ({ 
  loading, 
  children, 
  message = 'Chargement...', 
  className = '' 
}) => {
  if (!loading) return children;

  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="text-center">
          <ValorixSpinner size="xl" className="mx-auto mb-4" />
          <p className="text-gray-600 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Progress Bar
export const ProgressBar = ({ 
  progress, 
  className = '', 
  showPercentage = true,
  label = '',
  variant = 'primary'
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-orange-500 to-red-600',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-600'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm text-gray-500">{progress}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${variantClasses[variant]}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
    </div>
  );
};

// Loading Steps
export const LoadingSteps = ({ 
  steps, 
  currentStep, 
  className = '' 
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isPending = index > currentStep;

        return (
          <div key={index} className="flex items-center">
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${isCompleted ? 'bg-green-500 text-white' : ''}
              ${isActive ? 'bg-indigo-600 text-white' : ''}
              ${isPending ? 'bg-gray-200 text-gray-400' : ''}
            `}>
              {isCompleted ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <div className="ml-4 flex-1">
              <h3 className={`
                text-sm font-medium
                ${isActive ? 'text-indigo-600' : ''}
                ${isCompleted ? 'text-green-600' : ''}
                ${isPending ? 'text-gray-400' : ''}
              `}>
                {step.title}
              </h3>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
            {isActive && (
              <ValorixSpinner size="sm" className="ml-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Page Loading
export const PageLoading = ({ message = 'Chargement de la page...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Zap className="w-8 h-8 text-white animate-pulse" />
        </div>
        <ValorixSpinner size="xl" className="mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-700 mb-2">Valorix</p>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}; 