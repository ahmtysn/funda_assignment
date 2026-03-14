import { redirect } from 'next/navigation';
import { getListings } from '@/lib/api';
import { PropertyCard } from '@/components/PropertyCard';
import { Pagination } from '@/components/Pagination';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

// Server Component - limited to 120 items (API has 64k+, filters needed for more)
export default async function HomePage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageSize = 12;
  const maxPages = 10;
  const requestedPage = parseInt(page || '1', 10);
  
  // Redirect invalid pages to valid range
  if (requestedPage > maxPages) redirect(`/?page=${maxPages}`);
  if (requestedPage < 1) redirect('/');
  
  const currentPage = requestedPage;
  
  const data = await getListings(currentPage, pageSize);
  const totalPages = Math.min(maxPages, Math.ceil(data.TotaalAantalObjecten / pageSize));

  return (
    <div className="container" style={{ padding: '24px 16px' }}>
      <div className="page-title">
        <h1>Koopwoningen in Nederland</h1>
        <p>{((currentPage - 1) * pageSize + 1)}-{currentPage * pageSize} van {data.TotaalAantalObjecten.toLocaleString('nl-NL')} woningen</p>
      </div>

      {/* First 6 images load immediately, rest are lazy */}
      <div className="property-grid">
        {data.Objects.map((listing, index) => (
          <PropertyCard key={listing.Id} listing={listing} priority={index < 6} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
