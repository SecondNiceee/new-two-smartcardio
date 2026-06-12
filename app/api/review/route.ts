import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { name, serial, date, email, text, rating } = await req.json()

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 25)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.REVIEW_EMAIL_TO
  const from = process.env.SMTP_FROM ?? (user ?? "noreply@smartcardio.ru")

  if (!host || !to) {
    return NextResponse.json({ error: "SMTP env vars not configured" }, { status: 500 })
  }

  // SMTP_SECURE: "true" = всегда SSL, "false" = полностью без SSL/TLS, не задано = SSL только на порту 465
  const secureExplicitlyOff = process.env.SMTP_SECURE === "false"
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465

  // If SMTP_USER and SMTP_PASS are set — use auth (standard relay).
  // If not set — open relay mode (no auth).
  const auth = user && pass ? { user, pass } : undefined

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
    // Когда SSL явно выключен — запрещаем nodemailer'у апгрейдить соединение до STARTTLS
    ...(secureExplicitlyOff ? { ignoreTLS: true, requireTLS: false } : {}),
  })

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating)

  await transporter.sendMail({
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

  return NextResponse.json({ ok: true })
}
