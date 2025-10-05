'use client';

import React, { useState } from 'react';
import { Filter, X, ChevronDown, Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Badge } from './badge';

/**
 * Filter option definition
 */
export interface FilterOption {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Filter type */
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number';
  /** Options for select/multiselect */
  options?: { value: string; label: string }[];
  /** Placeholder text */
  placeholder?: string;
  /** Default value */
  defaultValue?: string | string[];
}

/**
 * Active filter value
 */
export interface ActiveFilter {
  key: string;
  value: string | string[];
  label: string;
}

/**
 * Props for FilterPanel component
 */
export interface FilterPanelProps {
  /** Available filter options */
  filters: FilterOption[];
  /** Active filters */
  activeFilters: ActiveFilter[];
  /** Callback when filters change */
  onFiltersChange: (filters: ActiveFilter[]) => void;
  /** Whether panel is collapsible */
  collapsible?: boolean;
  /** Whether panel starts collapsed */
  defaultCollapsed?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Advanced filter panel component for dashboards
 * 
 * @param props - FilterPanel component props
 * @returns JSX element representing the filter panel
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  activeFilters,
  onFiltersChange,
  collapsible = true,
  defaultCollapsed = false,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [tempFilters, setTempFilters] = useState<Record<string, string | string[]>>({});

  // Apply filters
  const handleApplyFilter = (filterKey: string, value: string | string[]) => {
    const filter = filters.find(f => f.key === filterKey);
    if (!filter) return;

    const newFilters = activeFilters.filter(f => f.key !== filterKey);
    
    if (value && (Array.isArray(value) ? value.length > 0 : value.toString().trim())) {
      newFilters.push({
        key: filterKey,
        value,
        label: filter.label,
      });
    }

    onFiltersChange(newFilters);
  };

  // Remove specific filter
  const handleRemoveFilter = (filterKey: string) => {
    const newFilters = activeFilters.filter(f => f.key !== filterKey);
    onFiltersChange(newFilters);
    setTempFilters(prev => ({ ...prev, [filterKey]: '' }));
  };

  // Clear all filters
  const handleClearAll = () => {
    onFiltersChange([]);
    setTempFilters({});
  };

  // Get current value for a filter
  const getCurrentValue = (filterKey: string): string | string[] => {
    const activeFilter = activeFilters.find(f => f.key === filterKey);
    return activeFilter?.value || tempFilters[filterKey] || '';
  };

  // Render filter input based on type
  const renderFilterInput = (filter: FilterOption) => {
    const currentValue = getCurrentValue(filter.key);

    switch (filter.type) {
      case 'text':
        return (
          <Input
            placeholder={filter.placeholder}
            value={currentValue as string}
            onChange={(e) => setTempFilters(prev => ({ ...prev, [filter.key]: e.target.value }))}
            onBlur={() => handleApplyFilter(filter.key, currentValue)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleApplyFilter(filter.key, currentValue);
              }
            }}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={filter.placeholder}
            value={currentValue as string}
            onChange={(e) => setTempFilters(prev => ({ ...prev, [filter.key]: e.target.value }))}
            onBlur={() => handleApplyFilter(filter.key, currentValue)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleApplyFilter(filter.key, currentValue);
              }
            }}
          />
        );

      case 'select':
        return (
          <Select
            value={currentValue as string}
            onValueChange={(value) => handleApplyFilter(filter.key, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <div className="relative">
            <Input
              type="date"
              value={currentValue as string}
              onChange={(e) => handleApplyFilter(filter.key, e.target.value)}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        );

      case 'multiselect':
        // Simplified multiselect - in a real app, you'd want a proper multiselect component
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(currentValue as string[])?.includes(option.value) || false}
                  onChange={(e) => {
                    const current = (currentValue as string[]) || [];
                    const newValue = e.target.checked
                      ? [...current, option.value]
                      : current.filter(v => v !== option.value);
                    handleApplyFilter(filter.key, newValue);
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Format filter value for display
  const formatFilterValue = (filter: ActiveFilter): string => {
    if (Array.isArray(filter.value)) {
      return filter.value.length > 1 
        ? `${filter.value.length} selecionados`
        : filter.value[0] || '';
    }
    return filter.value.toString();
  };

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Filtros</h3>
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilters.length}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFilters.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-xs"
            >
              Limpar tudo
            </Button>
          )}
          {collapsible && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1"
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isCollapsed && 'rotate-180'
                )}
              />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <span className="text-xs">
                  {filter.label}: {formatFilterValue(filter)}
                </span>
                <button
                  onClick={() => handleRemoveFilter(filter.key)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filter Controls */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filters.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {filter.label}
                </label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};