/**
 * CDEK API v2 client
 * Docs: https://api-docs.cdek.ru/
 *
 * Sandbox base URL: https://api.edu.cdek.ru/v2
 * Production base URL: https://api.cdek.ru/v2
 */

const CDEK_BASE_URL = "https://api.edu.cdek.ru/v2"

function getEnv() {
  const CLIENT_ID = process.env.CDEK_CLIENT_ID
  const CLIENT_SECRET = process.env.CDEK_CLIENT_SECRET

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing CDEK env vars: CDEK_CLIENT_ID, CDEK_CLIENT_SECRET")
  }
  return { BASE_URL: CDEK_BASE_URL, CLIENT_ID, CLIENT_SECRET }
}

// ─── Token cache (in-process, single-instance) ───────────────────────────────

let tokenCache: { token: string; expiresAt: number } | null = null

export async function getCdekToken(): Promise<string> {
  const { BASE_URL, CLIENT_ID, CLIENT_SECRET } = getEnv()
  const now = Date.now()
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.token
  }

  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`CDEK auth error ${res.status}: ${text}`)
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }
  tokenCache = {
    token: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  }
  return tokenCache.token
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CdekPvz {
  code: string
  name: string
  location: {
    city: string
    address: string
    address_full: string
    latitude: number
    longitude: number
  }
  work_time: string
  phones?: { number: string }[]
  type: string
}

export interface CdekCalcResult {
  tariff_code: number
  tariff_name: string
  delivery_sum: number
  period_min: number
  period_max: number
}

export interface CdekOrderRequest {
  tariff_code: number
  delivery_point: string        // PVZ code
  sender: {
    name: string
    phones: { number: string }[]
  }
  recipient: {
    name: string
    phones: { number: string }[]
    email?: string
  }
  packages: {
    number: string
    weight: number              // grams
    length: number              // cm
    width: number               // cm
    height: number              // cm
    items?: {
      name: string
      ware_key: string
      payment: { value: number }
      cost: number
      weight: number
      amount: number
    }[]
  }[]
  comment?: string
}

export interface CdekOrderResponse {
  entity?: { uuid: string }
  requests?: { state: string; errors?: { code: string; message: string }[] }[]
}

// ─── API helpers ─────────────────────────────────────────────────────────────

async function cdekFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const { BASE_URL } = getEnv()
  const token = await getCdekToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`CDEK ${path} error ${res.status}: ${text}`)
  }

  return res.json() as Promise<T>
}

export interface CdekCity {
  city: string
  sub_region: string
  region: string
  country: string
  city_code: number
  region_code: number
}

/** Autocomplete cities by name query */
export async function suggestCities(name: string): Promise<CdekCity[]> {
  const { BASE_URL } = getEnv()
  const token = await getCdekToken()
  const res = await fetch(
    `${BASE_URL}/location/suggest/cities?name=${encodeURIComponent(name)}&country_codes=RU`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  )
  if (!res.ok) {
    const text = await res.text()
    console.error("[cdek suggestCities] error", res.status, text)
    return []
  }
  const raw = await res.json()
  console.log("[cdek suggestCities] raw response:", JSON.stringify(raw).slice(0, 300))
  // CDEK may return array directly or wrapped in a field
  if (Array.isArray(raw)) return raw
  if (raw && Array.isArray(raw.cities)) return raw.cities
  if (raw && Array.isArray(raw.data)) return raw.data
  return []
}

/** List delivery offices (PVZ) filtered by region code */
export async function getPvzList(regionCode: number): Promise<CdekPvz[]> {
  const data = await cdekFetch<CdekPvz[]>(
    `/deliverypoints?region_code=${regionCode}&type=PVZ&is_handout=true`,
  )
  return data
}

/** Calculate delivery cost for all available tariffs */
export async function calcDelivery(
  fromCityCode: number,
  toCityCode: number,
  weight: number = 500,
): Promise<CdekCalcResult[]> {
  const body = {
    date: new Date().toISOString(),
    type: 1,
    from_location: { code: fromCityCode },
    to_location: { code: toCityCode },
    packages: [{ weight, length: 20, width: 15, height: 5 }],
  }
  const data = await cdekFetch<{ tariff_codes?: CdekCalcResult[] }>(
    "/calculator/tarifflist",
    { method: "POST", body: JSON.stringify(body) },
  )
  return data.tariff_codes ?? []
}

/** Create an order */
export async function createOrder(
  payload: CdekOrderRequest,
): Promise<CdekOrderResponse> {
  return cdekFetch<CdekOrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
