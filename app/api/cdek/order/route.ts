import { NextRequest, NextResponse } from "next/server"
import { createOrder, type CdekOrderRequest } from "@/lib/cdek"

export async function POST(req: NextRequest) {
  let body: CdekOrderRequest
  try {
    body = (await req.json()) as CdekOrderRequest
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 })
  }

  // Basic validation — either delivery_point (PVZ) or to_location (courier) must be present
  if ((!body.delivery_point && !body.to_location) || !body.recipient?.phones?.length || !body.packages?.length) {
    return NextResponse.json(
      { error: "Не переданы обязательные поля: delivery_point или to_location, recipient.phones, packages" },
      { status: 422 },
    )
  }

  try {
    const result = await createOrder(body)
    const hasErrors = result.requests?.some((r) => r.errors?.length)
    if (hasErrors) {
      const msgs = result.requests
        ?.flatMap((r) => r.errors ?? [])
        .map((e) => e.message)
        .join("; ")
      return NextResponse.json({ error: msgs }, { status: 422 })
    }
    return NextResponse.json({ uuid: result.entity?.uuid })
  } catch (err) {
    console.error("[cdek/order]", err)
    return NextResponse.json(
      { error: "Не удалось создать заказ в СДЭК" },
      { status: 500 },
    )
  }
}
