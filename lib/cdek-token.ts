/**
 * CDEK OAuth token manager
 *
 * - Fetches token directly from the proxy (CDEK_BASE_URL)
 * - Stores token on disk in token.json (process.cwd())
 * - startTokenRefreshLoop() runs every 30 minutes at server startup
 * - readToken() is called by every API route to get the current token
 */

import fs from "fs"
import path from "path"

const TOKEN_FILE = path.join(process.cwd(), "token.json")

/** CDEK auth endpoint — built from CDEK_BASE_URL env var */
const CDEK_AUTH_URL = `${process.env.CDEK_BASE_URL ?? "https://lk.smartcardio.ru/cdek"}/v2/oauth/token`

interface TokenData {
  access_token: string
  expires_at: number // unix ms
}

/** Read the current token synchronously from disk */
export function readToken(): string {
  try {
    const raw = fs.readFileSync(TOKEN_FILE, "utf-8")
    const data = JSON.parse(raw) as TokenData
    return data.access_token
  } catch {
    throw new Error("CDEK token not available — server may still be initialising")
  }
}

async function fetchAndSaveToken() {
  const clientId = process.env.CDEK_CLIENT_ID
  const clientSecret = process.env.CDEK_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.error("[cdek-token] Missing CDEK_CLIENT_ID or CDEK_CLIENT_SECRET")
    return
  }

  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    })

    const res = await fetch(CDEK_AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`[cdek-token] Auth failed ${res.status}: ${text}`)
      return
    }

    const data = (await res.json()) as { access_token: string; expires_in: number }

    const tokenData: TokenData = {
      access_token: data.access_token,
      expires_at: Date.now() + data.expires_in * 1000,
    }

    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2), "utf-8")

    console.log("[cdek-token] Token refreshed successfully")
  } catch (err) {
    console.error("[cdek-token] Error fetching token:", err)
  }
}

const REFRESH_INTERVAL_MS = 30 * 60 * 1000 // 30 minutes

export function startTokenRefreshLoop() {
  // Fetch immediately on start
  fetchAndSaveToken()

  // Then repeat every 30 minutes
  setInterval(fetchAndSaveToken, REFRESH_INTERVAL_MS)

  console.log("[cdek-token] Token refresh loop started (every 30 min)")
}
