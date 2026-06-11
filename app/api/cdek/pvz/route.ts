import { NextRequest, NextResponse } from "next/server"
import { getPvzList } from "@/lib/cdek"

export async function GET(req: NextRequest) {
  const cityCode = Number(req.nextUrl.searchParams.get("city_code") ?? "44")
  try {
    const pvz = await getPvzList(cityCode)
    return NextResponse.json(pvz)
  } catch (err) {
    console.error("[cdek/pvz]", err)
    return NextResponse.json(
      { error: "Не удалось загрузить пункты выдачи" },
      { status: 500 },
    )
  }
}
