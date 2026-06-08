'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
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
          usluga: 'Opšti upit sa početne stranice',
          ime: form.ime, kontakt: form.kontakt, mejl: form.mejl,
          napomena: form.opis, kolicina: '-', strana: '-',
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

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-4 sm:pt-6">
        <Link href="/stampa/flajeri?order=1">
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer hover:scale-[1.01] transition-transform duration-300">

            {/* čista pozadinska slika */}
            <img
              src="/static/images/akcija.jpeg"
              alt="Štampa flajera A6 - 5000 kom 4.500,00 RSD"
              className="w-full h-full object-cover"
            />

            {/* dugme u gornjem desnom uglu — samo na desktopu */}
            <div className="hidden sm:block absolute top-6 right-6">
              <div className="flex items-center gap-2 bg-[#7E8D67] group-hover:bg-[#222222] text-white font-bold text-sm sm:text-base px-5 sm:px-7 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap shadow-xl">
                Poruči odmah
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </div>

            {/* dugme na vrhu desno — samo na mobilnoj */}
            <div className="sm:hidden absolute top-2 right-2">
              <div className="flex items-center gap-1 bg-[#7E8D67] text-white font-semibold text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                Poruči →
              </div>
            </div>

          </div>
        </Link>
      </section>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-4 sm:pt-16 lg:pt-20 pb-10 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* TEKST */}
          <div className="order-1">
            <h1 className="text-[2.6rem] leading-[1.1] sm:text-5xl lg:text-7xl font-bold text-[#222222]">
              Štampa i{' '}
              <span className="text-[#7E8D67]">dizajn</span>
              <br />
              na jednom mestu.
            </h1>

            <p className="mt-5 text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
              Vizit karte, flajeri, brošure, katalozi,
              plakati i reklamni materijal za vaše poslovanje.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7 lg:mt-10">
              <button
                onClick={openModal}
                className="w-full sm:w-auto bg-[#7E8D67] text-white px-8 py-4 rounded-xl font-semibold text-base text-center hover:opacity-90 transition"
              >
                Zatraži ponudu
              </button>
              <Link
                href="/stampa"
                className="w-full sm:w-auto border-2 border-[#7E8D67] text-[#7E8D67] px-8 py-4 rounded-xl font-semibold text-base text-center hover:bg-[#7E8D67] hover:text-white transition"
              >
                Pregled usluga
              </Link>
            </div>
          </div>

          {/* SLIKA */}
          <div className="order-2 rounded-3xl shadow-xl overflow-hidden h-[240px] sm:h-[340px] lg:h-[550px]">
            <img
              src="/static/images/stampa-dizajn.jpeg"
              alt="Štampa i dizajn"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-lg p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">

            <button onClick={closeModal} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>

            {!sent ? (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-[#222222] mb-1">Zatraži ponudu</h2>
                <p className="text-sm text-gray-500 mb-5">Popunite formu i javićemo se u najkraćem roku.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime *</label>
                    <input required name="ime" value={form.ime} onChange={handleChange} placeholder="Marko Marković"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Broj telefona *</label>
                    <input required name="kontakt" value={form.kontakt} onChange={handleChange} placeholder="+381 6X XXX XXXX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email adresa *</label>
                    <input required type="email" name="mejl" value={form.mejl} onChange={handleChange} placeholder="marko@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opis projekta *</label>
                    <textarea required name="opis" value={form.opis} onChange={handleChange} rows={3}
                      placeholder="Opišite šta vam je potrebno..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67] resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#7E8D67] text-white py-4 rounded-2xl font-semibold text-base hover:opacity-90 transition disabled:opacity-50">
                    {loading ? 'Slanje...' : 'Pošalji upit'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-[#222222] mb-2">Upit je poslat!</h2>
                <p className="text-gray-500 text-sm">Javićemo se na <strong>{form.mejl}</strong>.</p>
                <button onClick={closeModal} className="mt-6 bg-[#7E8D67] text-white px-8 py-3 rounded-xl hover:opacity-90 transition text-sm font-semibold">
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
