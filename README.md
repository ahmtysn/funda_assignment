# Funda Frontend Assignment

A house listing app built with Next.js. Shows houses for sale from the Funda API.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

**Home** (`/`) - Grid of 120 houses with pagination (10 pages)

**Detail** (`/listing/[id]`) - Single house with photos, info, map

## Tech Stack

- **Next.js 16** - Server rendering for SEO
- **TypeScript** - Type checking
- **SCSS** - CSS with nesting
- **Google Maps** - Simple iframe, no key needed

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Header + footer
│   ├── page.tsx            # Home page
│   ├── robots.ts           # /robots.txt
│   ├── sitemap.ts          # /sitemap.xml
│   ├── not-found.tsx       # 404 page
│   ├── error.tsx           # Error page
│   └── listing/[id]/
│       ├── page.tsx        # Detail page
│       └── not-found.tsx   # 404 for bad ID
│
├── components/
│   ├── PropertyCard.tsx    # House card
│   ├── Gallery.tsx         # Photo gallery with thumbnails
│   ├── Description.tsx     # Expandable text
│   ├── DetailSidebar.tsx   # Price and info
│   ├── Map.tsx             # Google Maps iframe
│   ├── Pagination.tsx      # Page numbers
│   └── BackButton.tsx      # Browser history back
│
├── lib/
│   ├── api.ts              # API calls
│   └── format.ts           # Price formatting
│
├── styles/
│   └── globals.scss        # All CSS (mobile-first)
│
└── types/
    └── listing.ts          # TypeScript types
```

## Why 120 Houses?

API has 64,000+ houses. I limited to 120 because:

- Nobody browses all 64,000 - people use filters
- Less data = faster loading
- Funda has CDN servers worldwide, I don't

Typing `?page=99` redirects to page 10.

## Image Loading

**Home page:** First 6 cards load immediately, rest are lazy.

**Detail page (50+ photos):** Only current image loads. Next/prev are preloaded in background for instant navigation.

## Data Fetching

Each page fetches only 12 items (not all 120 at once):

```
/?page=1  →  fetch 12 items
/?page=2  →  fetch 12 items (on navigation)
```

**Why per-page fetching instead of loading all 120?**
- Faster initial load (12 items vs 120)
- Each page URL is crawlable by Google (`/?page=3` returns page 3 content)
- Cache: same page requested by different users is served from cache

Responses are cached for 5 minutes:

```typescript
fetch(url, { next: { revalidate: 300 } })
```

## SEO

Each house has its own title and description for Google:

```typescript
export async function generateMetadata({ params }) {
  const house = await getListingDetail(id);
  return {
    title: `${house.Adres} - ${house.Plaats} | Funda`,
    description: `${house.AantalKamers} rooms, ${house.WoonOppervlakte} m²`
  };
}
```

## Environment Variables

Two files:

| File | Purpose |
|------|---------|
| `.env.example` | Template showing which vars are needed (committed to git) |
| `.env.local` | Actual values with real API key (not in git) |

Copy example and add your key:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```
FUNDA_API_KEY=your_key_here
FUNDA_API_BASE_URL=https://partnerapi.funda.nl/feeds/Aanbod.svc/json
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Run production |
| `npm run lint` | Check code |

## Future Improvements

- Search by city
- Filter by price/rooms
- Loading skeleton
