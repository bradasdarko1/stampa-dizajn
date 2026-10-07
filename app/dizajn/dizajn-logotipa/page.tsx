import type { Metadata } from 'next'
import DesignServicePage from '@/components/DesignServicePage'

export const metadata: Metadata = {
  title: 'Dizajn logotipa',
  description:
    'Profesionalni dizajn logotipa za firme, brendove i preduzetnike. Kreiramo prepoznatljiva i funkcionalna vizuelna rešenja.',
  alternates: {
    canonical:
      'https://stampa-dizajn.rs/dizajn/dizajn-logotipa',
  },
}

export default function DizajnLogotipaPage() {
  return (
    <DesignServicePage
      eyebrow="DIZAJN LOGOTIPA"
      title="Logo koji predstavlja identitet vašeg brenda"
      intro="Kreiramo profesionalne i prepoznatljive logotipe koji predstavljaju karakter vašeg poslovanja."
      description="Logo je jedan od najvažnijih elemenata identiteta svakog brenda. Dobar logo treba da bude jednostavan, prepoznatljiv i funkcionalan u različitim formatima — od web sajta i društvenih mreža do štampe, odeće i promotivnih materijala."
      benefits={[
        'Originalan dizajn prilagođen vašem brendu',
        'Profesionalan vizuelni izgled',
        'Primena na digitalnim i štampanim materijalima',
        'Skalabilan dizajn',
        'Prepoznatljiv identitet',
      ]}
      services={[
        'Dizajn novog logotipa',
        'Redizajn postojećeg logotipa',
        'Varijante logotipa',
        'Priprema za štampu',
        'Digitalni formati',
        'Primena logotipa',
      ]}
    />
  )
}