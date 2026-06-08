'use client'

import { useState } from 'react'
import Link from 'next/link'

type Service = {
  title: string
  slug: string
  img: string
  desc: string
  details: string[]
  popular?: boolean
}

// Determine form variant based on service slug
function getFormVariant(slug: string): 'brosure' | 'plakati' | 'knjige' | 'kontakt' | 'default' {
  if (['brosure', 'casopisi'].includes(slug)) return 'brosure'
  if (['plakati', 'nalepnice'].includes(slug)) return 'plakati'
  if (slug === 'knjige') return 'knjige'
  if (['blokovska-roba', 'stampa-velikog-formata'].includes(slug)) return 'kontakt'
  return 'default'
}

// ─── SHARED SUBCOMPONENTS ───────────────────────────────────────────────────

function RadioGroup({
  label, name, options, value, onChange,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <label
            key={opt.value}
            className={`flex-1 min-w-[120px] border-2 rounded-xl py-3 px-2 text-center text-sm font-semibold cursor-pointer transition ${
              value === opt.value
                ? 'border-[#7E8D67] bg-[#7E8D67]/10 text-[#7E8D67]'
                : 'border-gray-200 text-gray-500'
            }`}
          >
            <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={onChange} className="sr-only" />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}

function SelectGroup({
  label, name, options, value, onChange,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67] bg-white"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function TextInput({
  label, name, value, onChange, placeholder, required = false, type = 'text',
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67]"
      />
    </div>
  )
}

// ─── FILE + MESSAGE SECTION (shared on all forms) ──────────────────────────

function FilesAndMessage({
  files, fileError, poruka,
  onFileChange, onPorukaChange,
}: {
  files: File[]
  fileError: string
  poruka: string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPorukaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Fajlovi i poruka</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Priložite fajlove (max 2)</label>
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#7E8D67] transition bg-[#FAFAF7]">
          <p className="text-sm text-gray-500">Kliknite ili prevucite fajlove ovde</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF, PSD · max 2 fajla</p>
          <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.psd" onChange={onFileChange} className="hidden" />
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
        <textarea
          name="poruka"
          value={poruka}
          onChange={onPorukaChange}
          rows={4}
          placeholder="Posebni zahtevi, napomene, pitanja..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#7E8D67] resize-none"
        />
      </div>
    </div>
  )
}

// ─── PERSONAL DATA SECTION (shared) ────────────────────────────────────────

function PersonalData({
  form, onChange,
}: {
  form: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Vaši podaci</h3>
      <div className="space-y-3">
        <TextInput required label="Ime i prezime" name="ime" value={form.ime} onChange={onChange} placeholder="Marko Marković" />
        <TextInput required label="Broj telefona" name="telefon" value={form.telefon} onChange={onChange} placeholder="+381 6X XXX XXXX" />
        <TextInput required type="email" label="Email adresa" name="mejl" value={form.mejl} onChange={onChange} placeholder="marko@example.com" />
        <TextInput required label="Adresa" name="adresa" value={form.adresa} onChange={onChange} placeholder="Ulica i broj, Grad" />
        <TextInput label="Naziv firme" name="firma" value={form.firma} onChange={onChange} placeholder="Naziv firme (opciono)" />
        <TextInput label="PIB" name="pib" value={form.pib} onChange={onChange} placeholder="PIB (opciono)" />
      </div>
    </div>
  )
}

// ─── FORM VARIANTS ──────────────────────────────────────────────────────────

// BROSURE & CASOPISI
function BrosureDetalji({ form, onChange, onSelectChange }: {
  form: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  const obimOptions = [
    { value: '4', label: '4 strane' },
    { value: '8', label: '8 strana' },
    { value: '12', label: '12 strana' },
    { value: '16', label: '16 strana' },
    { value: 'drugi', label: 'Drugi obim' },
  ]

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Detalji</h3>
      <div className="space-y-3">
        <TextInput label="Format" name="format" value={form.format} onChange={onChange} placeholder="npr. A3, A4, custom..." />
        <RadioGroup
          label="Način štampe"
          name="stampa"
          value={form.stampa}
          onChange={onChange}
          options={[
            { value: '1/1', label: '1/1 (crno-belo)' },
            { value: '4/4', label: '4/4 (kolor)' },
          ]}
        />
        <SelectGroup
          label="Obim (broj strana)"
          name="obim"
          value={form.obim}
          onChange={onSelectChange}
          options={obimOptions}
        />
        {form.obim === 'drugi' && (
          <TextInput
            label="Unesite broj strana"
            name="drugiObim"
            value={form.drugiObim}
            onChange={onChange}
            placeholder="npr. 24"
          />
        )}
      </div>
    </div>
  )
}

// PLAKATI & NALEPNICE
function PlakatiDetalji({ form, onChange }: {
  form: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Detalji</h3>
      <div className="space-y-3">
        <TextInput label="Format" name="format" value={form.format} onChange={onChange} placeholder="npr. A3, A4, custom..." />
        <RadioGroup
          label="Način štampe"
          name="stampa"
          value={form.stampa}
          onChange={onChange}
          options={[
            { value: '1/0', label: '1/0 (crno-belo)' },
            { value: '4/0', label: '4/0 (kolor)' },
          ]}
        />
        <TextInput label="Količina" name="kolicina" value={form.kolicina} onChange={onChange} placeholder="Unesite željenu količinu" />
      </div>
    </div>
  )
}

// KNJIGE
function KnjigeDetalji({ form, onChange, onSelectChange }: {
  form: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Detalji</h3>
      <div className="space-y-3">
        <TextInput label="Obim (broj strana)" name="obim" value={form.obim} onChange={onChange} placeholder="npr. 200" />
        <RadioGroup
          label="Način poveza"
          name="povez"
          value={form.povez}
          onChange={onChange}
          options={[
            { value: 'meki', label: 'Meki povez' },
            { value: 'tvrdi', label: 'Tvrdi povez' },
          ]}
        />
        <RadioGroup
          label="Način štampe"
          name="stampa"
          value={form.stampa}
          onChange={onChange}
          options={[
            { value: '1/1', label: '1/1 (crno-belo)' },
            { value: '4/4', label: '4/4 (kolor)' },
            { value: 'kombinovano', label: 'Kombinovano' },
          ]}
        />
        {form.stampa === 'kombinovano' && (
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Strana crno-belo"
              name="stranaCB"
              value={form.stranaCB}
              onChange={onChange}
              placeholder="npr. 150"
            />
            <TextInput
              label="Strana u koloru"
              name="stranaColor"
              value={form.stranaColor}
              onChange={onChange}
              placeholder="npr. 50"
            />
          </div>
        )}
        <RadioGroup
          label="Plastifikacija korica"
          name="plastifikacija"
          value={form.plastifikacija}
          onChange={onChange}
          options={[
            { value: 'mat', label: 'Mat' },
            { value: 'sjaj', label: 'Sjaj' },
          ]}
        />
      </div>
    </div>
  )
}

// DEFAULT (original behavior)
function DefaultDetalji({ form, onChange }: {
  form: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Detalji</h3>
      <div className="space-y-3">
        <TextInput label="Format" name="format" value={form.format} onChange={onChange} placeholder="npr. A3, A4, custom..." />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Način štampe</label>
          <div className="flex gap-3">
            {['jednostrano', 'dvostrano'].map(s => (
              <label
                key={s}
                className={`flex-1 border-2 rounded-xl py-3 text-center text-sm font-semibold cursor-pointer transition capitalize ${
                  form.strana === s ? 'border-[#7E8D67] bg-[#7E8D67]/10 text-[#7E8D67]' : 'border-gray-200 text-gray-500'
                }`}
              >
                <input type="radio" name="strana" value={s} checked={form.strana === s} onChange={onChange} className="sr-only" />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <TextInput label="Količina" name="kolicina" value={form.kolicina} onChange={onChange} placeholder="Unesite željenu količinu" />
      </div>
    </div>
  )
}

// ─── KONTAKT ONLY (blokovska roba, stampa velikog formata) ─────────────────

function KontaktForm({ service, mejl }: { service: Service; mejl: string }) {
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-6 pb-20">
      <div className="bg-white rounded-3xl shadow-md p-8 sm:p-10 text-center border border-gray-100">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className="text-2xl font-bold text-[#222222] mb-3">Kontaktirajte nas</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Za <strong>{service.title}</strong>, molimo Vas da nas kontaktirate direktno putem email-a kako bismo dogovorili sve detalje.
        </p>
        <a
          href={`mailto:${mejl}?subject=Upit - ${encodeURIComponent(service.title)}`}
          className="inline-block mt-6 bg-[#7E8D67] text-white px-10 py-4 rounded-2xl font-semibold text-base hover:opacity-90 transition"
        >
          Pošalji email →
        </a>
        <p className="text-xs text-gray-400 mt-4">{mejl}</p>
      </div>
    </section>
  )
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function OstaleUsluge({ service }: { service: Service }) {
  const variant = getFormVariant(service.slug)

  const [showForm, setShowForm] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState('')

  const [form, setForm] = useState<Record<string, string>>({
    ime: '', telefon: '', mejl: '', adresa: '', firma: '', pib: '',
    // shared detail fields
    format: '', kolicina: '', poruka: '',
    // default
    strana: 'jednostrano',
    // brosure/casopisi
    stampa: '', obim: '', drugiObim: '',
    // knjige
    povez: 'meki', stranaCB: '', stranaColor: '', plastifikacija: 'mat',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
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
      const fileData = await Promise.all(files.map(async (file) => {
        return new Promise<{ name: string; base64: string; type: string }>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve({ name: file.name, base64: (reader.result as string).split(',')[1], type: file.type })
          reader.readAsDataURL(file)
        })
      }))

      // Build detail payload depending on variant
      const detailPayload: Record<string, string> = {}
      if (variant === 'brosure') {
        detailPayload.format = form.format
        detailPayload.stampa = form.stampa
        detailPayload.obim = form.obim === 'drugi' ? form.drugiObim : form.obim
      } else if (variant === 'plakati') {
        detailPayload.format = form.format
        detailPayload.stampa = form.stampa
        detailPayload.kolicina = form.kolicina
      } else if (variant === 'knjige') {
        detailPayload.obim = form.obim
        detailPayload.povez = form.povez
        detailPayload.stampa = form.stampa
        if (form.stampa === 'kombinovano') {
          detailPayload.stranaCB = form.stranaCB
          detailPayload.stranaColor = form.stranaColor
        }
        detailPayload.plastifikacija = form.plastifikacija
      } else {
        detailPayload.format = form.format
        detailPayload.strana = form.strana
        detailPayload.kolicina = form.kolicina
      }

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
          napomena: form.poruka,
          fajlovi: fileData,
          ...detailPayload,
        }),
      })
      setSent(true)
    } catch {
      alert('Greška pri slanju. Pokušajte ponovo.')
    } finally {
      setLoading(false)
    }
  }

  // CONTACT-ONLY variant
  const isKontakt = variant === 'kontakt'

  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6 sm:pt-8">
        <Link href="/stampa" className="text-[#7E8D67] text-sm font-medium hover:underline flex items-center gap-2">
          ← Nazad na štampu
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-5 sm:px-6 py-6 sm:py-12">
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
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Informacije</h3>
              <ul className="space-y-2.5">
                {service.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#7E8D67] flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            {/* CTA button — shown for all variants until form opens or sent */}
            {!showForm && !sent && !isKontakt && (
              <button onClick={() => setShowForm(true)}
                className="w-full sm:w-fit bg-[#7E8D67] text-white px-10 py-4 rounded-2xl text-base font-semibold hover:opacity-90 transition">
                Pošalji upit →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* KONTAKT ONLY */}
      {isKontakt && (
        <KontaktForm service={service} mejl="stampa.dizajn.by.plenti@gmail.com" />
      )}

      {/* FULL FORM */}
      {showForm && !sent && !isKontakt && (
        <section className="max-w-3xl mx-auto px-5 sm:px-6 pb-20">
          <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#222222] mb-1">Upit — {service.title}</h2>
            <p className="text-sm text-gray-400 mb-6">Polja označena sa * su obavezna</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <PersonalData form={form} onChange={handleChange} />

              <hr className="border-gray-100" />

              {variant === 'brosure' && (
                <BrosureDetalji form={form} onChange={handleChange} onSelectChange={handleSelectChange} />
              )}
              {variant === 'plakati' && (
                <PlakatiDetalji form={form} onChange={handleChange} />
              )}
              {variant === 'knjige' && (
                <KnjigeDetalji form={form} onChange={handleChange} onSelectChange={handleSelectChange} />
              )}
              {variant === 'default' && (
                <DefaultDetalji form={form} onChange={handleChange} />
              )}

              <hr className="border-gray-100" />

              <FilesAndMessage
                files={files}
                fileError={fileError}
                poruka={form.poruka}
                onFileChange={handleFileChange}
                onPorukaChange={handleChange}
              />

              <button type="submit" disabled={loading}
                className="w-full bg-[#7E8D67] text-white py-4 rounded-2xl font-semibold text-base hover:opacity-90 transition disabled:opacity-50">
                {loading ? 'Slanje...' : 'Pošalji upit'}
              </button>
            </form>
          </div>
        </section>
      )}

      {sent && (
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pb-20">
          <div className="bg-white rounded-3xl shadow-md p-8 sm:p-10 text-center border border-gray-100">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#222222] mb-2">Upit je poslat!</h2>
            <p className="text-gray-500 text-sm">Javiće se naš tim na <strong>{form.mejl}</strong>.</p>
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
