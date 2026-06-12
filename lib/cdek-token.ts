/**
 * CDEK OAuth token manager
 *
 * - Fetches token from the proxy (CDEK_BASE_URL)
 * - Caches the token in memory AND on disk (token.json in process.cwd())
 * - getToken() is async and fetches on-demand if the cached token is missing
 *   or expired. This makes the system resilient to:
 *     • env vars being added after server startup (no restart needed)
 *     • the background refresh loop not having run yet
 * - startTokenRefreshLoop() still runs at startup to keep the token warm
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

/** In-memory cache (survives between requests in the same server process) */
let memoryToken: TokenData | null = null

/** Refresh a little before the real expiry to avoid edge-of-expiry failures */
const EXPIRY_SKEW_MS = 60 * 1000 // 1 minute

function isValid(token: TokenData | null): token is TokenData {
  return !!token && token.expires_at - EXPIRY_SKEW_MS > Date.now()
}

/** Try to load a still-valid token from disk into memory */
function loadFromDisk(): TokenData | null {
  try {
    const raw = fs.readFileSync(TOKEN_FILE, "utf-8")
    return JSON.parse(raw) as TokenData
  } catch {
    return null
  }
}

/** Fetch a fresh token from CDEK and persist it (memory + disk) */
async function fetchToken(): Promise<TokenData> {
  const clientId = process.env.CDEK_CLIENT_ID
  const clientSecret = process.env.CDEK_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error(
      "CDEK_CLIENT_ID / CDEK_CLIENT_SECRET не заданы в переменных окружения",
    )
  }

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
    throw new Error(`[cdek-token] Auth failed ${res.status}: ${text}`)
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }

  const tokenData: TokenData = {
    access_token: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
  }

  memoryToken = tokenData
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2), "utf-8")
  } catch {
    // disk write is best-effort; memory cache is the source of truth
  }

  console.log("[cdek-token] Token refreshed successfully")
  return tokenData
}

/** Deduplicate concurrent fetches so a burst of requests triggers one auth call */
let inflight: Promise<TokenData> | null = null

/**
 * Get a valid access token, fetching a new one on demand if needed.
 * This is the function API routes should use.
 */
export async function getToken(): Promise<string> {
  // 1. Valid token in memory?
  if (isValid(memoryToken)) return memoryToken.access_token

  // 2. Valid token on disk? (e.g. written by another process / previous run)
  const fromDisk = loadFromDisk()
  if (isValid(fromDisk)) {
    memoryToken = fromDisk
    return fromDisk.access_token
  }

  // 3. Fetch a new one (deduplicated)
  if (!inflight) {
    inflight = fetchToken().finally(() => {
      inflight = null
    })
  }
  const fresh = await inflight
  return fresh.access_token
}

/**
 * @deprecated Use the async getToken() instead. Kept for backwards-compat:
 * returns whatever is currently cached, throwing if nothing is available.
 */
export function readToken(): string {
  if (isValid(memoryToken)) return memoryToken.access_token
  const fromDisk = loadFromDisk()
  if (isValid(fromDisk)) {
    memoryToken = fromDisk
    return fromDisk.access_token
  }
  throw new Error("CDEK token not available — call getToken() instead")
}

const REFRESH_INTERVAL_MS = 30 * 60 * 1000 // 30 minutes

export function startTokenRefreshLoop() {
  // Warm the token at startup (best-effort — failure is fine, getToken() retries on demand)
  fetchToken().catch((err) => {
    console.error("[cdek-token]", err instanceof Error ? err.message : err)
  })

  // Then refresh periodically
  setInterval(() => {
    fetchToken().catch((err) => {
      console.error("[cdek-token]", err instanceof Error ? err.message : err)
    })
  }, REFRESH_INTERVAL_MS)

  console.log("[cdek-token] Token refresh loop started (every 30 min)")
}
