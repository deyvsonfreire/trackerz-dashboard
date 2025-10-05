'use client';

import React from 'react';
import { cn } from '@/utils/cn';

type AlertVariant = 'default' | 'success' | 'warning' | 'destructive';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  default: 'bg-gray-50 border-gray-200 text-gray-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  destructive: 'bg-red-50 border-red-200 text-red-800',
};

export const Alert: React.FC<AlertProps> = ({ className, children, variant = 'default', title, ...props }) => (
  <div className={cn('rounded-lg border p-4', variantClasses[variant], className)} {...props}>
    {title && <div className="font-semibold mb-1">{title}</div>}
    <div className="text-sm">{children}</div>
  </div>
);

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props}>
    {children}
  </h5>
);

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props}>
    {children}
  </div>
);