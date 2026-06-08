import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { usluga, ime, kontakt, mejl, adresa, firma, pib, format, strana, kolicina, napomena, fajlovi } = body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Attachments iz base64
    const attachments = (fajlovi || []).map((f: { name: string; base64: string; type: string }) => ({
      filename: f.name,
      content: f.base64,
      encoding: 'base64',
      contentType: f.type,
    }))

    const row = (label: string, value: string) => value ? `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 0; color: #888; width: 40%;">${label}</td>
        <td style="padding: 10px 0; font-weight: 600;">${value}</td>
      </tr>` : ''

    await transporter.sendMail({
      from: `"Web porudzbina" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nova porudzbina: ${usluga} — ${ime}`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
          <div style="background: #7E8D67; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nova porudzbina</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">Usluga: <strong>${usluga}</strong></p>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">

            <p style="font-size: 13px; font-weight: 600; color: #7E8D67; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Podaci o kupcu</p>
            <table style="width:100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              ${row('Ime i prezime', ime)}
              ${row('Telefon', kontakt)}
              ${row('Email', mejl)}
              ${row('Adresa', adresa)}
              ${row('Naziv firme', firma)}
              ${row('PIB', pib)}
            </table>

            <p style="font-size: 13px; font-weight: 600; color: #7E8D67; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Detalji porudzbine</p>
            <table style="width:100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              ${row('Format', format)}
              ${row('Nacin stampe', strana)}
              ${row('Kolicina', kolicina)}
            </table>

            ${napomena ? `
            <p style="font-size: 13px; font-weight: 600; color: #7E8D67; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Poruka</p>
            <p style="font-size: 14px; color: #444; background: #f9f9f7; padding: 12px 16px; border-radius: 8px;">${napomena}</p>
            ` : ''}

            ${attachments.length > 0 ? `
            <p style="font-size: 13px; font-weight: 600; color: #7E8D67; text-transform: uppercase; letter-spacing: 1px; margin-top: 24px; margin-bottom: 4px;">Prilozeni fajlovi</p>
            <p style="font-size: 13px; color: #888;">${attachments.map((a: {filename: string}) => a.filename).join(', ')}</p>
            ` : ''}
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}