'use client';

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Image, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';

/**
 * Export format options
 */
export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'png' | 'jpg' | 'json';

/**
 * Export option definition
 */
export interface ExportOption {
  /** Format identifier */
  format: ExportFormat;
  /** Display label */
  label: string;
  /** File extension */
  extension: string;
  /** Icon component */
  icon: React.ReactNode;
  /** Whether this format is available */
  available?: boolean;
}

/**
 * Props for ExportButton component
 */
export interface ExportButtonProps {
  /** Data to export */
  data?: unknown;
  /** Filename (without extension) */
  filename?: string;
  /** Available export formats */
  formats?: ExportFormat[];
  /** Callback when export is triggered */
  onExport: (format: ExportFormat, data?: unknown) => Promise<void> | void;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button variant */
  variant?: 'default' | 'outline' | 'secondary';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Whether to show as dropdown (multiple formats) */
  dropdown?: boolean;
  /** Custom button text */
  children?: React.ReactNode;
}

/**
 * Export button component for downloading data in various formats
 * 
 * @param props - ExportButton component props
 * @returns JSX element representing the export button
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  filename = 'export',
  formats = ['csv', 'xlsx', 'pdf'],
  onExport,
  loading = false,
  disabled = false,
  variant = 'outline',
  size = 'md',
  className,
  dropdown = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);

  // Default export options
  const exportOptions: ExportOption[] = [
    {
      format: 'csv',
      label: 'CSV',
      extension: 'csv',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      format: 'xlsx',
      label: 'Excel',
      extension: 'xlsx',
      icon: <FileSpreadsheet className="h-4 w-4" />,
    },
    {
      format: 'pdf',
      label: 'PDF',
      extension: 'pdf',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      format: 'png',
      label: 'PNG',
      extension: 'png',
      icon: <Image className="h-4 w-4" />,
    },
    {
      format: 'jpg',
      label: 'JPG',
      extension: 'jpg',
      icon: <Image className="h-4 w-4" />,
    },
    {
      format: 'json',
      label: 'JSON',
      extension: 'json',
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  // Filter available options
  const availableOptions = exportOptions.filter(option => 
    formats.includes(option.format)
  );

  // Handle export
  const handleExport = async (format: ExportFormat) => {
    try {
      setExportingFormat(format);
      await onExport(format, data);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExportingFormat(null);
      setIsOpen(false);
    }
  };

  // Single format button
  if (!dropdown || availableOptions.length === 1) {
    const option = availableOptions[0];
    const isExporting = exportingFormat === option.format || loading;

    return (
      <Button
        variant={variant}
        size={size}
        onClick={() => handleExport(option.format)}
        disabled={disabled || isExporting}
        className={cn('flex items-center space-x-2', className)}
      >
        {isExporting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : (
          option.icon
        )}
        <span>{children || `Exportar ${option.label}`}</span>
      </Button>
    );
  }

  // Dropdown button
  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || loading}
        className={cn('flex items-center space-x-2', className)}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        <span>{children || 'Exportar'}</span>
        <ChevronDown className={cn(
          'h-4 w-4 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {availableOptions.map((option) => {
                const isExporting = exportingFormat === option.format;
                
                return (
                  <button
                    key={option.format}
                    onClick={() => handleExport(option.format)}
                    disabled={isExporting}
                    className={cn(
                      'w-full flex items-center space-x-3 px-4 py-2 text-sm text-left',
                      'hover:bg-gray-50 transition-colors',
                      isExporting && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {isExporting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent" />
                    ) : (
                      option.icon
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {filename}.{option.extension}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Quick export button for CSV format
 */
export const ExportCSVButton: React.FC<Omit<ExportButtonProps, 'formats' | 'dropdown'>> = (props) => (
  <ExportButton {...props} formats={['csv']} dropdown={false} />
);

/**
 * Quick export button for Excel format
 */
export const ExportExcelButton: React.FC<Omit<ExportButtonProps, 'formats' | 'dropdown'>> = (props) => (
  <ExportButton {...props} formats={['xlsx']} dropdown={false} />
);

/**
 * Quick export button for PDF format
 */
export const ExportPDFButton: React.FC<Omit<ExportButtonProps, 'formats' | 'dropdown'>> = (props) => (
  <ExportButton {...props} formats={['pdf']} dropdown={false} />
);