import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/pos', '/kitchen', '/admin'],
      },
    ],
    sitemap: 'https://kickbunk.com/sitemap.xml',
  };
}
