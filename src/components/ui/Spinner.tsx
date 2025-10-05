'use client';

import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Props for the Spinner component
 */
export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant of the spinner */
  variant?: 'primary' | 'secondary' | 'white' | 'gray';
  /** Custom className */
  className?: string;
  /** Accessible label for screen readers */
  label?: string;
}

const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const variantClasses = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  white: 'text-white',
  gray: 'text-gray-400',
};

/**
 * Spinner component for loading states
 * 
 * @param props - Spinner component props
 * @returns JSX element representing the spinner
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className,
  label = 'Loading...',
}) => {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
};

/**
 * Loading overlay component with spinner
 */
export const LoadingOverlay: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  spinnerSize?: SpinnerProps['size'];
  message?: string;
  className?: string;
}> = ({
  isLoading,
  children,
  spinnerSize = 'lg',
  message = 'Loading...',
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-2">
            <Spinner size={spinnerSize} />
            {message && (
              <p className="text-sm text-gray-600 font-medium">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Button with loading state
 */
export const LoadingButton: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}> = ({
  isLoading,
  children,
  loadingText = 'Loading...',
  disabled,
  onClick,
  className,
  variant = 'default',
  size = 'md',
}) => {
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-50 disabled:bg-gray-100',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <Spinner
          size="sm"
          variant={variant === 'default' || variant === 'destructive' ? 'white' : 'gray'}
          className="mr-2"
        />
      )}
      {isLoading ? loadingText : children}
    </button>
  );
};

/**
 * Inline spinner for text content
 */
export const InlineSpinner: React.FC<{
  className?: string;
}> = ({ className }) => (
  <Spinner
    size="xs"
    variant="gray"
    className={cn('inline-block', className)}
  />
);