import type { Metadata } from 'next'
import DizajnClient from './DizajnClient'

export const metadata: Metadata = {
  title: 'Grafički i web dizajn',
  description:
    'Grafički dizajn, web dizajn, izrada logotipa, flajera i kompletnog vizuelnog identiteta za firme i brendove.',
  alternates: {
    canonical: 'https://stampa-dizajn.rs/dizajn',
  },
  openGraph: {
    title: 'Grafički i web dizajn | Plenti',
    description:
      'Profesionalni grafički i web dizajn za firme, brendove i preduzetnike.',
    url: 'https://stampa-dizajn.rs/dizajn',
    type: 'website',
  },
}

export default function DizajnPage() {
  return <DizajnClient />
}