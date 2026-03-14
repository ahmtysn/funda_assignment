'use client';

import { useEffect } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="not-found">
      <h1>Er ging iets mis</h1>
      <p>Er is een fout opgetreden bij het laden van de pagina.</p>
      <button onClick={reset}>
        Probeer opnieuw
      </button>
    </div>
  );
}
