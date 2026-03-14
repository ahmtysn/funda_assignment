import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
}

// Server Component - shows [← 1 ... 4 5 6 ... 10 →]
export function Pagination({ currentPage, totalPages }: Props) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Add ellipsis after first if needed
    if (currentPage > 4) {
      pages.push('...');
    }
    
    // Pages around current
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    
    // Add ellipsis before last if needed
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="pagination__btn">
          ←
        </Link>
      )}

      {getPageNumbers().map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="pagination__ellipsis">...</span>
        ) : (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="pagination__btn">
          →
        </Link>
      )}
    </div>
  );
}
