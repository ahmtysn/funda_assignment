import Image from 'next/image';
import Link from 'next/link';
import { ListingSummary } from '@/types/listing';
import { formatPrice } from '@/lib/format';

interface Props {
  listing: ListingSummary;
  priority?: boolean; // true = load image immediately
}

// Server Component - uses next/image for optimization
export function PropertyCard({ listing, priority = false }: Props) {
  return (
    <Link href={`/listing/${listing.Id}`} className="property-card">
      <div className="property-card__image">
        <Image
          src={listing.FotoMedium || listing.Foto}
          alt={listing.Adres}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
        {listing.IsVerkocht && <span className="property-card__sold">Verkocht</span>}
      </div>
      <div className="property-card__content">
        <p className="property-card__price">{formatPrice(listing.Koopprijs)}</p>
        <p className="property-card__address">{listing.Adres}</p>
        <p className="property-card__location">{listing.Postcode} {listing.Woonplaats}</p>
        <p className="property-card__features">{listing.Woonoppervlakte} m² · {listing.AantalKamers} kamers</p>
      </div>
    </Link>
  );
}
