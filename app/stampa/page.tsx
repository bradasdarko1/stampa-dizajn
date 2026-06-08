'use client'

import Link from 'next/link'

export default function StampaPage() {
  const services = [
    { title: 'Flajeri', slug: 'flajeri', desc: 'Efektni flajeri za promociju vaših usluga i događaja.', img: '/static/images/flajeri.jpeg', popular: true },
    { title: 'Vizit karte', slug: 'vizit-karte', desc: 'Profesionalne vizit karte visokog kvaliteta za vaš brend.', img: '/static/images/vizitke.jpeg', popular: true },
    { title: 'Plakati', slug: 'plakati', desc: 'Veliki format plakata za maksimalnu vidljivost.', img: '/static/images/plakati.jpeg', badge: 'TRAŽENO' },
    { title: 'Brošure', slug: 'brosure', desc: 'Kvalitetne brošure za detaljnu prezentaciju vašeg biznisa.', img: '/static/images/brosure.jpeg' },
    { title: 'Časopisi', slug: 'casopisi', desc: 'Štampa časopisa velikih i malih tiraža.', img: '/static/images/casopisi.jpeg' },
    { title: 'Nalepnice', slug: 'nalepnice', desc: 'Brendirane nalepnice svih dimenzija i oblika.', img: '/static/images/nalepnice.jpeg' },
    { title: 'Knjige', slug: 'knjige', desc: 'Štampa knjiga tvrdog i mekog poveza.', img: '/static/images/knjiga.jpeg' },
    { title: 'Blokovska roba', slug: 'blokovska-roba', desc: 'Štampa otpremnica, memoranduma i blokčića.', img: '/static/images/blokovska-roba.jpeg' },
    { title: 'Štampa velikog formata', slug: 'stampa-velikog-formata', desc: 'Brendiranje vozila, izloga i bilborda.', img: '/static/images/brendiranje.jpeg' },
  ]

  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-20 pb-6 sm:pb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222]">
          Naša <span className="text-[#7E8D67]">štampa</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl text-base sm:text-lg">
          Izaberite uslugu i pošaljite upit za brzu izradu i ponudu.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition relative flex flex-col"
            >
              {item.popular && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-md z-10 font-semibold">
                  NAJPRODAVANIJE
                </div>
              )}
              {item.badge && (
                <div className="absolute top-3 left-3 bg-[#5EF21F] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-md z-10 font-semibold">
                  {item.badge}
                </div>
              )}

              <div className="h-36 sm:h-48 overflow-hidden flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-base sm:text-xl font-bold text-[#222222] leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>
                <Link href={`/stampa/${item.slug}`}>
                  <button className="mt-4 w-full bg-[#7E8D67] text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition">
                    Pogledaj detalje
                  </button>
                </Link>
              </div>

            </div>
          ))}

        </div>
      </section>

    </main>
  )
}
