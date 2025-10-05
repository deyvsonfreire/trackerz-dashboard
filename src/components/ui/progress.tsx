'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0..100
}

export const Progress: React.FC<ProgressProps> = ({ className, value, ...props }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('w-full bg-gray-200 rounded-full h-2', className)} {...props}>
      <div
        className="h-2 rounded-full bg-blue-600"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};