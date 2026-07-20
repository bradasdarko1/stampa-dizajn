import { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/services'

// VAŽNO: domen je sada www.stampa-dizajn.rs (ranije bez www — nekonzistentno
// sa sajtom i Search Console-om). Sitemap se sam osvežava: nova usluga u
// lib/services.ts automatski ulazi i u sitemap i u grid na /stampa.

const BASE = 'https://www.stampa-dizajn.rs'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/stampa`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/dizajn`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/o-nama`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/stampa/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
