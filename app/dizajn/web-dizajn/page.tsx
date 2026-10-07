import type { Metadata } from 'next'
import DesignServicePage from '@/components/DesignServicePage'

export const metadata: Metadata = {
  title: 'Web dizajn i izrada sajtova',
  description:
    'Profesionalni web dizajn i izrada modernih, brzih i responzivnih web sajtova prilagođenih vašem poslovanju.',
  alternates: {
    canonical:
      'https://stampa-dizajn.rs/dizajn/web-dizajn',
  },
}

export default function WebDizajnPage() {
  return (
    <DesignServicePage
      eyebrow="WEB DIZAJN"
      title="Moderni web sajtovi koji predstavljaju vaše poslovanje"
      intro="Dizajniramo moderne, brze i responzivne web sajtove koji profesionalno predstavljaju vaš brend i prilagođeni su svim uređajima."
      description="Vaš web sajt je često prvi kontakt potencijalnog klijenta sa vašim poslovanjem. Zato kreiramo sajtove koji kombinuju profesionalan izgled, jednostavno korišćenje, kvalitetnu strukturu sadržaja i odličan prikaz na računarima, tabletima i mobilnim uređajima."
      benefits={[
        'Moderan i profesionalan dizajn',
        'Prilagođavanje mobilnim uređajima',
        'Brzo učitavanje stranica',
        'SEO-friendly struktura',
        'Jasna prezentacija proizvoda i usluga',
      ]}
      services={[
        'Web dizajn',
        'Izrada poslovnih sajtova',
        'Landing stranice',
        'Responzivni dizajn',
        'Redizajn postojećih sajtova',
        'SEO struktura stranica',
      ]}
    />
  )
}