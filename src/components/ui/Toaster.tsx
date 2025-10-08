import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toast } from '@/components/ui/toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-0 right-0 p-4 space-y-2">
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant} onDismiss={() => dismiss(id)}>
          <div className="grid gap-1">
            {title && <p className="font-semibold">{title}</p>}
            {description && <p className="text-sm">{description}</p>}
          </div>
        </Toast>
      ))}
    </div>
  );
}