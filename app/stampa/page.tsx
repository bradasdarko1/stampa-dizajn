// app/stampa/page.tsx
// VAŽNO: uklonjen 'use client' — klijentske komponente NE MOGU da exportuju
// metadata. Ova strana nema state ni hookove, pa joj 'use client' nije ni trebao.

import Link from 'next/link'
import type { Metadata } from 'next'
import { SERVICES } from '@/lib/services'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Usluge štampe — flajeri, vizit karte, plakati',
  description:
    'Kompletne usluge štampe na jednom mestu: flajeri, vizit karte, plakati, nalepnice, brošure i časopisi. Brza izrada i povoljne cene. Zatražite ponudu.',
  alternates: { canonical: '/stampa' },
  openGraph: {
    title: 'Usluge štampe — flajeri, vizit karte, plakati | Plenti',
    description:
      'Kompletne usluge štampe na jednom mestu: flajeri, vizit karte, plakati, nalepnice, brošure i časopisi.',
    url: '/stampa',
  },
}

export default function StampaPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Početna', href: '/' },
            { name: 'Štampa', href: '/stampa' },
          ]}
        />
      </div>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-6 sm:pt-10 pb-6 sm:pb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222]">
          Usluge <span className="text-[#7E8D67]">štampe</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl text-base sm:text-lg">
          Izaberite uslugu i pošaljite upit za brzu izradu i ponudu.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

          {SERVICES.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition relative flex flex-col"
            >
              {item.popular && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-md z-10 font-semibold">
                  NAJPRODAVANIJE
                </div>
              )}
              {item.badge && (
                <div className="absolute top-3 left-3 bg-[#5EF21F] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-md z-10 font-semibold">
                  {item.badge}
                </div>
              )}

              <div className="h-36 sm:h-48 overflow-hidden flex-shrink-0">
                {/* SEO: opisniji alt umesto samo naziva (audit preporuka) */}
                <img
                  src={item.image}
                  alt={item.h1}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h2 className="text-base sm:text-xl font-bold text-[#222222] leading-tight">
                  {item.title}
                </h2>
                <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed flex-1">
                  {item.cardDesc}
                </p>
                <Link href={`/stampa/${item.slug}`}>
                  <button className="mt-4 w-full bg-[#7E8D67] text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition">
                    Pogledaj detalje
                  </button>
                </Link>
              </div>

            </div>
          ))}

        </div>
      </section>

    </main>
  )
}
