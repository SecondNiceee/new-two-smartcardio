import { NextRequest, NextResponse } from "next/server"
import { calcDelivery } from "@/lib/cdek"

export async function GET(req: NextRequest) {
  const toCityCode = Number(req.nextUrl.searchParams.get("city_code") ?? "44")
  try {
    const tariffs = await calcDelivery(toCityCode)
    return NextResponse.json(tariffs)
  } catch (err) {
    console.error("[cdek/calc]", err)
    return NextResponse.json(
      { error: "Не удалось рассчитать стоимость доставки" },
      { status: 500 },
    )
  }
}
