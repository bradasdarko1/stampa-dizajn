'use client'

import { useState } from 'react'

export default function OnamaPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ime: '', kontakt: '', mejl: '', opis: '' })

  const openModal = () => {
    setSent(false)
    setForm({ ime: '', kontakt: '', mejl: '', opis: '' })
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/posalji-porudzbinu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usluga: 'Opšti upit sa O nama stranice',
          ime: form.ime,
          kontakt: form.kontakt,
          mejl: form.mejl,
          napomena: form.opis,
          kolicina: '-',
          strana: '-',
        }),
      })
      setSent(true)
    } catch {
      alert('Greška pri slanju. Pokušajte ponovo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222]">
          O <span className="text-[#7E8D67]">nama</span>
        </h1>
        <p className="mt-6 text-gray-600 text-lg max-w-3xl leading-relaxed">
          Štampa i dizajn by Plenti je platforma nastala iz višedecenijskog
          iskustva profesionalnog tima u grafičkoj industriji.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
          <p>
            Kroz mrežu proverenih partnera i saradnika, klijentima pružamo kompletna rešenja iz oblasti štampe, grafičkog dizajna i promocije brenda.
          </p>
          <p>
            Posebno smo prepoznati kao pouzdan partner za ofset štampu, koju realizujemo u sopstvenoj produkciji, uz visok standard kvaliteta, preciznost i poštovanje rokova.
            Pored toga, nudimo profesionalne usluge grafičkog dizajna, pripreme za štampu, izrade promotivnog materijala, štampe velikog formata, brendiranja i štampe na tekstilu.
          </p>
          <p>
            Važan deo našeg poslovanja predstavlja i web dizajn. Naš mlad, kreativan i inovativan tim prati savremene trendove i razvija moderna, funkcionalna i vizuelno atraktivna web rešenja prilagođena potrebama svakog klijenta. Fokusirani smo na korisničko iskustvo, brzinu, preglednost i dizajn koji ostavlja snažan utisak i doprinosi rastu vašeg poslovanja na internetu.
          </p>
          <p className="font-medium text-[#222222]">
            Bez obzira da li vam je potreban kreativan dizajn, kvalitetna štampa, moderna web prezentacija ili kompletno rešenje od ideje do gotovog proizvoda, naš tim vam pruža stručnu podršku i pouzdanu realizaciju na svakom koraku.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-[500px]">
          <img
            src="/static/images/o-nama.jpeg"
            alt="Štampa i dizajn"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* MAŠINOPARK */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#222222]">
            Naš <span className="text-[#7E8D67]">mašinopark</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Raspolažemo velikim mašinoparkom koji nam omogućava da odgovorimo na mnoge zahteve klijenata i da isporučimo visok kvalitet štampe u što kraćem roku.
          </p>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Štampa:
            Četvorobojna B2 KBA Rapida SRO
            Dvobojna B2 KBA Rapida SRO 
            Jednobojna Heidelberg GTO 52 
          </p>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Priprema: 
            CTP CREO Lottem 400
          </p>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Dorada:
            Savijačica A2+ MBO 
            Mini savijačica 
            Binder 
            Kompletna oprema za spiralni povez 
            Klamer dve glave Horizon
          </p>
        </div>

        {/* GALERIJA */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            '/static/images/masinopark-1.jpeg',
            '/static/images/masinopark-2.jpeg',
            '/static/images/masinopark-3.jpeg',
            '/static/images/masinopark-4.jpeg',
          ].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-md aspect-square bg-gray-100">
              <img
                src={src}
                alt={`Mašina ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#7E8D67] py-16 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Hajde da napravimo nešto zajedno
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Kontaktirajte nas i pretvorimo vašu ideju u gotov proizvod.
          </p>
          <button
            onClick={openModal}
            className="mt-8 bg-white text-[#7E8D67] px-8 py-4 rounded-xl font-medium hover:opacity-90 transition"
          >
            Kontakt
          </button>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">

            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>

            {!sent ? (
              <>
                <h2 className="text-2xl font-bold text-[#222222] mb-1">Pošalji upit</h2>
                <p className="text-sm text-gray-500 mb-6">Popunite formu i javićemo se u najkraćem roku.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime *</label>
                      <input
                        required
                        name="ime"
                        value={form.ime}
                        onChange={handleChange}
                        placeholder="Marko Marković"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E8D67]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Broj telefona *</label>
                      <input
                        required
                        name="kontakt"
                        value={form.kontakt}
                        onChange={handleChange}
                        placeholder="+381 6X XXX XXXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E8D67]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email adresa *</label>
                    <input
                      required
                      type="email"
                      name="mejl"
                      value={form.mejl}
                      onChange={handleChange}
                      placeholder="marko@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E8D67]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opis projekta *</label>
                    <textarea
                      required
                      name="opis"
                      value={form.opis}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Opišite šta vam je potrebno, rok, budžet..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E8D67] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#7E8D67] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? 'Slanje...' : 'Pošalji upit'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-[#222222] mb-2">Upit je poslat!</h2>
                <p className="text-gray-500 text-sm">Javićemo se u najkraćem roku na <strong>{form.mejl}</strong>.</p>
                <button
                  onClick={closeModal}
                  className="mt-6 bg-[#7E8D67] text-white px-8 py-3 rounded-xl hover:opacity-90 transition text-sm font-semibold"
                >
                  Zatvori
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </main>
  )
}
