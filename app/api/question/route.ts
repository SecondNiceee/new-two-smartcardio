import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, phone, email } = await req.json()

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return NextResponse.json({ error: "Telegram env vars not configured" }, { status: 500 })
  }

  const contact = phone ? `Телефон: ${phone}` : `Email: ${email}`

  const message = [
    "📩 *Новый вопрос с сайта СмартКардио*",
    "",
    `*Имя:* ${name || "—"}`,
    contact,
  ].join("\n")

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: `Telegram error: ${err}` }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
