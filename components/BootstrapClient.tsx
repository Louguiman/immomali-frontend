'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// This component will only be rendered on the client side
export default function BootstrapClient() {
  useEffect(() => {
    // Using dynamic import to ensure this only runs on the client
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}

// Export a dynamic version without SSR
export const BootstrapClientNoSSR = dynamic(
  () => Promise.resolve(BootstrapClient),
  { ssr: false }
);
