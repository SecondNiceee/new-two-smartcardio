/**
 * CDEK OAuth token manager (lazy, in-memory)
 *
 * - getToken() lazily fetches an OAuth token on first use and caches it in memory
 * - Token is refreshed automatically when it is missing or about to expire
 * - On auth failure the cache stays empty, so the NEXT request retries cleanly
 *   (no server restart required after fixing env vars)
 */

/** CDEK auth endpoint — built from CDEK_BASE_URL env var
 *  CDEK_BASE_URL must include the /cdek path prefix for the proxy,
 *  e.g. https://lk.smartcardio.ru/cdek — or the direct API host, e.g. https://api.edu.cdek.ru
 */
function authUrl(): string {
  const base = process.env.CDEK_BASE_URL ?? "https://lk.smartcardio.ru/cdek"
  return `${base.replace(/\/+$/, "")}/v2/oauth/token`
}

interface TokenData {
  access_token: string
  expires_at: number // unix ms
}

let cached: TokenData | null = null
let inflight: Promise<string> | null = null

/** Refresh 60s before actual expiry to avoid edge-of-expiry 401s */
const EXPIRY_SKEW_MS = 60 * 1000

async function fetchToken(): Promise<string> {
  const clientId = process.env.CDEK_CLIENT_ID
  const clientSecret = process.env.CDEK_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("[cdek-token] Missing CDEK_CLIENT_ID or CDEK_CLIENT_SECRET")
  }

  const searchParams = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  })

  const url = authUrl()
  const res = await fetch(`${url}?${searchParams}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`[cdek-token] Auth failed ${res.status} at ${url}: ${text}`)
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }

  cached = {
    access_token: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
  }

  console.log("[cdek-token] Token refreshed successfully")
  return cached.access_token
}

/**
 * Get a valid CDEK access token.
 * Returns the cached token if still valid, otherwise fetches a fresh one.
 * Concurrent callers share a single in-flight request.
 */
export async function getToken(): Promise<string> {
  if (cached && Date.now() < cached.expires_at - EXPIRY_SKEW_MS) {
    return cached.access_token
  }

  if (inflight) return inflight

  inflight = fetchToken().finally(() => {
    inflight = null
  })

  return inflight
}

/** Optional warmup at server startup — failures are non-fatal (lazy retry covers it) */
export function startTokenRefreshLoop() {
  getToken().catch((err) => {
    console.error("[cdek-token] Initial token warmup failed (will retry on demand):", err)
  })
}
