import type { Metadata } from 'next'
import OnamaClient from './OnamaClient'

export const metadata: Metadata = {
  title: 'O nama',
  description:
    'Upoznajte Plenti tim. Profesionalna štampa, grafički dizajn, web dizajn, brendiranje i kompletna rešenja od ideje do gotovog proizvoda.',
  alternates: {
    canonical: 'https://stampa-dizajn.rs/o-nama',
  },
  openGraph: {
    title: 'O nama | Plenti',
    description:
      'Upoznajte Plenti tim i naše usluge štampe, grafičkog i web dizajna.',
    url: 'https://stampa-dizajn.rs/o-nama',
    type: 'website',
  },
}

export default function OnamaPage() {
  return <OnamaClient />
}