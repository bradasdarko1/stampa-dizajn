// components/LocalBusinessSchema.tsx
// Ubaciti u app/page.tsx (Homepage): <LocalBusinessSchema />
// Podaci preuzeti iz SEO audita.

export default function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.stampa-dizajn.rs/#business',
    name: 'Štampa Dizajn',
    legalName: 'Aleksandra Kostić PR Plenti',
    url: 'https://www.stampa-dizajn.rs/',
    logo: 'https://www.stampa-dizajn.rs/static/images/logo-3.svg',
    image: 'https://www.stampa-dizajn.rs/static/images/stampa-dizajn.jpeg',
    email: 'stampa.dizajn.by.plenti@gmail.com',
    telephone: '+381652495314',
    taxID: '114682202',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bogoboja Atanackovića 26',
      addressLocality: 'Novi Sad',
      postalCode: '21000',
      addressCountry: 'RS',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
