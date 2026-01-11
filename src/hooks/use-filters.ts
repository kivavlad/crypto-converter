import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type SortOrder = 'asc' | 'desc';
export interface FiltersState {
  page: number;
  limit: string;
  sort: SortOrder | string;
  search: string;
}

interface UseFiltersProps {
  initialState?: Partial<FiltersState>;
  persistInUrl?: boolean;
}

export const useFilters = ({ 
  initialState = {}, 
  persistInUrl = true 
}: UseFiltersProps = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFiltersState] = useState<FiltersState>(() => {
    const defaults: FiltersState = {
      page: 1,
      limit: '10',
      sort: 'desc',
      search: ''
    };

    if (persistInUrl) {
      return {
        page: Number(searchParams.get('page')) || initialState.page || defaults.page,
        limit: searchParams.get('limit') || initialState.limit || defaults.limit,
        sort: searchParams.get('sort') || initialState.sort || defaults.sort,
        search: searchParams.get('search') || initialState.search || defaults.search
      };
    };
    
    return { ...defaults, ...initialState };
  });

  /* Синхронизация URL при изменении filters */
  useEffect(() => {
    if (!persistInUrl) return;

    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newSearchParams.set(key, String(value));
      } else {
        newSearchParams.delete(key);
      }
    });

    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [filters, persistInUrl, searchParams, setSearchParams]);

  /* Метод обновления фильтров */
  const updateFilters = useCallback((updates: Partial<FiltersState>) => {
    setFiltersState(prev => {
      const newFilters = { ...prev, ...updates };
      
      if (updates.page === undefined && Object.keys(updates).some(key => key !== 'page')) {
        newFilters.page = 1;
      }

      return newFilters;
    });
  }, []);

  /* Метод сброса фильтров к начальным значениям */
  const resetFilters = useCallback(() => {
    const defaults: FiltersState = {
      page: 1,
      limit: '10',
      sort: '',
      search: ''
    };
    
    setFiltersState({ ...defaults, ...initialState });
  }, [initialState]);

  /* Метод очистки URL параметров */
  const clearUrlParams = useCallback(() => {
    if (!persistInUrl) return;
    
    const newSearchParams = new URLSearchParams(searchParams);
    Object.keys(filters).forEach(key => {
      newSearchParams.delete(key);
    });
    
    setSearchParams(newSearchParams, { replace: true });
    resetFilters();
  }, [filters, persistInUrl, searchParams, setSearchParams, resetFilters]);

  const { page, limit, sort, search } = filters;

  const setPage = useCallback((value: number) => {
    updateFilters({ page: value });
  }, [updateFilters]);

  const setLimit = useCallback((value: string) => {
    updateFilters({ limit: value });
  }, [updateFilters]);

  const setSort = useCallback((value: SortOrder | string) => {
    updateFilters({ sort: value });
  }, [updateFilters]);

  const setSearch = useCallback((value: string) => {
    updateFilters({ search: value });
  }, [updateFilters]);

  return {
    filters,
    page,
    limit,
    sort,
    search,
    setPage,
    setLimit,
    setSort,
    setSearch,
    updateFilters,
    resetFilters,
    clearUrlParams,
  };
};
