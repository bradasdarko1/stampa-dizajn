import type { Metadata } from 'next'
import DesignServicePage from '@/components/DesignServicePage'

export const metadata: Metadata = {
  title: 'Dizajn flajera',
  description:
    'Profesionalni dizajn flajera i promotivnih materijala sa pripremom za štampu.',
  alternates: {
    canonical:
      'https://stampa-dizajn.rs/dizajn/dizajn-flajera',
  },
}

export default function DizajnFlajeraPage() {
  return (
    <DesignServicePage
      eyebrow="DIZAJN FLAJERA"
      title="Profesionalni dizajn flajera i promotivnih materijala"
      intro="Kreiramo atraktivne flajere koji jasno predstavljaju vašu ponudu i privlače pažnju potencijalnih kupaca."
      description="Flajer mora u svega nekoliko sekundi da privuče pažnju i prenese najvažnije informacije. Dizajn prilagođavamo vašem brendu, vrsti promocije i ciljnoj grupi, uz profesionalnu pripremu materijala za štampu."
      benefits={[
        'Profesionalan izgled',
        'Jasno predstavljena ponuda',
        'Dizajn u skladu sa vašim brendom',
        'Priprema za profesionalnu štampu',
        'Format prilagođen vašim potrebama',
      ]}
      services={[
        'A4 flajeri',
        'A5 flajeri',
        'A6 flajeri',
        'Obostrani flajeri',
        'Promotivni materijali',
        'Priprema za štampu',
      ]}
    />
  )
}