import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // API rute ne treba da se crawl-uju
    },
    sitemap: 'https://www.stampa-dizajn.rs/sitemap.xml',
  }
}
