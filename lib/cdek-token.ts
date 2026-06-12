/**
 * CDEK OAuth token manager
 *
 * - Fetches token directly from https://api.cdek.ru/v2/oauth/token (not the proxy)
 * - Persists to token.json on the server filesystem
 * - startTokenRefreshLoop() runs every 30 minutes at server startup
 * - readToken() is called by every API route to get the current token
 */

import fs from "fs"
import path from "path"

const TOKEN_FILE = path.join(process.cwd(), "token.json")

/** Auth endpoint — taken from CDEK_AUTH_URL env var */
const CDEK_AUTH_URL = `${process.env.CDEK_AUTH_URL ?? "https://api.cdek.ru/v2"}/oauth/token`

interface TokenData {
  access_token: string
  expires_at: number // unix ms
}

function writeToken(data: TokenData) {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(data), "utf-8")
}

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
    const url = `${CDEK_AUTH_URL}?grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`[cdek-token] Auth failed ${res.status}: ${text}`)
      return
    }

    const data = (await res.json()) as { access_token: string; expires_in: number }

    writeToken({
      access_token: data.access_token,
      expires_at: Date.now() + data.expires_in * 1000,
    })

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
