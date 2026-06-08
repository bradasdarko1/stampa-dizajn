'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Service = {
  title: string
  slug: string
  img: string
  desc: string
  details: string[]
  popular?: boolean
  specs?: { label: string; value: string }[]
  pricingTables?: {
    title: string
    subtitle?: string
    rows: { qty: string; price: string }[]
  }[]
  dizajnPricing?: { label: string; price: string }[]
}

const flajerKolicine = [
  '5.000 kom', '10.000 kom', '15.000 kom', '20.000 kom',
  '25.000 kom', '50.000 kom', '100.000 kom', 'Drugi tiraž',
]

const vizitkeKolicine = [
  '100 kom', '200 kom', '500 kom', '1.000 kom', '2.000 kom', 'Drugi tiraž',
]

const plakatiKolicine = [
  '100 kom', '200 kom', '500 kom', '1.000 kom', '2.000 kom', 'Drugi tiraž',
]

export default function FlajeriVizitke({ service, autoOrder }: { service: Service; autoOrder?: boolean }) {
  const isFlajeri = service.slug === 'flajeri'
  const isPlakati = service.slug === 'plakati'

  const kolicineOptions = isFlajeri
    ? flajerKolicine
    : isPlakati
    ? plakatiKolicine
    : vizitkeKolicine

  const [showForm, setShowForm] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState('')

  const [form, setForm] = useState({
    ime: '',
    telefon: '',
    mejl: '',
    adresa: '',
    firma: '',
    pib: '',
    format: isFlajeri ? 'A6' : '',
    strana: 'jednostrano',
    stampaPlakat: '',
    kolicina: '',
    drugiTiraz: '',
    poruka: '',
  })

  useEffect(() => {
    if (autoOrder) {
      setShowForm(true)
      setTimeout(() => {
        document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }, [autoOrder])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    const selected = Array.from(e.target.files || [])
    const valid = selected.filter(f => {
      const ext = f.name.split('.').pop()?.toLowerCase()
      return ['image/png', 'image/jpeg', 'application/pdf'].includes(f.type) || ext === 'psd'
    })
    if (valid.length !== selected.length) setFileError('Dozvoljeni formati: PNG, JPG, PDF, PSD')
    if (valid.length > 2) { setFileError('Maksimalno 2 fajla'); setFiles(valid.slice(0, 2)) }
    else setFiles(valid)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const kolicina = form.kolicina === 'Drugi tiraž' ? form.drugiTiraz : form.kolicina

      const fileData = await Promise.all(files.map(async (file) => {
        return new Promise<{ name: string; base64: string; type: string }>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve({
            name: file.name,
            base64: (reader.result as string).split(',')[1],
            type: file.type,
          })
          reader.readAsDataURL(file)
        })
      }))

      await fetch('/api/posalji-porudzbinu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usluga: service.title,
          ime: form.ime,
          kontakt: form.telefon,
          mejl: form.mejl,
          adresa: form.adresa,
          firma: form.firma,
          pib: form.pib,
          format: isFlajeri ? form.format : isPlakati ? form.format : null,
          strana: isPlakati ? form.stampaPlakat : form.strana,
          kolicina,
          napomena: form.poruka,
          fajlovi: fileData,
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

      {/* BACK */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6 sm:pt-8">
        <Link href="/stampa" className="text-[#7E8D67] text-sm font-medium hover:underline flex items-center gap-2">
          ← Nazad na štampu
        </Link>
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
          <div className="w-full lg:w-1/2 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
            <img src={service.img} alt={service.title}
              className="w-full h-[220px] sm:h-[340px] lg:h-[420px] object-cover" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <div>
              {service.popular && (
                <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-md mb-3 font-semibold">NAJPRODAVANIJE</span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-[#222222]">{service.title}</h1>
              <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">{service.desc}</p>
            </div>
            {service.specs && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Specifikacije</h3>
                <ul className="space-y-2">
                  {service.specs.map((spec, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-medium text-[#222222]">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ul className="space-y-2">
              {service.details.map((d, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-[#7E8D67] flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TABELE CENA */}
      {service.pricingTables && service.pricingTables.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-6 pb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#222222] mb-6">Cenovnik štampe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {service.pricingTables.map((table, ti) => (
              <div key={ti} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#7E8D67] px-5 py-3">
                  <h3 className="text-white font-bold text-base">{table.title}</h3>
                  {table.subtitle && <p className="text-white/80 text-xs mt-0.5">{table.subtitle}</p>}
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f5f5f0] border-b border-gray-100">
                      <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Količina</th>
                      <th className="py-2.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF7]'}`}>
                        <td className="py-3 px-4 font-medium text-[#222222]">{row.qty}</td>
                        <td className="py-3 px-4 text-right text-[#7E8D67] font-semibold">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">* Cene su bez PDV-a. Za veće tiraže kontaktirajte nas direktno.</p>
        </section>
      )}

      {/* TABELA DIZAJN */}
      {service.dizajnPricing && service.dizajnPricing.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-6 pb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#222222] mb-4">Cenovnik dizajna</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f5f0] border-b border-gray-100">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Usluga</th>
                  <th className="py-2.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Cena</th>
                </tr>
              </thead>
              <tbody>
                {service.dizajnPricing.map((row, i) => (
                  <tr key={i} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF7]'}`}>
                    <td className="py-3 px-4 text-gray-700">{row.label}</td>
                    <td className="py-3 px-4 text-right text-[#7E8D67] font-semibold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* DUGME PORUČI */}
      {!showForm && !sent && (
        <div className="max-w-7xl mx-auto px-5 sm:px-6 pb-10">
          <button onClick={() => setShowForm(true)}
            className="w-full sm:w-auto bg-[#7E8D67] text-white px-10 py-4 rounded-2xl text-base font-semibold hover:opacity-90 transition">
            {isPlakati ? 'Poruči →' : 'Poruči →'}
          </button>
        </div>
      )}

      {/* FORMA */}
      {showForm && !sent && (
        <section id="order-form" className="max-w-3xl mx-auto px-5 sm:px-6 pb-20">
          <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#222222] mb-1">
              {isPlakati ? 'Porudžbina' : 'Porudžbina'} — {service.title}
            </h2>
            <p className="text-sm text-gray-400 mb-6">Polja označena sa * su obavezna</p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* PODACI O KUPCU */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Vaši podaci</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime *</label>
                    <input required name="ime" value={form.ime} onChange={handleChange} placeholder="Marko Marković"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Broj telefona *</label>
                    <input required name="telefon" value={form.telefon} onChange={handleChange} placeholder="+381 6X XXX XXXX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email adresa *</label>
                    <input required type="email" name="mejl" value={form.mejl} onChange={handleChange} placeholder="marko@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresa *</label>
                    <input required name="adresa" value={form.adresa} onChange={handleChange} placeholder="Ulica i broj, Grad"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Naziv firme</label>
                    <input name="firma" value={form.firma} onChange={handleChange} placeholder="Naziv firme (opciono)"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIB</label>
                    <input name="pib" value={form.pib} onChange={handleChange} placeholder="PIB (opciono)"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* DETALJI */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Detalji porudžbine</h3>
                <div className="space-y-4">

                  {/* Format — samo za flajere */}
                  {isFlajeri && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Format *</label>
                      <div className="flex gap-3">
                        {['A6', 'A5', 'A4'].map(f => (
                          <label key={f} className={`flex-1 border-2 rounded-xl py-3 text-center text-sm font-semibold cursor-pointer transition ${form.format === f ? 'border-[#7E8D67] bg-[#7E8D67]/10 text-[#7E8D67]' : 'border-gray-200 text-gray-500'}`}>
                            <input type="radio" name="format" value={f} checked={form.format === f} onChange={handleChange} className="sr-only" />
                            {f}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Format — tekst unos za plakate */}
                  {isPlakati && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                      <input name="format" value={form.format} onChange={handleChange} placeholder="npr. A3, A2, B2, custom..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                    </div>
                  )}

                  {/* Način štampe */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Način štampe *</label>
                    {isFlajeri && (
                      <div className="flex gap-3">
                        {['jednostrano', 'dvostrano'].map(s => (
                          <label key={s} className={`flex-1 border-2 rounded-xl py-3 text-center text-sm font-semibold cursor-pointer transition capitalize ${form.strana === s ? 'border-[#7E8D67] bg-[#7E8D67]/10 text-[#7E8D67]' : 'border-gray-200 text-gray-500'}`}>
                            <input type="radio" name="strana" value={s} checked={form.strana === s} onChange={handleChange} className="sr-only" />
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </label>
                        ))}
                      </div>
                    )}
                    {isPlakati && (
                      <div className="flex gap-3">
                        {[
                          { value: '1/0', label: '1/0 (crno-belo)' },
                          { value: '4/0', label: '4/0 (kolor)' },
                        ].map(opt => (
                          <label key={opt.value} className={`flex-1 border-2 rounded-xl py-3 text-center text-sm font-semibold cursor-pointer transition ${form.stampaPlakat === opt.value ? 'border-[#7E8D67] bg-[#7E8D67]/10 text-[#7E8D67]' : 'border-gray-200 text-gray-500'}`}>
                            <input type="radio" name="stampaPlakat" value={opt.value} checked={form.stampaPlakat === opt.value} onChange={handleChange} className="sr-only" />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    )}
                    {!isFlajeri && !isPlakati && (
                      <div className="bg-[#7E8D67]/10 rounded-xl px-4 py-3 text-sm text-[#7E8D67] font-medium">
                        ✓ Obostrana plastifikacija (mat ili sjajna)
                      </div>
                    )}
                  </div>

                  {/* Količina */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Količina *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {kolicineOptions.map(k => (
                        <label key={k} className={`border-2 rounded-xl py-2.5 text-center text-sm font-medium cursor-pointer transition ${form.kolicina === k ? 'border-[#7E8D67] bg-[#7E8D67]/10 text-[#7E8D67]' : 'border-gray-200 text-gray-500'}`}>
                          <input type="radio" name="kolicina" value={k} checked={form.kolicina === k} onChange={handleChange} className="sr-only" required />
                          {k}
                        </label>
                      ))}
                    </div>
                    {form.kolicina === 'Drugi tiraž' && (
                      <input name="drugiTiraz" value={form.drugiTiraz} onChange={handleChange}
                        placeholder="Unesite željenu količinu"
                        className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]" />
                    )}
                    <p className="text-xs text-gray-400 mt-2">Za tiraže koji nisu u listi, izaberite "Drugi tiraž" i unesite količinu.</p>
                  </div>

                </div>
              </div>

              <hr className="border-gray-100" />

              {/* FAJLOVI I PORUKA */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Fajlovi i poruka</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priložite fajlove (max 2)</label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#7E8D67] transition bg-[#FAFAF7]">
                    <p className="text-sm text-gray-500">Kliknite ili prevucite fajlove ovde</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF, PSD · max 2 fajla</p>
                    <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.psd" onChange={handleFileChange} className="hidden" />
                  </label>
                  {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
                  {files.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-100">
                          <span className="text-[#7E8D67]">📎</span> {f.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poruka</label>
                  <textarea name="poruka" value={form.poruka} onChange={handleChange} rows={4}
                    placeholder="Posebni zahtevi, napomene, pitanja..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67] resize-none" />
                </div>
              </div>

              <button type="submit" disabled={loading || !form.kolicina}
                className="w-full bg-[#7E8D67] text-white py-4 rounded-2xl font-semibold text-base hover:opacity-90 transition disabled:opacity-50">
                {loading ? 'Slanje...' : 'Pošalji porudžbinu'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* POTVRDA */}
      {sent && (
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pb-20">
          <div className="bg-white rounded-3xl shadow-md p-8 sm:p-10 text-center border border-gray-100">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#222222] mb-2">
              {isPlakati ? 'Porudžbina primljena!' : 'Porudžbina primljena!'}
            </h2>
            <p className="text-gray-500 text-sm">Kontaktiraćemo vas na <strong>{form.mejl}</strong>.</p>
            <Link href="/stampa">
              <button className="mt-6 bg-[#7E8D67] text-white px-8 py-3 rounded-xl hover:opacity-90 transition text-sm font-semibold">
                Nazad na štampu
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
