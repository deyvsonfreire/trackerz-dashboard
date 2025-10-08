import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const toastVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  onDismiss?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, variant, onDismiss, ...props }, ref) => (
  <div ref={ref} className={toastVariants({ variant, className })} {...props} />
));
Toast.displayName = 'Toast';

export { Toast, toastVariants };