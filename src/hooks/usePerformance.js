import { useState, useEffect, useMemo, useCallback } from 'react';

// Hook pour le lazy loading des composants
export const useLazyComponent = (importFunction) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    importFunction()
      .then((module) => {
        setComponent(() => module.default || module);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [importFunction]);

  return { Component, loading, error };
};

// Hook pour optimiser les re-renders
export const useOptimizedState = (initialState) => {
  const [state, setState] = useState(initialState);
  
  const optimizedSetState = useCallback((newState) => {
    setState(prevState => {
      // Éviter les re-renders inutiles si l'état n'a pas changé
      if (typeof newState === 'function') {
        const result = newState(prevState);
        return JSON.stringify(result) === JSON.stringify(prevState) ? prevState : result;
      }
      return JSON.stringify(newState) === JSON.stringify(prevState) ? prevState : newState;
    });
  }, []);

  return [state, optimizedSetState];
};

// Hook pour la pagination optimisée
export const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);
  
  const totalPages = useMemo(() => 
    Math.ceil(data.length / itemsPerPage), 
    [data.length, itemsPerPage]
  );
  
  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);
  
  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1)
  };
};

// Hook pour debounce (recherche optimisée)
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook pour mesurer les performances
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0
  });

  const measureRender = useCallback((componentName) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      setMetrics(prev => ({
        ...prev,
        renderTime: prev.renderTime + renderTime,
        componentCount: prev.componentCount + 1
      }));
      
      // Log si le rendu est lent (> 16ms pour 60fps)
      if (renderTime > 16) {
        console.warn(`Rendu lent détecté pour ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, []);

  const getMemoryUsage = useCallback(() => {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      };
    }
    return null;
  }, []);

  return { metrics, measureRender, getMemoryUsage };
};

export default {
  useLazyComponent,
  useOptimizedState,
  usePagination,
  useDebounce,
  usePerformanceMetrics
}; 