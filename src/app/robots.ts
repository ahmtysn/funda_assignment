import { MetadataRoute } from 'next';

// Generates /robots.txt for search engines
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}
