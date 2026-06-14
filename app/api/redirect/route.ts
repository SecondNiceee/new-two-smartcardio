import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

const ALLOWED_DESTINATIONS: Record<string, string> = {
  testflight: "https://testflight.apple.com/join/ku8iGLOm",
  googleplay: "https://play.google.com/store/apps/details?id=com.arytmed.smartcardio",
  rustore: "https://www.rustore.ru/catalog/app/com.arytmed.smartcardio",
  appgallery: "https://appgallery.huawei.com/app/C111299787",
}

const DOWNLOADABLE_FILES: Record<string, { filePath: string; fileName: string; contentType: string }> = {
  iphone_manual: {
    filePath: path.join(process.cwd(), "public", "videos", "iphone_manual.mp4"),
    fileName: "iphone_manual.mp4",
    contentType: "video/mp4",
  },
}

export async function GET(request: NextRequest) {
  const to = request.nextUrl.searchParams.get("to")

  if (!to) {
    return NextResponse.json({ error: "Unknown destination" }, { status: 400 })
  }

  // Downloadable files — served directly with Content-Disposition: attachment
  if (DOWNLOADABLE_FILES[to]) {
    const { filePath, fileName, contentType } = DOWNLOADABLE_FILES[to]
    try {
      const fileBuffer = await readFile(filePath)
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${fileName}"`,
          "Content-Length": String(fileBuffer.byteLength),
        },
      })
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }
  }

  // External redirects
  if (!ALLOWED_DESTINATIONS[to]) {
    return NextResponse.json({ error: "Unknown destination" }, { status: 400 })
  }

  return NextResponse.redirect(ALLOWED_DESTINATIONS[to])
}
