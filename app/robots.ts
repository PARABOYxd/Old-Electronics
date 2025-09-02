import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ezelectronicspickup.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/auth'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}