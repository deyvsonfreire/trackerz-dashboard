'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to check if the component has been hydrated on the client
 * Useful for preventing hydration mismatches with dynamic content
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}