'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirect(condition: () => boolean, redirectTo: string) {
  const router = useRouter();

  useEffect(() => {
    if (!condition()) {
      if (router) {
        router.push(redirectTo);
      }
    }
  }, [condition, redirectTo, router]);
}
