import { NextRequest, NextResponse } from "next/server"

const ALLOWED_DESTINATIONS: Record<string, string> = {
  testflight: "https://testflight.apple.com/join/ku8iGLOm",
  googleplay: "https://play.google.com/store/apps/details?id=com.arytmed.smartcardio",
  rustore: "https://www.rustore.ru/catalog/app/com.arytmed.smartcardio",
  appgallery: "https://appgallery.huawei.com/app/C111299787",
}

export function GET(request: NextRequest) {
  const to = request.nextUrl.searchParams.get("to")

  if (!to || !ALLOWED_DESTINATIONS[to]) {
    return NextResponse.json({ error: "Unknown destination" }, { status: 400 })
  }

  return NextResponse.redirect(ALLOWED_DESTINATIONS[to])
}
