'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface TabsContextValue {
  value: string;
  setValue: (val: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  ...props
}) => {
  const [value, setValue] = React.useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue! : value;

  const handleSetValue = (val: string) => {
    if (!isControlled) setValue(val);
    onValueChange?.(val);
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <TabsContext.Provider value={{ value: currentValue, setValue: handleSetValue }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn('inline-flex items-center gap-2 rounded-md bg-gray-100 p-1', className)} {...props}>
    {children}
  </div>
);

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ className, children, value, ...props }) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  const active = ctx.value === value;
  return (
    <button
      className={cn(
        'px-3 py-2 text-sm rounded-md transition-colors',
        active ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-800',
        className
      )}
      onClick={() => ctx.setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ className, children, value, ...props }) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  if (ctx.value !== value) return null;
  return (
    <div className={cn('mt-4', className)} {...props}>
      {children}
    </div>
  );
};