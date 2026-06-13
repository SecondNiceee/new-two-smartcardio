import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  console.log("[v0][review] POST /api/review received")

  try {
    const body = await req.json()
    const { name, serial, date, email, text, rating } = body
    console.log("[v0][review] payload:", {
      name,
      serial,
      date,
      email,
      rating,
      textLength: typeof text === "string" ? text.length : 0,
    })
  console.log("[v0][review] POST /api/review received")

  try {
    const body = await req.json()
    const { name, serial, date, email, text, rating } = body
    console.log("[v0][review] payload:", {
      name,
      serial,
      date,
      email,
      rating,
      textLength: typeof text === "string" ? text.length : 0,
    })

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT ?? 25)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.REVIEW_EMAIL_TO
    const from = process.env.SMTP_FROM ?? (user ?? "noreply@smartcardio.ru")

    console.log("[v0][review] SMTP config:", {
      host,
      port,
      hasUser: Boolean(user),
      hasPass: Boolean(pass),
      to,
      from,
      SMTP_SECURE: process.env.SMTP_SECURE,
    })

    if (!host || !to) {
      console.error("[v0][review] Missing SMTP env vars — host:", host, "to:", to)
      return NextResponse.json({ error: "SMTP env vars not configured" }, { status: 500 })
    }
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT ?? 25)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.REVIEW_EMAIL_TO
    const from = process.env.SMTP_FROM ?? (user ?? "noreply@smartcardio.ru")

    console.log("[v0][review] SMTP config:", {
      host,
      port,
      hasUser: Boolean(user),
      hasPass: Boolean(pass),
      to,
      from,
      SMTP_SECURE: process.env.SMTP_SECURE,
    })

    if (!host || !to) {
      console.error("[v0][review] Missing SMTP env vars — host:", host, "to:", to)
      return NextResponse.json({ error: "SMTP env vars not configured" }, { status: 500 })
    }

    // SMTP_SECURE: "true" = всегда SSL (порт 465), "false" или не задано при порте != 465 = без SSL/TLS
    const secure =
      process.env.SMTP_SECURE === "true" ? true
      : process.env.SMTP_SECURE === "false" ? false
    // SMTP_SECURE: "true" = всегда SSL (порт 465), "false" или не задано при порте != 465 = без SSL/TLS
    const secure =
      process.env.SMTP_SECURE === "true" ? true
      : process.env.SMTP_SECURE === "false" ? false
      : port === 465

    // Если соединение не зашифровано — полностью запрещаем STARTTLS-апгрейд
    const ignoreTLS = !secure
    const requireTLS = false

    // If SMTP_USER and SMTP_PASS are set — use auth (standard relay).
    // If not set — open relay mode (no auth).
    const auth = user && pass ? { user, pass } : undefined

    console.log("[v0][review] transport options:", {
      secure,
      ignoreTLS,
      requireTLS,
      authMode: auth ? "auth" : "open-relay",
    })

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
      ignoreTLS,
      requireTLS,
    })

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating)
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

    console.log("[v0][review] Mail sent OK:", { messageId: info.messageId, response: info.response })
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

    console.log("[v0][review] Mail sent OK:", { messageId: info.messageId, response: info.response })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[v0][review] Unhandled error:", err)
    return NextResponse.json(
      {
        error: "Failed to send review",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    )
  }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[v0][review] Unhandled error:", err)
    return NextResponse.json(
      {
        error: "Failed to send review",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    )
  }
}
