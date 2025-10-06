import { useState, useCallback, useMemo } from 'react';
import { AdvancedFiltersState } from '@/components/filters/AdvancedFilters';

/**
 * Hook personalizado para gerenciar filtros avançados
 */
export const useAdvancedFilters = () => {
  // Estado inicial dos filtros
  const [filters, setFilters] = useState<AdvancedFiltersState>({
    dateRange: {
      start: '',
      end: '',
      preset: '30d'
    },
    channels: [],
    regions: [],
    metrics: [],
    segments: [],
    devices: [],
    customFilters: []
  });

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  /**
   * Atualiza os filtros
   */
  const updateFilters = useCallback((newFilters: AdvancedFiltersState) => {
    setFilters(newFilters);
  }, []);

  /**
   * Toggle da visibilidade dos filtros
   */
  const toggleFiltersVisibility = useCallback(() => {
    setIsFiltersVisible(prev => !prev);
  }, []);

  /**
   * Limpa todos os filtros
   */
  const clearFilters = useCallback(() => {
    setFilters({
      dateRange: {
        start: '',
        end: '',
        preset: '30d'
      },
      channels: [],
      regions: [],
      metrics: [],
      segments: [],
      devices: [],
      customFilters: []
    });
  }, []);

  /**
   * Calcula as datas baseadas no preset selecionado
   */
  const getDateRange = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (filters.dateRange.preset) {
      case '7d':
        return {
          start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
          end: today
        };
      case '30d':
        return {
          start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
          end: today
        };
      case '90d':
        return {
          start: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
          end: today
        };
      case 'this_month':
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: today
        };
      case 'last_month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        return {
          start: lastMonth,
          end: lastMonthEnd
        };
      case 'this_quarter':
        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        return {
          start: quarterStart,
          end: today
        };
      case 'this_year':
        return {
          start: new Date(now.getFullYear(), 0, 1),
          end: today
        };
      case 'custom':
        return {
          start: filters.dateRange.start ? new Date(filters.dateRange.start) : today,
          end: filters.dateRange.end ? new Date(filters.dateRange.end) : today
        };
      default:
        return {
          start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
          end: today
        };
    }
  }, [filters.dateRange]);

  /**
   * Verifica se há filtros ativos
   */
  const hasActiveFilters = useMemo(() => {
    return filters.channels.length > 0 || 
           filters.regions.length > 0 || 
           filters.metrics.length > 0;
  }, [filters]);

  /**
   * Conta o total de filtros ativos
   */
  const activeFiltersCount = useMemo(() => {
    return filters.channels.length + filters.regions.length + filters.metrics.length;
  }, [filters]);

  /**
   * Função para filtrar dados baseado nos filtros ativos
   */
  const filterData = useCallback(<T extends Record<string, any>>(
    data: T[],
    options: {
      channelField?: keyof T;
      regionField?: keyof T;
      dateField?: keyof T;
      metricFields?: (keyof T)[];
    } = {}
  ): T[] => {
    return data.filter(item => {
      // Filtro por canal
      if (filters.channels.length > 0 && options.channelField) {
        const itemChannel = item[options.channelField];
        if (!filters.channels.includes(itemChannel)) {
          return false;
        }
      }

      // Filtro por região
      if (filters.regions.length > 0 && options.regionField) {
        const itemRegion = item[options.regionField];
        if (!filters.regions.includes(itemRegion)) {
          return false;
        }
      }

      // Filtro por data
      if (options.dateField) {
        const itemDate = new Date(item[options.dateField]);
        const { start, end } = getDateRange;
        if (itemDate < start || itemDate > end) {
          return false;
        }
      }

      return true;
    });
  }, [filters, getDateRange]);

  /**
   * Função para aplicar filtros de métricas aos dados
   */
  const applyMetricFilters = useCallback(<T extends Record<string, any>>(
    data: T[],
    availableMetrics: (keyof T)[]
  ): Partial<T>[] => {
    if (filters.metrics.length === 0) {
      return data;
    }

    return data.map(item => {
      const filteredItem: Partial<T> = {};
      
      // Sempre incluir campos de identificação
      if ('id' in item) (filteredItem as any).id = item.id;
      if ('name' in item) (filteredItem as any).name = item.name;
      if ('date' in item) (filteredItem as any).date = item.date;
      if ('channel' in item) (filteredItem as any).channel = item.channel;
      if ('region' in item) (filteredItem as any).region = item.region;

      // Incluir apenas métricas selecionadas
      availableMetrics.forEach(metric => {
        if (filters.metrics.includes(metric as string)) {
          (filteredItem as any)[metric] = item[metric];
        }
      });

      return filteredItem;
    });
  }, [filters.metrics]);

  return {
    filters,
    isFiltersVisible,
    updateFilters,
    toggleFiltersVisibility,
    clearFilters,
    getDateRange,
    hasActiveFilters,
    activeFiltersCount,
    filterData,
    applyMetricFilters
  };
};

export default useAdvancedFilters;