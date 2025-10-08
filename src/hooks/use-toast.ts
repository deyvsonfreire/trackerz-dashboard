import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({
    title,
    description,
    variant = 'default',
  }: Omit<Toast, 'id'>) => {
    const id = `toast-${toastId++}`;
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, variant },
    ]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  return { toasts, toast, dismiss };
}