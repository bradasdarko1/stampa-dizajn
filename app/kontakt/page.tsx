'use client'

export default function KontaktPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#222222]">
          Kontakt <span className="text-[#7E8D67]">informacije</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl text-lg">
          Kontaktirajte nas telefonom, mejlom ili nas posetite na adresi.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* TELEFON */}
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">Telefon</h2>
            <div className="space-y-3 text-gray-700">
              <a href="tel:+381652495314" className="block hover:text-[#7E8D67]">
                +381 65 2495 314 Aleksandra
              </a>
              <a href="tel:+38166133231" className="block hover:text-[#7E8D67]">
                +381 66 133 231 Đorđe
              </a>
              <a href="tel:+381603021129" className="block hover:text-[#7E8D67]">
                +381 60 3021 129 Web dizajn - Darko
              </a>
            </div>
          </div>

          {/* EMAIL */}
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">E-mail</h2>
            <div className="space-y-3 text-gray-700">
              <a href="mailto:stampa.dizajn.by.plenti@gmail.com" className="block hover:text-[#7E8D67]">
                stampa.dizajn.by.plenti@gmail.com
              </a>
            </div>
          </div>

          {/* PODACI O FIRMI */}
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">Podaci o firmi</h2>
            <div className="space-y-1 text-gray-700">
              <p>Aleksandra Kostic PR Plenti</p>
              <p>Đorđa Magaraševića 47/1/8</p>
              <p>Novi Sad 21000</p>
              <p className="pt-2">Kancelarija: Bogoboja Atanackovića 26</p>
              <p className="pt-2 text-sm text-gray-500">PIB: 114682202</p>
            </div>
          </div>

        </div>
      </section>

      {/* MAPA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#222222]">Pronađite nas</h2>
            <p className="text-gray-600 mt-2">Bogoboja Atanackovića 26, Novi Sad</p>
          </div>
          <iframe
            src="https://maps.google.com/maps?q=Bogoboja+Atanackovi%C4%87a+26%2C+Novi+Sad&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0"
          />
        </div>
      </section>

    </main>
  )
}
