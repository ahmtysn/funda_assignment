'use client';

import { useState } from 'react';

// Expandable text - API returns HTML so using dangerouslySetInnerHTML
export function Description({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 300;
  const display = expanded || !isLong ? text : text.slice(0, 300) + '...';

  return (
    <div className="description">
      <div dangerouslySetInnerHTML={{ __html: display }} />
      {isLong && (
        <button className="description__toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Toon minder' : 'Lees de volledige omschrijving'}
        </button>
      )}
    </div>
  );
}
