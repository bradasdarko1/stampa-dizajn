import './globals.css'
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'  // ← DODAJ OVO

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      {/* ← DODAJ OVO */}
      <head>
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
      </head>
      {/* ← DO OVDE */}
      <body className="bg-[#FAFAF7] text-[#222222] pb-16 lg:pb-0">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}