'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Badge } from './badge';

/**
 * Search suggestion item
 */
export interface SearchSuggestion {
  /** Unique identifier */
  id: string;
  /** Display text */
  text: string;
  /** Category for grouping */
  category?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Recent search item
 */
export interface RecentSearch {
  /** Search query */
  query: string;
  /** Timestamp */
  timestamp: Date;
}

/**
 * Props for SearchBox component
 */
export interface SearchBoxProps {
  /** Current search value */
  value: string;
  /** Callback when search value changes */
  onChange: (value: string) => void;
  /** Callback when search is submitted */
  onSearch?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Search suggestions */
  suggestions?: SearchSuggestion[];
  /** Recent searches */
  recentSearches?: RecentSearch[];
  /** Whether to show suggestions */
  showSuggestions?: boolean;
  /** Whether to show recent searches */
  showRecentSearches?: boolean;
  /** Whether to show advanced filters toggle */
  showFiltersToggle?: boolean;
  /** Callback when filters toggle is clicked */
  onFiltersToggle?: () => void;
  /** Whether filters are active */
  filtersActive?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom className */
  className?: string;
  /** Debounce delay in ms */
  debounceDelay?: number;
}

/**
 * Advanced search box component with suggestions and recent searches
 * 
 * @param props - SearchBox component props
 * @returns JSX element representing the search box
 */
export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Pesquisar...',
  suggestions = [],
  recentSearches = [],
  showSuggestions = true,
  showRecentSearches = true,
  showFiltersToggle = false,
  onFiltersToggle,
  filtersActive = false,
  loading = false,
  className,
  debounceDelay = 300,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [value, debounceDelay]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions based on search value
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  // Group suggestions by category
  const groupedSuggestions = filteredSuggestions.reduce((acc, suggestion) => {
    const category = suggestion.category || 'Geral';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(suggestion);
    return acc;
  }, {} as Record<string, SearchSuggestion[]>);

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
  };

  // Handle input blur
  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding dropdown to allow for clicks
    setTimeout(() => setShowDropdown(false), 150);
  };

  // Handle search submission
  const handleSubmit = (searchValue: string = value) => {
    if (onSearch) {
      onSearch(searchValue);
    }
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    handleSubmit(suggestion.text);
  };

  // Handle recent search click
  const handleRecentSearchClick = (recentSearch: RecentSearch) => {
    onChange(recentSearch.query);
    handleSubmit(recentSearch.query);
  };

  // Clear search
  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  // Handle key down
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const hasContent = showDropdown && (
    (showSuggestions && filteredSuggestions.length > 0) ||
    (showRecentSearches && recentSearches.length > 0 && !value)
  );

  return (
    <div className={cn('relative', className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={cn(
            'h-5 w-5 transition-colors',
            isFocused ? 'text-blue-500' : 'text-gray-400'
          )} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg',
            'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'placeholder-gray-500 text-sm',
            'transition-colors duration-200',
            isFocused && 'ring-2 ring-blue-500 border-blue-500'
          )}
        />

        {/* Right side controls */}
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
          )}
          
          {value && !loading && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}

          {showFiltersToggle && (
            <Button
              variant="outline"
              size="sm"
              onClick={onFiltersToggle}
              className={cn(
                'p-1 h-8 w-8',
                filtersActive && 'bg-blue-50 border-blue-200 text-blue-600'
              )}
            >
              <Filter className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {hasContent && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {/* Recent Searches */}
          {showRecentSearches && recentSearches.length > 0 && !value && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Pesquisas Recentes
                </span>
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 5).map((recent, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(recent)}
                    className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    {recent.query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="p-3">
              {Object.entries(groupedSuggestions).map(([category, suggestions]) => (
                <div key={category} className="mb-3 last:mb-0">
                  {Object.keys(groupedSuggestions).length > 1 && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {category}
                      </span>
                    </div>
                  )}
                  <div className="space-y-1">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors flex items-center justify-between"
                      >
                        <span>{suggestion.text}</span>
                        {suggestion.metadata?.count != null && (
                          <Badge variant="secondary" className="text-xs">
                            {String(suggestion.metadata.count)}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {showSuggestions && value && filteredSuggestions.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              Nenhuma sugestão encontrada
            </div>
          )}
        </div>
      )}
    </div>
  );
};