'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface SelectContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
  value?: string;
  setValue: (v?: string) => void;
  label?: string;
  setLabel: (l?: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (val: string) => void;
  defaultValue?: string;
}

export const Select: React.FC<SelectProps> = ({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue,
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(defaultValue);
  const [label, setLabel] = React.useState<string | undefined>(undefined);
  const isControlled = controlledValue !== undefined;

  const currentValue = isControlled ? controlledValue : value;
  const handleSetValue = (v?: string, l?: string) => {
    if (!isControlled) setValue(v);
    if (l !== undefined) setLabel(l);
    if (v !== undefined) onValueChange?.(v);
    setOpen(false);
  };

  return (
    <div className={cn('relative', className)} {...props}>
      <SelectContext.Provider
        value={{ open, setOpen, value: currentValue, setValue: (v) => handleSetValue(v), label, setLabel }}
      >
        {children}
      </SelectContext.Provider>
    </div>
  );
};

export const SelectTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  return (
    <button
      className={cn('flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm', className)}
      onClick={() => ctx.setOpen(!ctx.open)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export const SelectValue: React.FC<{ placeholder?: string; className?: string }> = ({ placeholder, className }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  return (
    <span className={cn('text-gray-700', className)}>
      {ctx.label || ctx.value || placeholder || 'Selecione...'}
    </span>
  );
};

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  if (!ctx.open) return null;
  return (
    <div
      className={cn(
        'absolute left-0 right-0 z-10 mt-1 rounded-md border border-gray-200 bg-white shadow',
        className
      )}
      {...props}
    >
      <div className="max-h-64 overflow-auto p-1">{children}</div>
    </div>
  );
};

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ className, children, value, ...props }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  return (
    <button
      className={cn('w-full text-left rounded-sm px-2 py-2 text-sm hover:bg-gray-50', className)}
      onClick={() => {
        const label = typeof children === 'string' ? children : undefined;
        ctx.setLabel(label);
        ctx.setValue(value);
      }}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};