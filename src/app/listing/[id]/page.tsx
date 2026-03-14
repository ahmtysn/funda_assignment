import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getListingDetail } from '@/lib/api';
import { formatPrice } from '@/lib/format';
import { Gallery } from '@/components/Gallery';
import { Description } from '@/components/Description';
import { DetailSidebar } from '@/components/DetailSidebar';
import { Map, MapPlaceholder } from '@/components/Map';
import { BackButton } from '@/components/BackButton';

interface Props {
  params: Promise<{ id: string }>;
}

// Extract large + thumbnail URLs from API media structure
function getImages(media: { ContentType: number; MediaItems: { Url: string; Category: number }[] }[]) {
  return (media || [])
    .filter((m) => m.ContentType === 1 && m.MediaItems?.length)
    .map((m) => {
      const large = m.MediaItems.find((i) => i.Category === 6 || i.Category === 7);
      const thumb = m.MediaItems.find((i) => i.Category === 1 || i.Category === 4);
      return { url: large?.Url || m.MediaItems[0].Url, thumbnailUrl: thumb?.Url || m.MediaItems[0].Url };
    })
    .filter((img) => img.url && !img.url.endsWith('.xml'));
}

// Dynamic SEO metadata per listing (title + description for Google)
// Runs server-side before page render. Next.js dedupes the API call.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const listing = await getListingDetail(id);
    return {
      title: `${listing.Adres} - ${listing.Plaats} | Funda`,
      description: `${listing.AantalKamers} kamers, ${listing.WoonOppervlakte} m² - ${formatPrice(listing.Koopprijs)}`,
    };
  } catch {
    return { title: 'Woning niet gevonden | Funda' };
  }
}

// Server Component - renders on server for SEO
export default async function ListingPage({ params }: Props) {
  const { id } = await params;

  let listing;
  try {
    listing = await getListingDetail(id);
  } catch {
    notFound();
  }

  const images = getImages(listing.Media);
  const address = `${listing.Adres}, ${listing.Postcode} ${listing.Plaats}`;

  return (
    <div className="container detail-page">
      <BackButton />

      <div className="detail-layout">
        <div>
          <Gallery images={images} />

          {listing.VolledigeOmschrijving && (
            <section className="section">
              <h2>Omschrijving</h2>
              <Description text={listing.VolledigeOmschrijving} />
            </section>
          )}

          <section className="section">
            <h2>Locatie</h2>
            {listing.WGS84_X && listing.WGS84_Y ? (
              <Map lat={listing.WGS84_Y} lng={listing.WGS84_X} />
            ) : (
              <MapPlaceholder address={address} />
            )}
          </section>
        </div>

        <DetailSidebar listing={listing} />
      </div>
    </div>
  );
}
