'use client';

interface Props {
  lat: number;
  lng: number;
}

// Simple iframe embed - no API key needed, lazy loaded
export function Map({ lat, lng }: Props) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <iframe
      src={src}
      className="map"
      title="Locatie op Google Maps"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

// Fallback when coordinates not available
export function MapPlaceholder({ address }: { address: string }) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="map-placeholder">
      <p>Kaart niet beschikbaar</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Bekijk op Google Maps →
      </a>
    </div>
  );
}
