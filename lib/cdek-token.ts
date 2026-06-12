/**
 * CDEK OAuth token manager
 *
 * - Fetches token directly from the proxy (CDEK_BASE_URL)
 * - Stores token in memory (no fs dependency — compatible with Turbopack/Edge)
 * - startTokenRefreshLoop() runs every 30 minutes at server startup
 * - readToken() is called by every API route to get the current token
 */

/** CDEK auth endpoint — built from CDEK_BASE_URL env var */
const CDEK_AUTH_URL = `${process.env.CDEK_BASE_URL ?? "https://lk.smartcardio.ru"}/cdek/v2/oauth/token`

interface TokenData {
  access_token: string
  expires_at: number // unix ms
}

// In-memory token store (lives for the lifetime of the server process)
let tokenData: TokenData | null = null

// Promise that resolves once the first token fetch completes
let initialTokenPromise: Promise<void> | null = null

export async function getToken(): Promise<string> {
  if (!tokenData && initialTokenPromise) {
    await initialTokenPromise
  }
  if (!tokenData) {
    throw new Error("CDEK token not available — check CDEK_CLIENT_ID / CDEK_CLIENT_SECRET")
  }
  return tokenData.access_token
}

/** @deprecated use getToken() instead */
export function readToken(): string {
  if (!tokenData) {
    throw new Error("CDEK token not available — server may still be initialising")
  }
  return tokenData.access_token
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

    tokenData = {
      access_token: data.access_token,
      expires_at: Date.now() + data.expires_in * 1000,
    }

    console.log("[cdek-token] Token refreshed successfully")
  } catch (err) {
    console.error("[cdek-token] Error fetching token:", err)
  }
}

const REFRESH_INTERVAL_MS = 30 * 60 * 1000 // 30 minutes

export function startTokenRefreshLoop() {
  // Fetch immediately on start; store promise so getToken() can await it
  initialTokenPromise = fetchAndSaveToken().finally(() => {
    initialTokenPromise = null
  })

  // Then repeat every 30 minutes
  setInterval(fetchAndSaveToken, REFRESH_INTERVAL_MS)

  console.log("[cdek-token] Token refresh loop started (every 30 min)")
}
