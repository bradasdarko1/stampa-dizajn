import { notFound } from 'next/navigation'
import FlajeriVizitke from './FlajeriVizitke'
import OstaleUsluge from './OstaleUsluge'

const stampaData: Record<string, {
  title: string
  image: string
  description: string
  details?: string[]
  specs?: { label: string; value: string }[]
  pricingTables?: {
    title: string
    subtitle?: string
    rows: { qty: string; price: string }[]
  }[]
  dizajnPricing?: { label: string; price: string }[]
  popular?: boolean
}> = {
  flajeri: {
    title: 'Flajeri',
    image: '/static/images/flajeri.jpeg',
    description: 'Profesionalna štampa flajera za promocije, događaje, akcije i reklamne kampanje.',
    popular: true,
   
    specs: [
      { label: 'Minimalni tiraž', value: '5.000 kom' },
      { label: 'Papir', value: '115g kunstdruk' },
      { label: 'Formati', value: 'A6, A5, A4' },
      { label: 'Štampa', value: 'Ofset CMYK' },
      { label: 'Rok isporuke:', value: '1-4 radna dana' }
    ],
    pricingTables: [
      {
        title: 'Flajeri A6',
        subtitle: '96×144mm · 115g kunstdruk',
        rows: [
          { qty: '5.000 kom',   price: '4.500,00 RSD' },
          { qty: '10.000 kom',  price: '9.000,00 RSD' },
          { qty: '25.000 kom',  price: '22.000,00 RSD' },
          { qty: '50.000 kom',  price: '40.000,00 RSD' },
          { qty: '100.000 kom', price: '78.000,00 RSD' },
        ],
      },
      {
        title: 'Flajeri A5',
        subtitle: '144×192mm · 115g kunstdruk',
        rows: [
          { qty: '5.000 kom',   price: '9.000,00 RSD' },
          { qty: '10.000 kom',  price: '18.000,00 RSD' },
          { qty: '15.000 kom',  price: '26.000,00 RSD' },
          { qty: '25.000 kom',  price: '40.000,00 RSD' },
          { qty: '50.000 kom',  price: '78.000,00 RSD' },
          { qty: '100.000 kom', price: '155.000,00 RSD' },
        ],
      },
      {
        title: 'Flajeri A4',
        subtitle: '192×288mm · 115g kunstdruk',
        rows: [
          { qty: '5.000 kom',  price: '18.000,00 RSD' },
          { qty: '10.000 kom', price: '35.000,00 RSD' },
          { qty: '25.000 kom', price: '78.000,00 RSD' },
          { qty: '50.000 kom', price: '155.000,00 RSD' },
        ],
      },
    ],
    dizajnPricing: [
      { label: 'A6 jednostrani',  price: '1.200,00 RSD' },
      { label: 'A6 dvostrani',    price: '2.000,00 RSD' },
      { label: 'A5 jednostrani',  price: '1.500,00 RSD' },
      { label: 'A5 dvostrani',    price: '2.500,00 RSD' },
      { label: 'A4 jednostrani',  price: '2.000,00 RSD' },
      { label: 'A4 dvostrani',    price: '3.000,00 RSD' },
    ],
  },

  'vizit-karte': {
    title: 'Vizit karte',
    image: '/static/images/vizitke.jpeg',
    description: 'Profesionalne vizit karte visokog kvaliteta koje ostavljaju snažan prvi utisak. Obostrana mat ili sjajna plastifikacija, 350g kunstdruk papir.',
    popular: true,
   
    specs: [
      { label: 'Format', value: '90×50mm' },
      { label: 'Papir', value: '350g kunstdruk' },
      { label: 'Plastifikacija', value: 'Mat ili sjajna (obostrana)' },
      { label: 'Minimalni tiraž', value: '100 kom' },
      { label: 'Rok isporuke:', value: '1-4 radna dana' }
    ],
    pricingTables: [
      {
        title: 'Vizit karte 90×50mm',
        subtitle: '350g kunstdruk · obostrana plastifikacija',
        rows: [
          { qty: '100 kom',   price: '1.800,00 RSD + dizajn 600,00 RSD' },
          { qty: '200 kom',   price: '3.000,00 RSD + dizajn 600,00 RSD' },
          { qty: '500 kom',   price: '4.200,00 RSD + dizajn 600,00 RSD' },
          { qty: '1.000 kom', price: '6.000,00 RSD · dizajn gratis' },
          { qty: '2.000 kom', price: '10.000,00 RSD · dizajn gratis' },
        ],
      },
    ],
  },

  plakati: {
    title: 'Plakati',
    image: '/static/images/plakati.jpeg',
    description: 'Veliki izbor dimenzija plakata za promocije, koncerte, događaje i marketinške kampanje. Kvalitetna štampa sa izraženim bojama.',
    specs: [
      { label: 'Formati', value: 'B2, B3, A2, A3' },
      { label: 'Papir', value: '115g kunstdruk' },
      { label: 'Štampa', value: 'Ofset ili digitalna' },
      { label: 'Rok isporuke', value: '1-4 radna dana' },
    ],
    pricingTables: [
      {
        title: 'Plakati B2',
        subtitle: '680x480mm kunstdruk 115g',
        rows: [
          { qty: '100 kom',   price: '11.500,00 RSD' },
          { qty: '200 kom',   price: '12.500,00 RSD' },
          { qty: '500 kom',   price: '15.000,00 RSD' },
          { qty: '1.000 kom', price: '20.000,00 RSD' },
          { qty: '2.000 kom', price: '30.000,00 RSD' },
        ],
      },
      {
        title: 'Plakati B3',
        subtitle: '480x340mm kunstdruk 115g',
        rows: [
          { qty: '200',  price: '11.500,00 RSD' },
          { qty: '500',  price: '13.000,00 RSD' },
          { qty: '1000', price: '15.500,00 RSD' },
          { qty: '2000', price: '21.000,00 RSD' },
        ],
      },
    ],
  },

  brosure: {
    title: 'Brošure',
    image: '/static/images/brosure.jpeg',
    description: 'Brošure predstavljaju idealan način za detaljnu prezentaciju proizvoda, usluga ili kompanije. Štampa u različitim formatima i vrstama poveza.',
    details: ['Formati: A4, A5, DL', 'Savijanje: 2, 3 ili 4 puta', 'Papir: 115g / 170g', 'Rok isporuke: po dogovoru'],
  },

  casopisi: {
    title: 'Časopisi',
    image: '/static/images/casopisi.jpeg',
    description: 'Štampa časopisa malih i velikih tiraža uz mogućnost različitih vrsta poveza i premium završne obrade.',
    details: ['Povez: klamovano', 'Papir: 90g / 200g', 'Rok isporuke: 3-10 radnih dana'],
  },

  nalepnice: {
    title: 'Nalepnice',
    image: '/static/images/nalepnice.jpeg',
    description: 'Nalepnice svih dimenzija i oblika za brendiranje proizvoda, vozila, izloga i promotivnih materijala.',
    details: ['Oblici: pravougaonik, krug, custom', 'Materijal: papine premazne i PVC', 'Rok isporuke: 1-4 radnih dana'],
  },

  knjige: {
    title: 'Knjige',
    image: '/static/images/knjiga.jpeg',
    description: 'Štampa knjiga u tvrdom ili mekom povezu, sa mogućnošću crno-bele ili kolor štampe. Pogodno za male i velike tiraže.',
    details: ['Povez: meki (perfect bound) ili tvrdi', 'Papir: 80g / 140g ofset', 'Korice: 4/0 sjajna ili mat plastifikacija', 'Rok isporuke: po dogovoru'],
  },

  'blokovska-roba': {
    title: 'Blokovska roba',
    image: '/static/images/blokovska-roba.jpeg',
    description: 'Izrada otpremnica, računa, NCR blokova, memoranduma i ostale poslovne dokumentacije za svakodnevno poslovanje.',
    details: ['Vrste: otpremnice, memorandumi, blokovi', 'Numerisanje i perforacija', 'Papir: 60g / 80g ofset', 'Rok isporuke: 3-5 radnih dana'],
  },

  'stampa-velikog-formata': {
    title: 'Štampa velikog formata',
    image: '/static/images/brendiranje.jpeg',
    description: 'Štampa velikih formata za bilborde, izloge, cerade, reklame i brendiranje vozila. Maksimalna vidljivost za vaš brend.',
    details: ['Materijali: baner, folija, canvas, PVC', 'Primena: vozila, izlozi, bilbordi, roll-up', 'UV otpornost za eksterijer', 'Rok isporuke: po dogovoru'],
  },
}

const hasPricing = (slug: string) => slug === 'flajeri' || slug === 'vizit-karte' || slug === 'plakati'

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ order?: string }>
}) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const data = stampaData[slug]
  if (!data) return notFound()

  const service = {
    title: data.title,
    slug,
    img: data.image,
    desc: data.description,
    details: data.details ?? [],
    popular: data.popular,
    specs: data.specs,
    pricingTables: data.pricingTables,
    dizajnPricing: data.dizajnPricing,
  }

  if (hasPricing(slug)) {
    return <FlajeriVizitke service={service} autoOrder={resolvedSearchParams?.order === '1'} />
  }

  return <OstaleUsluge service={service} />
}
