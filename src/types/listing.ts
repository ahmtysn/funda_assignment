// Listing summary (for list page)
export interface ListingSummary {
  Id: string;
  Adres: string;
  Foto: string;
  FotoMedium: string;
  Koopprijs: number;
  Woonoppervlakte: number;
  AantalKamers: number;
  Postcode: string;
  Woonplaats: string;
  IsVerkocht: boolean;
}

// Listing detail (for detail page)
export interface ListingDetail {
  Id: string;
  Adres: string;
  Postcode: string;
  Plaats: string;
  Koopprijs: number;
  WoonOppervlakte: number;
  PerceelOppervlakte?: number;
  Inhoud?: number;
  AantalKamers: number;
  AantalBadkamers?: number;
  Bouwjaar?: string;
  VolledigeOmschrijving?: string;
  Media: { ContentType: number; MediaItems: { Url: string; Category: number }[] }[];
  WGS84_X?: number;
  WGS84_Y?: number;
  AangebodenSindsTekst: string;
  VerkoopStatus?: string;
  Energielabel?: { Label?: string };
}

// API responses
export interface ListingsResponse {
  Objects: ListingSummary[];
  TotaalAantalObjecten: number;
}

export type ListingDetailResponse = ListingDetail;