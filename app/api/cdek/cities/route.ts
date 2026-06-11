import { NextRequest, NextResponse } from "next/server"
import { suggestCities } from "@/lib/cdek"

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") ?? ""
  if (!name.trim()) {
    return NextResponse.json([])
  }
  try {
    const cities = await suggestCities(name)
    return NextResponse.json(cities)
  } catch (err) {
    console.error("[cdek/cities]", err)
    return NextResponse.json(
      { error: "Не удалось загрузить список городов" },
      { status: 500 },
    )
  }
}
