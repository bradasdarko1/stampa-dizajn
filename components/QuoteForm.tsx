'use client'

import { useState } from 'react'

export default function QuoteModal({
  service,
  buttonText,
  hasOptions,
}: {
  service: string
  buttonText: string
  hasOptions?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      service,
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      quantity: formData.get('quantity'),
      printType: formData.get('printType'),
      format: formData.get('format'),
      description: formData.get('description'),
    }

    try {
      await fetch('/api/ponuda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSent(true)
    } catch (err) {
      alert('Greška pri slanju. Pokušajte ponovo.')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setOpen(false)
    setSent(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#7E8D67] text-white px-6 py-3 rounded-xl"
      >
        {buttonText}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleClose} // klik na overlay zatvara
        >
          <div
            className="bg-white w-full max-w-lg p-6 rounded-2xl space-y-4 relative"
            onClick={(e) => e.stopPropagation()} // sprečava zatvaranje kad klikneš unutra
          >
            {/* X dugme */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {sent ? (
              // Success state
              <div className="text-center py-8 space-y-3">
                <div className="text-4xl">✅</div>
                <h2 className="text-xl font-bold">Upit je poslat!</h2>
                <p className="text-gray-500">Javićemo vam se u najkraćem roku.</p>
                <button
                  onClick={handleClose}
                  className="mt-4 bg-[#7E8D67] text-white px-6 py-3 rounded-xl"
                >
                  Zatvori
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold pr-6">{service}</h2>

                <input
                  name="fullName"
                  placeholder="Ime i prezime *"
                  required
                  className="w-full border p-3 rounded"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  className="w-full border p-3 rounded"
                />
                <input
                  name="phone"
                  placeholder="Telefon *"
                  required
                  className="w-full border p-3 rounded"
                />
                <input
                  name="quantity"
                  placeholder="Količina"
                  className="w-full border p-3 rounded"
                />

                {hasOptions && (
                  <select name="printType" className="w-full border p-3 rounded">
                    <option>Jednostrano</option>
                    <option>Dvostrano</option>
                  </select>
                )}

                <input
                  name="format"
                  placeholder="Format (A4, A5...)"
                  className="w-full border p-3 rounded"
                />
                <textarea
                  name="description"
                  placeholder="Opis"
                  className="w-full border p-3 rounded"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full border p-3 rounded hover:bg-gray-50"
                  >
                    Zatvori
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#7E8D67] text-white p-3 rounded disabled:opacity-60"
                  >
                    {loading ? 'Slanje...' : 'Pošalji'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}