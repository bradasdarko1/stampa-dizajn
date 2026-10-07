import type { Metadata } from 'next'
import DesignServicePage from '@/components/DesignServicePage'

export const metadata: Metadata = {
  title: 'Grafički dizajn Novi Sad',
  description:
    'Profesionalni grafički dizajn za firme i brendove. Dizajn promotivnih materijala, društvenih mreža, štampe i drugih vizuelnih rešenja.',
  alternates: {
    canonical:
      'https://stampa-dizajn.rs/dizajn/graficki-dizajn',
  },
}

export default function GrafickiDizajnPage() {
  return (
    <DesignServicePage
      eyebrow="GRAFIČKI DIZAJN"
      title="Profesionalni grafički dizajn za vaš brend"
      intro="Kreiramo profesionalna vizuelna rešenja koja predstavljaju vaš brend, privlače pažnju i jasno prenose poruku vašim kupcima."
      description="Dobar grafički dizajn predstavlja mnogo više od lepog izgleda. On stvara prepoznatljivost, gradi poverenje i omogućava vašem poslovanju da se izdvoji od konkurencije. Plenti kreira vizuelna rešenja prilagođena vašem brendu, ciljnoj grupi i načinu komunikacije."
      benefits={[
        'Dizajn prilagođen identitetu vašeg brenda',
        'Profesionalna priprema materijala',
        'Rešenja za digitalne i štampane medije',
        'Dosledan vizuelni stil',
        'Savremen i funkcionalan dizajn',
      ]}
      services={[
        'Grafika za društvene mreže',
        'Baneri i oglasi',
        'Promotivni materijali',
        'Vizit karte',
        'Katalozi i brošure',
        'Priprema za štampu',
      ]}
    />
  )
}