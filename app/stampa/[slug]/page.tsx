// app/stampa/[slug]/page.tsx — FINALNA VERZIJA (Next.js 15, async params)
// Podaci su preseljeni u lib/services.ts. Ova strana dodaje sve iz audita:
// meta title/description, canonical (?order=1 → osnovna strana), Open Graph,
// BreadcrumbList + Service scheme, breadcrumb navigaciju.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES, getService, hasPricing } from '@/lib/services'
import Breadcrumbs from '@/components/Breadcrumbs'
import FlajeriVizitke from './FlajeriVizitke'
import OstaleUsluge from './OstaleUsluge'

const BASE = 'https://www.stampa-dizajn.rs'

type Props = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ order?: string }>
}

// Pre-renderuje sve strane usluga u build-u
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

// ═══ META za svaku uslugu ═══
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getService(slug)
  if (!data) return {}

  const path = `/stampa/${slug}`
  return {
    title: data.metaTitle, // template iz layout-a dodaje "| Plenti"
    description: data.metaDescription,
    // Canonical bez parametara → ?order=1 se kanonikalizuje ka osnovnoj strani
    alternates: { canonical: path },
    openGraph: {
      title: `${data.metaTitle} | Plenti`,
      description: data.metaDescription,
      url: path,
      images: [{ url: data.image, width: 1200, height: 630, alt: data.h1 }],
    },
  }
}

export default async function SlugPage({ params, searchParams }: Props) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const data = getService(slug)
  if (!data) return notFound()

  const path = `/stampa/${slug}`

  // Objekat u obliku koji FlajeriVizitke / OstaleUsluge očekuju
  const service = {
    title: data.title,
    slug,
    img: data.image,
    desc: data.description,
    details: data.details ?? [],
    popular: data.popular,
    specs: data.specs,
    pricingTables: data.pricingTables,
    dizajnPricing: data.dizajnPricing,
    h1: data.h1, // ← dodati `h1?: string` u Service type u komponentama
  }

  // ═══ Strukturirani podaci (audit preporuke) ═══
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Štampa', item: `${BASE}/stampa` },
      { '@type': 'ListItem', position: 3, name: data.title, item: `${BASE}${path}` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.h1,
    description: data.metaDescription,
    url: `${BASE}${path}`,
    provider: { '@id': `${BASE}/#business` },
    areaServed: 'RS',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Vidljivi breadcrumb — zamenjuje "← Nazad na štampu" (može se
          ukloniti taj link iz FlajeriVizitke/OstaleUsluge da ne bude duplo) */}
      <div className="bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6">
          <Breadcrumbs
            items={[
              { name: 'Početna', href: '/' },
              { name: 'Štampa', href: '/stampa' },
              { name: data.title, href: path },
            ]}
          />
        </div>
      </div>

      {hasPricing(slug) ? (
        <FlajeriVizitke service={service} autoOrder={resolvedSearchParams?.order === '1'} />
      ) : (
        <OstaleUsluge service={service} />
      )}
    </>
  )
}
