import { ListingsResponse, ListingDetailResponse } from '@/types/listing';

const KEY = process.env.FUNDA_API_KEY;
const BASE = process.env.FUNDA_API_BASE_URL;

// Get listings with caching (5 min)
export async function getListings(page = 1, size = 15): Promise<ListingsResponse> {
  const res = await fetch(`${BASE}/${KEY}/?type=koop&page=${page}&pagesize=${size}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error('Failed to fetch listings');
  return res.json();
}

// Get single listing with caching (10 min)
export async function getListingDetail(id: string): Promise<ListingDetailResponse> {
  const res = await fetch(`${BASE}/detail/${KEY}/koop/${id}/`, {
    next: { revalidate: 600 },
  });
  
  if (!res.ok) throw new Error('Failed to fetch listing');
  return res.json();
}
