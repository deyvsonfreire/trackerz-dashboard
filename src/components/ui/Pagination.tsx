'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

/**
 * Props for Pagination component
 */
export interface PaginationProps {
  /** Current page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems?: number;
  /** Items per page */
  itemsPerPage?: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when items per page changes */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  /** Available items per page options */
  itemsPerPageOptions?: number[];
  /** Whether to show items per page selector */
  showItemsPerPage?: boolean;
  /** Whether to show total items info */
  showTotalItems?: boolean;
  /** Whether to show page size info */
  showPageInfo?: boolean;
  /** Maximum number of page buttons to show */
  maxPageButtons?: number;
  /** Custom className */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Pagination component for navigating through data
 * 
 * @param props - Pagination component props
 * @returns JSX element representing the pagination
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  showItemsPerPage = true,
  showTotalItems = true,
  showPageInfo = true,
  maxPageButtons = 7,
  className,
  size = 'md',
}) => {
  // Calculate page range to display
  const getPageRange = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: (number | 'ellipsis')[] = [];
    const halfRange = Math.floor(maxPageButtons / 2);

    // Always show first page
    range.push(1);

    if (currentPage <= halfRange + 2) {
      // Show pages from start
      for (let i = 2; i <= Math.min(maxPageButtons - 1, totalPages - 1); i++) {
        range.push(i);
      }
      if (totalPages > maxPageButtons - 1) {
        range.push('ellipsis');
      }
    } else if (currentPage >= totalPages - halfRange - 1) {
      // Show pages from end
      if (totalPages > maxPageButtons - 1) {
        range.push('ellipsis');
      }
      for (let i = Math.max(2, totalPages - maxPageButtons + 2); i <= totalPages - 1; i++) {
        range.push(i);
      }
    } else {
      // Show pages around current
      range.push('ellipsis');
      for (let i = currentPage - halfRange + 1; i <= currentPage + halfRange - 1; i++) {
        range.push(i);
      }
      range.push('ellipsis');
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  // Calculate display info
  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  // Button size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const pageRange = getPageRange();

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {/* Left side - Items info and per page selector */}
      <div className="flex items-center space-x-4">
        {showTotalItems && totalItems && (
          <div className="text-sm text-gray-700">
            Mostrando {startItem} a {endItem} de {totalItems} resultados
          </div>
        )}

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Itens por página:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Right side - Page navigation */}
      <div className="flex items-center space-x-2">
        {showPageInfo && (
          <div className="text-sm text-gray-700 mr-4">
            Página {currentPage} de {totalPages}
          </div>
        )}

        {/* Previous button */}
        <Button
          variant="outline"
          size={size}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={cn(sizeClasses[size], 'px-2')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page buttons */}
        <div className="flex items-center space-x-1">
          {pageRange.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className={cn(
                    'flex items-center justify-center',
                    sizeClasses[size]
                  )}
                >
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              );
            }

            const isCurrentPage = page === currentPage;

            return (
              <Button
                key={page}
                variant={isCurrentPage ? 'default' : 'outline'}
                size={size}
                onClick={() => onPageChange(page)}
                className={cn(
                  sizeClasses[size],
                  isCurrentPage && 'bg-blue-600 text-white border-blue-600'
                )}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size={size}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={cn(sizeClasses[size], 'px-2')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

/**
 * Simple pagination component with minimal controls
 */
export const SimplePagination: React.FC<Pick<PaginationProps, 'currentPage' | 'totalPages' | 'onPageChange' | 'className'>> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      <span className="text-sm text-gray-700 px-4">
        {currentPage} de {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Próximo
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};