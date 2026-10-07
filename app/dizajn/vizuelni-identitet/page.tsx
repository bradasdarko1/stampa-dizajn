import type { Metadata } from 'next'
import DesignServicePage from '@/components/DesignServicePage'

export const metadata: Metadata = {
  title: 'Brending i vizuelni identitet',
  description:
    'Kreiranje kompletnog vizuelnog identiteta i brendinga za firme. Logo, boje, tipografija i profesionalna primena brenda.',
  alternates: {
    canonical:
      'https://stampa-dizajn.rs/dizajn/vizuelni-identitet',
  },
}

export default function VizuelniIdentitetPage() {
  return (
    <DesignServicePage
      eyebrow="BRENDING"
      title="Brending i kompletan vizuelni identitet"
      intro="Gradimo dosledan i profesionalan vizuelni identitet koji omogućava vašem brendu da bude lako prepoznatljiv."
      description="Vizuelni identitet obuhvata mnogo više od samog logotipa. Definišemo boje, tipografiju, grafičke elemente i način njihove primene kako bi vaš brend imao dosledan izgled na svim kanalima komunikacije."
      benefits={[
        'Dosledan izgled brenda',
        'Profesionalna prezentacija',
        'Prepoznatljiv vizuelni stil',
        'Jednostavnija primena brenda',
        'Prilagođavanje digitalnim i štampanim kanalima',
      ]}
      services={[
        'Logo i njegove varijante',
        'Paleta boja',
        'Tipografija',
        'Grafički elementi',
        'Vizit karte i poslovni materijali',
        'Smernice vizuelnog identiteta',
      ]}
    />
  )
}