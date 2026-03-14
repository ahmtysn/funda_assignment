'use client';

import { useRouter } from 'next/navigation';

// Client Component - uses browser history
export function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="back-link">
      ← Terug naar overzicht
    </button>
  );
}
