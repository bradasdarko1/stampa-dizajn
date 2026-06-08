'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DizajnPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    ime: '',
    kontakt: '',
    mejl: '',
    opis: '',
  })

  const services = [
    { title: 'Grafički dizajn', desc: 'Profesionalni vizuali za vaš brend, društvene mreže i marketing kampanje.' },
    { title: 'Dizajn logotipa', desc: 'Jedinstven logo koji predstavlja identitet vaše firme ili brenda.' },
    { title: 'Brending', desc: 'Kompletan vizuelni identitet uključujući logo, boje i promotivne materijale.' },
    { title: 'Dizajn flajera', desc: 'Atraktivni flajeri i promotivni materijali spremni za štampu.' },
    { title: 'Web dizajn', desc: 'Moderni i responzivni sajtovi prilagođeni svim uređajima.' },
    { title: 'Landing stranice', desc: 'Stranice optimizovane za prodaju, prijave i generisanje novih klijenata.' },
  ]

  const openModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setSent(false)
    setForm({ ime: '', kontakt: '', mejl: '', opis: '' })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

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
          usluga: selectedService,
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
      <section className="max-w-7xl mx-auto px-6 pt-4 sm:pt-20 pb-16">
        <span className="inline-block bg-[#7E8D67]/10 text-[#7E8D67] px-4 py-2 rounded-full text-sm font-semibold">
          DIZAJN & WEB DIZAJN
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[#222222] max-w-4xl leading-tight">
          Kreativna rešenja za vaš
          <span className="text-[#7E8D67]"> brend i online prisustvo</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl">
          Kreiramo moderan grafički dizajn, profesionalne logotipe,
          vizuelne identitete i web sajtove koji ostavljaju snažan utisak
          i privlače nove klijente.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => openModal('Opšti upit')}
            className="bg-[#7E8D67] text-white px-8 py-4 rounded-xl hover:opacity-90 transition"
          >
            Zatraži ponudu
          </button>
          <Link href="/">
          </Link>
        </div>
      </section>

      {/* USLUGE */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">Naše usluge</h2>
          <p className="mt-3 text-gray-600">Sve što vam je potrebno za profesionalnu prezentaciju brenda.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-[#222222]">{service.title}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{service.desc}</p>
              <button
                onClick={() => openModal(service.title)}
                className="mt-6 w-full bg-[#7E8D67] text-white py-3 rounded-xl hover:opacity-90 transition"
              >
                Pošalji upit
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ZAŠTO MI */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#222222] text-center">Zašto izabrati nas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#7E8D67]">100%</h3>
              <p className="mt-2 text-gray-600">Prilagođen dizajn vašim potrebama.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#7E8D67]">Brzo</h3>
              <p className="mt-2 text-gray-600">Kratki rokovi izrade i efikasna komunikacija.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#7E8D67]">Moderno</h3>
              <p className="mt-2 text-gray-600">Dizajn usklađen sa savremenim trendovima.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#7E8D67] rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Spremni za novi projekat?</h2>
          <p className="text-white/90 mt-4 max-w-2xl mx-auto">
            Kontaktirajte nas i zajedno ćemo kreirati dizajn koji ostavlja utisak.
          </p>
          <button
            onClick={() => openModal('Opšti upit')}
            className="mt-8 bg-white text-[#7E8D67] px-8 py-4 rounded-xl font-semibold hover:opacity-90"
          >
            Kontaktirajte nas
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

            {/* Zatvaranje */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>

            {!sent ? (
              <>
                <h2 className="text-2xl font-bold text-[#222222] mb-1">Pošalji upit</h2>
                <p className="text-sm text-gray-500 mb-6">Usluga: <span className="font-medium text-[#7E8D67]">{selectedService}</span></p>

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
                      placeholder="Opišite šta vam je potrebno, vaše ideje, rok, budžet..."
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
                <p className="text-gray-500 text-sm">Javiće se naš tim u najkraćem roku na <strong>{form.mejl}</strong>.</p>
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
