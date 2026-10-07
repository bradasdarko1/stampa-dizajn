import Link from 'next/link'

type DesignServicePageProps = {
  eyebrow: string
  title: string
  intro: string
  description: string
  benefits: string[]
  services: string[]
}

export default function DesignServicePage({
  eyebrow,
  title,
  intro,
  description,
  benefits,
  services,
}: DesignServicePageProps) {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-10 sm:pt-20 pb-16">

        <span className="inline-block bg-[#7E8D67]/10 text-[#7E8D67] px-4 py-2 rounded-full text-sm font-semibold">
          {eyebrow}
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[#222222] max-w-4xl leading-tight">
          {title}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
          {intro}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            href="/kontakt"
            className="bg-[#7E8D67] text-white px-8 py-4 rounded-xl hover:opacity-90 transition font-semibold"
          >
            Zatraži ponudu
          </Link>

          <Link
            href="/dizajn"
            className="border border-[#7E8D67] text-[#7E8D67] px-8 py-4 rounded-xl hover:bg-[#7E8D67]/5 transition font-semibold"
          >
            Sve usluge
          </Link>

        </div>

      </section>


      {/* OPIS */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">
              Profesionalno rešenje za vaš brend
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed text-lg">
              {description}
            </p>

          </div>


          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-md">

            <h2 className="text-2xl font-bold text-[#222222]">
              Šta dobijate?
            </h2>

            <div className="mt-6 space-y-4">

              {benefits.map((benefit) => (

                <div
                  key={benefit}
                  className="flex gap-3"
                >

                  <span className="text-[#7E8D67] font-bold">
                    ✓
                  </span>

                  <p className="text-gray-600">
                    {benefit}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* USLUGE */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">
            Šta usluga obuhvata?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

            {services.map((service) => (

              <div
                key={service}
                className="bg-[#FAFAF7] rounded-2xl p-6"
              >

                <div className="w-10 h-10 rounded-full bg-[#7E8D67]/10 flex items-center justify-center text-[#7E8D67] font-bold">
                  ✓
                </div>

                <p className="mt-4 font-semibold text-[#222222]">
                  {service}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="bg-[#7E8D67] rounded-3xl p-10 md:p-16 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Potrebno vam je profesionalno rešenje?
          </h2>

          <p className="text-white/90 mt-4 max-w-2xl mx-auto">
            Pošaljite nam informacije o projektu i pripremićemo
            ponudu prilagođenu vašim potrebama.
          </p>

          <Link
            href="/kontakt"
            className="inline-block mt-8 bg-white text-[#7E8D67] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Kontaktirajte nas
          </Link>

        </div>

      </section>

    </main>
  )
}