'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search, Download } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Input } from './input';
import { Badge } from './badge';
import { Spinner } from './Spinner';

/**
 * Column definition for DataTable
 */
export interface DataTableColumn<T = Record<string, unknown>> {
  /** Unique key for the column */
  key: string;
  /** Column header label */
  label: string;
  /** Function to render cell content */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is filterable */
  filterable?: boolean;
  /** Column width */
  width?: string;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom className for column */
  className?: string;
}

/**
 * Props for DataTable component
 */
export interface DataTableProps<T = Record<string, unknown>> {
  /** Table data */
  data: T[];
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether to show search */
  searchable?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Whether to show export button */
  exportable?: boolean;
  /** Export filename */
  exportFilename?: string;
  /** Whether to show row actions */
  showActions?: boolean;
  /** Row actions renderer */
  renderActions?: (row: T, index: number) => React.ReactNode;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Custom className */
  className?: string;
  /** Page size for pagination */
  pageSize?: number;
  /** Whether to show pagination */
  paginated?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

/**
 * Advanced DataTable component with sorting, filtering, pagination, and export
 * 
 * @param props - DataTable component props
 * @returns JSX element representing the data table
 */
export const DataTable = <TData extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'Nenhum dado encontrado',
  searchable = true,
  searchPlaceholder = 'Buscar...',
  exportable = true,
  exportFilename = 'data',
  showActions = false,
  renderActions,
  onRowClick,
  className,
  pageSize = 10,
  paginated = true,
}: DataTableProps<TData>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof TData | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = data.filter((row) =>
        columns.some((column) => {
          if (!column.filterable) return false;
          const value = row[column.key as keyof TData];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (sortColumn && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue < bValue ? -1 : 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, searchTerm, sortColumn, sortDirection, columns]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = paginated
    ? processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : processedData;

  // Handle sorting
  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortColumn === columnKey) {
      setSortDirection(
        sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc'
      );
      if (sortDirection === 'desc') {
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnKey as keyof TData);
      setSortDirection('asc');
    }
  };

  // Export to CSV
  const handleExport = () => {
    const headers = columns.map(col => col.label).join(',');
    const rows = processedData.map(row =>
      columns.map(col => {
        const value = row[col.key as keyof TData];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exportFilename}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header Controls */}
      {(searchable || exportable) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="text-xs">
                {processedData.length} resultado(s)
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {exportable && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={processedData.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                      column.sortable && 'cursor-pointer hover:bg-gray-100',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      column.className
                    )}
                    style={{ width: column.width }}
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
                {showActions && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + (showActions ? 1 : 0)}
                    className="px-4 py-8 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <Spinner size="md" />
                      <span className="ml-2 text-gray-500">Carregando...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (showActions ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'hover:bg-gray-50 transition-colors',
                      onRowClick && 'cursor-pointer'
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'px-4 py-3 whitespace-nowrap text-sm text-gray-900',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                          column.className
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key as keyof TData], row, index)
                          : String(row[column.key as keyof TData])}
                      </td>
                    ))}
                    {showActions && (
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        {renderActions?.(row, index)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando {(currentPage - 1) * pageSize + 1} a{' '}
            {Math.min(currentPage * pageSize, processedData.length)} de{' '}
            {processedData.length} resultados
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};