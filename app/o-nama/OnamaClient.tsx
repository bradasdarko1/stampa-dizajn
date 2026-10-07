'use client'

import { useState } from 'react'

export default function OnamaClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    ime: '',
    kontakt: '',
    mejl: '',
    opis: '',
  })

  // ostatak postojećeg koda...
}