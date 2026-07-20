// lib/services.ts
// JEDAN izvor istine za sve usluge štampe — kompletni podaci preseljeni
// iz stampaData ([slug]/page.tsx) + SEO polja (h1, metaTitle, metaDescription)
// + polja za grid na /stampa (cardDesc, badge).
//
// Odavde se pune: /stampa grid, /stampa/[slug] strane, sitemap.xml i meta podaci.

export type ServiceData = {
  title: string
  slug: string
  image: string
  description: string       // opis na detaljnoj strani
  cardDesc: string          // kraći opis na kartici u gridu
  details?: string[]
  specs?: { label: string; value: string }[]
  pricingTables?: {
    title: string
    subtitle?: string
    rows: { qty: string; price: string }[]
  }[]
  dizajnPricing?: { label: string; price: string }[]
  popular?: boolean
  badge?: string
  // ── SEO ──
  h1: string                // prošireni H1 sa ključnom reči (audit preporuka)
  metaTitle: string         // ~55 karaktera, bez "| Plenti" (dodaje template)
  metaDescription: string
}

export const SERVICES: ServiceData[] = [
  {
    title: 'Flajeri',
    slug: 'flajeri',
    image: '/static/images/flajeri.jpeg',
    description: 'Profesionalna štampa flajera za promocije, događaje, akcije i reklamne kampanje.',
    cardDesc: 'Efektni flajeri za promociju vaših usluga i događaja.',
    popular: true,
    h1: 'Profesionalna štampa flajera',
    metaTitle: 'Štampa flajera — cenovnik i formati',
    metaDescription: 'Profesionalna štampa flajera u svim formatima. Kvalitetan papir, brza izrada i povoljne cene. Pošaljite dizajn i zatražite ponudu već danas.',
    specs: [
      { label: 'Minimalni tiraž', value: '5.000 kom' },
      { label: 'Papir', value: '115g kunstdruk' },
      { label: 'Formati', value: 'A6, A5, A4' },
      { label: 'Štampa', value: 'Ofset CMYK' },
      { label: 'Rok isporuke:', value: '1-4 radna dana' },
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

  {
    title: 'Vizit karte',
    slug: 'vizit-karte',
    image: '/static/images/vizitke.jpeg',
    description: 'Profesionalne vizit karte visokog kvaliteta koje ostavljaju snažan prvi utisak. Obostrana mat ili sjajna plastifikacija, 350g kunstdruk papir.',
    cardDesc: 'Profesionalne vizit karte visokog kvaliteta za vaš brend.',
    popular: true,
    h1: 'Štampa vizit karti visokog kvaliteta',
    metaTitle: 'Štampa vizit karti — mat, sjaj, plastifikacija',
    metaDescription: 'Štampa vizit karti po meri — mat, sjaj i plastifikacija. Kvalitetan karton, brza izrada i povoljne cene. Zatražite ponudu za svoje vizit karte.',
    specs: [
      { label: 'Format', value: '90×50mm' },
      { label: 'Papir', value: '350g kunstdruk' },
      { label: 'Plastifikacija', value: 'Mat ili sjajna (obostrana)' },
      { label: 'Minimalni tiraž', value: '100 kom' },
      { label: 'Rok isporuke:', value: '1-4 radna dana' },
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

  {
    title: 'Plakati',
    slug: 'plakati',
    image: '/static/images/plakati.jpeg',
    description: 'Veliki izbor dimenzija plakata za promocije, koncerte, događaje i marketinške kampanje. Kvalitetna štampa sa izraženim bojama.',
    cardDesc: 'Veliki format plakata za maksimalnu vidljivost.',
    badge: 'TRAŽENO',
    h1: 'Štampa plakata u svim formatima',
    metaTitle: 'Štampa plakata — B2, B3, A2, A3 formati',
    metaDescription: 'Štampa plakata u svim formatima (B2, B3, A2, A3). Živopisne boje, kvalitetan papir i brza izrada. Zatražite ponudu za štampu plakata.',
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

  {
    title: 'Brošure',
    slug: 'brosure',
    image: '/static/images/brosure.jpeg',
    description: 'Brošure predstavljaju idealan način za detaljnu prezentaciju proizvoda, usluga ili kompanije. Štampa u različitim formatima i vrstama poveza.',
    cardDesc: 'Kvalitetne brošure za detaljnu prezentaciju vašeg biznisa.',
    h1: 'Štampa brošura i kataloga',
    metaTitle: 'Štampa brošura i kataloga',
    metaDescription: 'Štampa brošura i kataloga sa savijanjem i klamovanjem. Kvalitetan papir i profesionalna dorada. Zatražite ponudu za štampu brošura.',
    details: ['Formati: A4, A5, DL', 'Savijanje: 2, 3 ili 4 puta', 'Papir: 115g / 170g', 'Rok isporuke: po dogovoru'],
  },

  {
    title: 'Časopisi',
    slug: 'casopisi',
    image: '/static/images/casopisi.jpeg',
    description: 'Štampa časopisa malih i velikih tiraža uz mogućnost različitih vrsta poveza i premium završne obrade.',
    cardDesc: 'Štampa časopisa velikih i malih tiraža.',
    h1: 'Štampa časopisa malih i velikih tiraža',
    metaTitle: 'Štampa časopisa — klamovani povez',
    metaDescription: 'Štampa časopisa u mekom i tvrdom povezu. Kvalitetan papir, oštra štampa i brza izrada. Zatražite ponudu za štampu časopisa.',
    details: ['Povez: klamovano', 'Papir: 90g / 200g', 'Rok isporuke: 3-10 radnih dana'],
  },

  {
    title: 'Nalepnice',
    slug: 'nalepnice',
    image: '/static/images/nalepnice.jpeg',
    description: 'Nalepnice svih dimenzija i oblika za brendiranje proizvoda, vozila, izloga i promotivnih materijala.',
    cardDesc: 'Brendirane nalepnice svih dimenzija i oblika.',
    h1: 'Štampa nalepnica svih dimenzija i oblika',
    metaTitle: 'Štampa nalepnica po meri — tabak i rolna',
    metaDescription: 'Štampa nalepnica po meri, u tabaku ili rolni. Vodootporni materijali i precizno sečenje. Zatražite ponudu za nalepnice za vaš brend.',
    details: ['Oblici: pravougaonik, krug, custom', 'Materijal: papine premazne i PVC', 'Rok isporuke: 1-4 radnih dana'],
  },

  {
    title: 'Knjige',
    slug: 'knjige',
    image: '/static/images/knjiga.jpeg',
    description: 'Štampa knjiga u tvrdom ili mekom povezu, sa mogućnošću crno-bele ili kolor štampe. Pogodno za male i velike tiraže.',
    cardDesc: 'Štampa knjiga tvrdog i mekog poveza.',
    h1: 'Štampa knjiga tvrdog i mekog poveza',
    metaTitle: 'Štampa knjiga — od pripreme do koričenja',
    metaDescription: 'Štampa knjiga od pripreme do koričenja. Meki i tvrdi povez, kvalitetan papir i profesionalna dorada. Zatražite ponudu za štampu knjiga.',
    details: ['Povez: meki (perfect bound) ili tvrdi', 'Papir: 80g / 140g ofset', 'Korice: 4/0 sjajna ili mat plastifikacija', 'Rok isporuke: po dogovoru'],
  },

  {
    title: 'Blokovska roba',
    slug: 'blokovska-roba',
    image: '/static/images/blokovska-roba.jpeg',
    description: 'Izrada otpremnica, računa, NCR blokova, memoranduma i ostale poslovne dokumentacije za svakodnevno poslovanje.',
    cardDesc: 'Štampa otpremnica, memoranduma i blokčića.',
    h1: 'Štampa blokovske robe i NCR obrazaca',
    metaTitle: 'Štampa blokovske robe — blokovi, računi, NCR',
    metaDescription: 'Štampa blokovske robe: blokovi, računi, memorandumi i NCR obrasci. Brza izrada i povoljne cene. Zatražite ponudu.',
    details: ['Vrste: otpremnice, memorandumi, blokovi', 'Numerisanje i perforacija', 'Papir: 60g / 80g ofset', 'Rok isporuke: 3-5 radnih dana'],
  },

  {
    title: 'Štampa velikog formata',
    slug: 'stampa-velikog-formata',
    image: '/static/images/brendiranje.jpeg',
    description: 'Štampa velikih formata za bilborde, izloge, cerade, reklame i brendiranje vozila. Maksimalna vidljivost za vaš brend.',
    cardDesc: 'Brendiranje vozila, izloga i bilborda.',
    h1: 'Štampa velikog formata — baneri i brendiranje',
    metaTitle: 'Štampa velikog formata — baneri, cerade, roll-up',
    metaDescription: 'Štampa velikog formata — baneri, plakati, cerade i roll-up. Otporni materijali za unutrašnju i spoljašnju upotrebu. Zatražite ponudu.',
    details: ['Materijali: baner, folija, canvas, PVC', 'Primena: vozila, izlozi, bilbordi, roll-up', 'UV otpornost za eksterijer', 'Rok isporuke: po dogovoru'],
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}

export const hasPricing = (slug: string) =>
  slug === 'flajeri' || slug === 'vizit-karte' || slug === 'plakati'
