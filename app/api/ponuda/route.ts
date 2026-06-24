import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length)

    const body = await req.json()
    const { usluga, ime, kontakt, mejl, adresa, firma, pib, kolicina, format, strana, napomena, fajlovi } = body

    const attachments = (fajlovi || []).map((f: { name: string; base64: string; type: string }) => ({
      filename: f.name,
      content: f.base64,
      contentType: f.type,
    }))

    const result = await resend.emails.send({
      from: 'Web porudzbina <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || process.env.EMAIL_USER || '',
      subject: `Nova ponuda: ${usluga} — ${ime}`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
          <div style="background: #7E8D67; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nova porudzbina / upit</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">Usluga: <strong>${usluga}</strong></p>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width:100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888; width: 40%;">Ime i prezime</td>
                <td style="padding: 10px 0; font-weight: 600;">${ime || '-'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Telefon</td>
                <td style="padding: 10px 0; font-weight: 600;">${kontakt || '-'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Email</td>
                <td style="padding: 10px 0; font-weight: 600;">${mejl || '-'}</td>
              </tr>
              ${adresa ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Adresa</td>
                <td style="padding: 10px 0; font-weight: 600;">${adresa}</td>
              </tr>` : ''}
              ${firma ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Firma</td>
                <td style="padding: 10px 0; font-weight: 600;">${firma}</td>
              </tr>` : ''}
              ${pib ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">PIB</td>
                <td style="padding: 10px 0; font-weight: 600;">${pib}</td>
              </tr>` : ''}
              ${kolicina && kolicina !== '-' ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Kolicina</td>
                <td style="padding: 10px 0; font-weight: 600;">${kolicina}</td>
              </tr>` : ''}
              ${format ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Format</td>
                <td style="padding: 10px 0; font-weight: 600;">${format}</td>
              </tr>` : ''}
              ${strana && strana !== '-' ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Stampa</td>
                <td style="padding: 10px 0; font-weight: 600;">${strana}</td>
              </tr>` : ''}
              ${napomena ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888; vertical-align: top;">Napomena</td>
                <td style="padding: 10px 0;">${napomena}</td>
              </tr>` : ''}
              ${fajlovi && fajlovi.length > 0 ? `<tr>
                <td style="padding: 10px 0; color: #888; vertical-align: top;">Fajlovi</td>
                <td style="padding: 10px 0;">${fajlovi.map((f: { name: string }) => f.name).join(', ')}</td>
              </tr>` : ''}
            </table>
          </div>
        </div>
      `,
    })

    console.log('RESEND RESULT:', JSON.stringify(result))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('MAIL ERROR:', JSON.stringify(error, null, 2))
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}