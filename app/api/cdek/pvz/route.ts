import { NextRequest, NextResponse } from "next/server"
import { getPvzList } from "@/lib/cdek"

export async function GET(req: NextRequest) {
  const regionCode = Number(req.nextUrl.searchParams.get("region_code") ?? "0")
  if (!regionCode) {
    return NextResponse.json({ error: "region_code is required" }, { status: 400 })
  }
  try {
    const pvz = await getPvzList(regionCode)
    return NextResponse.json(pvz)
  } catch (err) {
    console.error("[cdek/pvz]", err)
    return NextResponse.json(
      { error: "Не удалось загрузить пункты выдачи" },
      { status: 500 },
    )
  }
}
