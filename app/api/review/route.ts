import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, serial, date, email, text, rating } = body

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT ?? 25)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.REVIEW_EMAIL_TO
    const from = process.env.SMTP_FROM ?? (user ?? "noreply@smartcardio.ru")

    if (!host || !to) {
      return NextResponse.json({ error: "SMTP env vars not configured" }, { status: 500 })
    }

    // Порт 465 = implicit SSL (secure: true)
    // Порт 587 = STARTTLS (secure: false + requireTLS: true)
    // SMTP_SECURE=true форсирует implicit SSL независимо от порта
    // SMTP_SECURE=false форсирует plain (без шифрования)
    const smtpSecureEnv = process.env.SMTP_SECURE
    const secure =
      smtpSecureEnv === "true" ? true
      : smtpSecureEnv === "false" ? false
      : port === 465

    // STARTTLS нужен только на порту 587 (или явно не задан secure и порт не 465)
    const requireTLS = !secure && port === 587
    const ignoreTLS = !secure && !requireTLS

    const auth = user && pass ? { user, pass } : undefined

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
      requireTLS,
      ignoreTLS,
      tls: {
        // Не отклонять self-signed сертификаты
        rejectUnauthorized: false,
      },
    })

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating)

    const info = await transporter.sendMail({
      from: `"СмартКардио сайт" <${from}>`,
      to,
      subject: `Новый отзыв от ${name || "Аноним"} — ${stars}`,
      text: [
        `Оценка: ${stars} (${rating}/5)`,
        `Имя: ${name || "—"}`,
        `Email: ${email}`,
        `Серийный номер: ${serial}`,
        `Дата покупки: ${date}`,
        ``,
        `Отзыв:`,
        text,
      ].join("\n"),
      html: `
        <h2>Новый отзыв с сайта СмартКардио</h2>
        <p><b>Оценка:</b> ${stars} (${rating}/5)</p>
        <p><b>Имя:</b> ${name || "—"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Серийный номер:</b> ${serial}</p>
        <p><b>Дата покупки:</b> ${date}</p>
        <hr/>
        <p><b>Отзыв:</b></p>
        <p style="white-space:pre-wrap">${text}</p>
      `,
    })

    console.log("[review] Mail sent OK:", { messageId: info.messageId, response: info.response })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[review] Unhandled error:", err)
    return NextResponse.json(
      {
        error: "Failed to send review",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    )
  }
}
