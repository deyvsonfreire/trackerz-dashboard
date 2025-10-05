'use client';

import React from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-900 text-white',
  secondary: 'bg-gray-100 text-gray-900',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  destructive: 'bg-red-100 text-red-700',
  outline: 'border border-gray-300 text-gray-800',
};

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => (
  <span
    className={cn('inline-flex items-center rounded-md px-2 py-1 text-xs font-medium', variantClasses[variant], className)}
    {...props}
  >
    {children}
  </span>
);