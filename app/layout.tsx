import './globals.css'
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import type { Metadata } from 'next'

// ═══ SEO: globalni meta podaci ═══
// Ovo je bio glavni uzrok problema iz audita — layout nije imao metadata export.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.stampa-dizajn.rs'),
  title: {
    default: 'Štampa i grafički dizajn Novi Sad | Plenti',
    template: '%s | Plenti', // podstranice: "Naslov | Plenti"
  },
  description:
    'Profesionalna štampa i grafički dizajn u Novom Sadu. Flajeri, vizit karte, plakati, brošure i reklamni materijal. Zatražite ponudu već danas.',
  
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    siteName: 'Štampa Dizajn by Plenti',
    url: '/',
    images: [
      {
        // TODO: napraviti sliku 1200x630px i staviti je na ovu putanju
        url: '/static/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Štampa Dizajn by Plenti — štampa i dizajn u Novom Sadu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body className="bg-[#FAFAF7] text-[#222222] pb-16 lg:pb-0">
        <Header />
        {children}
        <Analytics />

        {/* gtag može u body sa next/script — Next ga optimalno učitava.
            Ručni <head> nije potreban i može da smeta metadata sistemu. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18243810281"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18243810281');
          `}
        </Script>
      </body>
    </html>
  )
}
