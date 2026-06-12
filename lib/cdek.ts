/**
 * CDEK API v2 client
 * Docs: https://api-docs.cdek.ru/
 *
 * Proxy base URL: https://lk.smartcardio.ru/cdek/v2
 * Token is managed by lib/cdek-token.ts (file-based, refreshed every 30 min)
 */

import { readToken } from "@/lib/cdek-token"

const CDEK_BASE_URL = `${process.env.CDEK_BASE_URL ?? "https://lk.smartcardio.ru"}/cdek/v2`

/** Commission charged by CDEK on the payment value (6%) */
export const CDEK_COMMISSION = 0.06

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CdekPvz {
  code: string
  name: string
  nearest_station?: string
  nearest_metro_station?: string
  address_comment?: string
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
  /** PVZ code — required for PVZ delivery (tariff 136) */
  delivery_point?: string
  /** Destination — used for courier delivery (tariff 137) */
  to_location?: { code: number; address?: string }
  /** Объявленная ценность отправления (= цена устройства) */
  sum?: number
  /** Стоимость доставки, которую оплачивает получатель */
  delivery_recipient_cost?: { value: number }
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
      /** Сколько СДЭК берёт с покупателя (= цена устройства) */
      payment: { value: number; vat_sum?: number; vat_rate?: number }
      /** Сколько СДЭК переводит продавцу (= price * (1 - COMMISSION)) */
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
  const token = readToken()
  const res = await fetch(`${CDEK_BASE_URL}${path}`, {
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
  full_name: string
  city_code: number
  region_code: number
  country_code: string
}

interface CdekCityRaw {
  city_uuid: string
  code: number
  full_name: string
  country_code: string
  region_code?: number
}

/** Autocomplete cities by name query */
export async function suggestCities(name: string): Promise<CdekCity[]> {
  const token = readToken()
  const res = await fetch(
    `${CDEK_BASE_URL}/location/suggest/cities?name=${encodeURIComponent(name)}&country_codes=RU`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  )
  if (!res.ok) return []
  const raw = await res.json()
  const items: CdekCityRaw[] = Array.isArray(raw) ? raw : (raw?.cities ?? raw?.data ?? [])
  return items
    .filter((c) => c.country_code === "RU")
    .map((c) => {
      // full_name: "Москва, Россия" or "Московский, Московская область, Россия"
      const parts = c.full_name.replace(/, Россия$/, "").split(", ")
      const city = parts[0]
      const region = parts.length > 1 ? parts.slice(1).join(", ") : ""
      return {
        city,
        full_name: c.full_name.replace(/, Россия$/, ""),
        city_code: c.code,
        region_code: c.region_code ?? 0,
        country_code: c.country_code,
      }
    })
}

/** Fetch deliverypoints with given params, normalise response to array */
async function fetchDeliveryPoints(params: URLSearchParams): Promise<CdekPvz[]> {
  try {
    const data = await cdekFetch<CdekPvz[] | { items?: CdekPvz[] }>(
      `/deliverypoints?${params.toString()}`,
    )
    return Array.isArray(data) ? data : (data.items ?? [])
  } catch {
    return []
  }
}

/**
 * List delivery offices (PVZ) by firing multiple parallel queries
 * (by region, by city, by city with is_handout=false) and merging the results,
 * deduplicating by code. This maximises the chance of finding points especially
 * for federal cities (Moscow, SPb) where region_code = 0.
 */
export async function getPvzList(cityCode: number | null, regionCode: number | null): Promise<CdekPvz[]> {
  const queries: URLSearchParams[] = []

  // 1. By city_code (handout only)
  if (cityCode !== null) {
    const p = new URLSearchParams({ type: "PVZ", is_handout: "true", city_code: String(cityCode) })
    queries.push(p)
  }

  // 2. By region_code (handout only) — skip if region is 0 (federal city)
  if (regionCode !== null && regionCode !== 0) {
    const p = new URLSearchParams({ type: "PVZ", is_handout: "true", region_code: String(regionCode) })
    queries.push(p)
  }

  // 3. By city_code without is_handout filter to catch more points
  if (cityCode !== null) {
    const p = new URLSearchParams({ type: "PVZ", city_code: String(cityCode) })
    queries.push(p)
  }

  const results = await Promise.all(queries.map(fetchDeliveryPoints))

  // Deduplicate by code, preserving order (first occurrence wins)
  const seen = new Set<string>()
  const merged: CdekPvz[] = []
  for (const batch of results) {
    for (const pvz of batch) {
      if (!seen.has(pvz.code)) {
        seen.add(pvz.code)
        merged.push(pvz)
      }
    }
  }
  return merged
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
