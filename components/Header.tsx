'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false)
  const pathname = usePathname()

  const menu = [
    { name: 'Početna', href: '/' },
    { name: 'Štampa', href: '/stampa' },
    { name: 'Dizajn & Web dizajn', href: '/dizajn' },
    { name: 'O nama', href: '/o-nama' },
    { name: 'Kontakt', href: '/kontakt' },
  ]

  return (
    <>
      {/* ── DESKTOP HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#FAFAF7]/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-6 h-20 lg:h-24 flex items-center justify-between">

          <Link href="/">
            <img src="/static/images/logo-3.svg" alt="Štampa Dizajn RS" className="h-10 md:h-12 lg:h-14 w-auto" />
          </Link>

          <nav className="hidden lg:flex gap-10 font-medium">
            {menu.map((item) => (
              <Link key={item.href} href={item.href} className="relative pb-2">
                <span className={pathname === item.href ? 'text-[#7E8D67]' : 'text-gray-600 hover:text-[#222222]'}>
                  {item.name}
                </span>
                {pathname === item.href && (
                  <div className="absolute left-0 bottom-0 h-[2px] w-full bg-[#7E8D67]" />
                )}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setModalOpen(true)}
            className="hidden lg:block bg-[#7E8D67] text-white px-6 py-3 rounded-xl hover:opacity-90"
          >
            Zatraži ponudu
          </button>

        </div>
      </header>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around h-16 px-2">

          <Link href="/" className="flex flex-col items-center gap-0.5 flex-1 py-2">
            <svg className={`w-5 h-5 ${pathname === '/' ? 'text-[#7E8D67]' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className={`text-[10px] font-medium ${pathname === '/' ? 'text-[#7E8D67]' : 'text-gray-400'}`}>Početna</span>
          </Link>

          <Link href="/stampa" className="flex flex-col items-center gap-0.5 flex-1 py-2">
            <svg className={`w-5 h-5 ${pathname.startsWith('/stampa') ? 'text-[#7E8D67]' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span className={`text-[10px] font-medium ${pathname.startsWith('/stampa') ? 'text-[#7E8D67]' : 'text-gray-400'}`}>Štampa</span>
          </Link>

          {/* Srednje istaknuto dugme — O nama */}
          <Link href="/o-nama" className="flex flex-col items-center gap-0.5 flex-1 py-1">
            <div className={`rounded-2xl w-12 h-12 flex items-center justify-center shadow-md -mt-5 ${pathname === '/o-nama' ? 'bg-[#5a6b4a]' : 'bg-[#7E8D67]'}`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className={`text-[10px] font-medium mt-0.5 ${pathname === '/o-nama' ? 'text-[#7E8D67]' : 'text-[#7E8D67]'}`}>O nama</span>
          </Link>

          <Link href="/dizajn" className="flex flex-col items-center gap-0.5 flex-1 py-2">
            <svg className={`w-5 h-5 ${pathname.startsWith('/dizajn') ? 'text-[#7E8D67]' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`text-[10px] font-medium ${pathname.startsWith('/dizajn') ? 'text-[#7E8D67]' : 'text-gray-400'}`}>Dizajn</span>
          </Link>

          <Link href="/kontakt" className="flex flex-col items-center gap-0.5 flex-1 py-2">
            <svg className={`w-5 h-5 ${pathname === '/kontakt' ? 'text-[#7E8D67]' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className={`text-[10px] font-medium ${pathname === '/kontakt' ? 'text-[#7E8D67]' : 'text-gray-400'}`}>Kontakt</span>
          </Link>

        </div>
      </nav>

      {/* Spacer da sadržaj ne ide ispod bottom nav-a */}
      

      {modalOpen && <MiniModal onClose={() => setModalOpen(false)} />}
    </>
  )
}

function MiniModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ime: '', kontakt: '', mejl: '', opis: '' })

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
        body: JSON.stringify({ usluga: 'Opšti upit', ime: form.ime, kontakt: form.kontakt, mejl: form.mejl, napomena: form.opis, kolicina: '-', strana: '-' }),
      })
      setSent(true)
    } catch {
      alert('Greška. Pokušajte ponovo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-lg p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl">×</button>
        {!sent ? (
          <>
            <h2 className="text-xl font-bold text-[#222222] mb-1">Zatraži ponudu</h2>
            <p className="text-sm text-gray-500 mb-5">Javićemo se u najkraćem roku.</p>
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
            <button onClick={onClose} className="mt-6 bg-[#7E8D67] text-white px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90">Zatvori</button>
          </div>
        )}
      </div>
    </div>
  )
}
