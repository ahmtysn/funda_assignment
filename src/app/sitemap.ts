import { MetadataRoute } from 'next';

// Generates /sitemap.xml for search engines
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://funda-assignment.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
