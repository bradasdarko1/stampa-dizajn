'use client'

import { useState } from 'react'

export default function PonudaPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      quantity: formData.get('quantity'),
      format: formData.get('format'),
      description: formData.get('description'),
    }

    const res = await fetch('/api/ponuda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      alert('Upit je uspešno poslat.')
      e.currentTarget.reset()
    } else {
      alert('Greška prilikom slanja.')
    }

    setLoading(false)
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-8">
        Zatražite ponudu
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          name="fullName"
          placeholder="Ime i prezime"
          required
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="phone"
          placeholder="Broj telefona"
          required
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="service"
          placeholder="Vrsta usluge (vizit karte, flajeri...)"
          required
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="quantity"
          placeholder="Količina"
          required
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="format"
          placeholder="Format (A4, A5, 85x55mm...)"
          required
          className="w-full border p-4 rounded-xl"
        />

        <textarea
          name="description"
          rows={6}
          placeholder="Detaljan opis posla"
          required
          className="w-full border p-4 rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7E8D67] text-white px-8 py-4 rounded-xl"
        >
          {loading ? 'Slanje...' : 'Pošalji upit'}
        </button>
      </form>
    </main>
  )
}
