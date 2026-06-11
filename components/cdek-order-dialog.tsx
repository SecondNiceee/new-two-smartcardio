"use client"

import { useState, useEffect, useRef, type ReactNode, type FormEvent } from "react"
import { CheckCircle2, Loader2, MapPin, Package, ChevronRight, ChevronLeft, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  name: string
  phone: string
  email: string
  city: string
  cityCode: string
  regionCode: number
  comment: string
  consent: boolean
}

interface PvzLocation {
  code: string
  name: string
  address: string
  workTime: string
}

interface Tariff {
  tariff_code: number
  tariff_name: string
  delivery_sum: number
  period_min: number
  period_max: number
}

type Step = "form" | "pvz" | "confirm"

interface CdekCity {
  city: string
  sub_region: string
  region: string
  city_code: number
  region_code: number
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "form", label: "Данные" },
    { key: "pvz", label: "Пункт выдачи" },
    { key: "confirm", label: "Подтверждение" },
  ]
  const activeIdx = steps.findIndex((s) => s.key === step)

  return (
    <div className="flex items-center justify-center gap-1 py-1" aria-label="Шаги оформления">
      {steps.map((s, idx) => (
        <div key={s.key} className="flex items-center gap-1">
          <div
            className={[
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
              idx < activeIdx
                ? "bg-primary text-primary-foreground"
                : idx === activeIdx
                ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-1"
                : "bg-muted text-muted-foreground",
            ].join(" ")}
          >
            {idx < activeIdx ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              idx + 1
            )}
          </div>
          <span
            className={[
              "text-xs hidden sm:inline",
              idx === activeIdx ? "font-medium text-foreground" : "text-muted-foreground",
            ].join(" ")}
          >
            {s.label}
          </span>
          {idx < steps.length - 1 && (
            <div
              className={[
                "mx-1 h-px w-6 sm:w-10 transition-colors",
                idx < activeIdx ? "bg-primary" : "bg-border",
              ].join(" ")}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Step 1: Contact form ────────────────────────────────────────────────────

function CityAutocomplete({
  value,
  onSelect,
}: {
  value: string
  onSelect: (city: CdekCity) => void
}) {
  const [input, setInput] = useState(value)
  const [suggestions, setSuggestions] = useState<CdekCity[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(val: string) {
    setInput(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cdek/cities?name=${encodeURIComponent(val)}`)
        const data: CdekCity[] = await res.json()
        console.log("[v0] city suggestions:", data)
        setSuggestions(Array.isArray(data) ? data.slice(0, 8) : [])
        setOpen(true)
      } catch (e) {
        console.log("[v0] city fetch error:", e)
      } finally {
        setLoading(false)
      }
    }, 350)
  }

  function handleSelect(city: CdekCity) {
    const label = city.region ? `${city.city}, ${city.region}` : city.city
    setInput(label)
    setSuggestions([])
    setOpen(false)
    onSelect(city)
  }

  return (
    <div className="relative">
      <Input
        id="cdek-city"
        autoComplete="off"
        placeholder="Начните вводить город..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border border-border bg-background shadow-md">
          {suggestions.map((c, i) => (
            <li key={i}>
              <button
                type="button"
                onMouseDown={() => handleSelect(c)}
                className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
              >
                <span className="font-medium">{c.city}</span>
                {c.region && (
                  <span className="ml-1 text-muted-foreground">{c.region}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StepForm({
  data,
  onChange,
  onNext,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
  onNext: () => void
}) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cdek-name">
            Имя и фамилия <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cdek-name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Иван Петров"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cdek-phone">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cdek-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cdek-email">E-mail</Label>
        <Input
          id="cdek-email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cdek-city">
          Город <span className="text-destructive">*</span>
        </Label>
        <CityAutocomplete
          value={data.city}
          onSelect={(city) =>
            onChange({
              city: city.city,
              cityCode: String(city.city_code),
              regionCode: city.region_code,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cdek-comment">Комментарий к заказу</Label>
        <Input
          id="cdek-comment"
          value={data.comment}
          onChange={(e) => onChange({ comment: e.target.value })}
          placeholder="Особые пожелания..."
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="cdek-consent"
          checked={data.consent}
          onCheckedChange={(v) => onChange({ consent: v === true })}
          className="mt-0.5"
        />
        <Label
          htmlFor="cdek-consent"
          className="text-sm font-normal leading-relaxed text-muted-foreground"
        >
          Даю согласие на обработку персональных данных
        </Label>
      </div>

      <Button
        type="submit"
        className="mt-1 w-full"
        disabled={!data.consent || !data.regionCode}
      >
        Выбрать пункт выдачи
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </form>
  )
}

// ─── Step 2: PVZ picker ───────────────────────────────────────────────────────

function StepPvz({
  cityCode,
  regionCode,
  cityName,
  selectedPvz,
  onSelect,
  onBack,
  onNext,
}: {
  cityCode: string
  regionCode: number
  cityName: string
  selectedPvz: PvzLocation | null
  onSelect: (pvz: PvzLocation) => void
  onBack: () => void
  onNext: () => void
}) {
  const [pvzList, setPvzList] = useState<
    { code: string; name: string; location: { address_full: string; address: string }; work_time: string }[]
  >([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tariffs, setTariffs] = useState<Tariff[]>([])

  // Load PVZ list and tariffs in parallel
  useEffect(() => {
    if (!regionCode) return
    setLoading(true)
    setError(null)

    Promise.all([
      fetch(`/api/cdek/pvz?region_code=${regionCode}`).then((r) => r.json()),
      fetch(`/api/cdek/calc?city_code=${cityCode}`).then((r) => r.json()),
    ])
      .then(([pvzData, calcData]) => {
        if (pvzData.error) throw new Error(pvzData.error)
        setPvzList(pvzData)
        if (!calcData.error) setTariffs(calcData)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [cityCode])

  const cheapestTariff = tariffs.reduce<Tariff | null>((best, t) => {
    if (!best || t.delivery_sum < best.delivery_sum) return t
    return best
  }, null)

  const filteredPvz = search.trim()
    ? pvzList.filter((pvz) => {
        const q = search.toLowerCase()
        return (
          pvz.name.toLowerCase().includes(q) ||
          (pvz.location.address_full ?? pvz.location.address).toLowerCase().includes(q)
        )
      })
    : pvzList

  return (
    <div className="flex flex-col gap-4">
      {/* Delivery cost banner */}
      {cheapestTariff && (
        <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Package className="h-4 w-4 text-primary" />
            <span>
              Доставка до {cityName}:{" "}
              <span className="font-semibold text-primary">
                от {cheapestTariff.delivery_sum} ₽
              </span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {cheapestTariff.period_min}–{cheapestTariff.period_max} дн.
          </span>
        </div>
      )}

      {loading && (
        <div className="flex h-56 items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или адресу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* PVZ list */}
          <div className="max-h-72 overflow-y-auto rounded-xl border border-border">
            {filteredPvz.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Ничего не найдено
              </p>
            )}
            {filteredPvz.map((pvz) => {
              const isSelected = selectedPvz?.code === pvz.code
              return (
                <button
                  key={pvz.code}
                  type="button"
                  onClick={() =>
                    onSelect({
                      code: pvz.code,
                      name: pvz.name,
                      address: pvz.location.address_full ?? pvz.location.address,
                      workTime: pvz.work_time,
                    })
                  }
                  className={[
                    "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0",
                    isSelected
                      ? "bg-primary/5 text-foreground"
                      : "hover:bg-muted/50",
                  ].join(" ")}
                >
                  <MapPin
                    className={[
                      "mt-0.5 h-4 w-4 shrink-0",
                      isSelected ? "text-primary" : "text-muted-foreground",
                    ].join(" ")}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{pvz.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {pvz.location.address_full ?? pvz.location.address}
                    </p>
                    {pvz.work_time && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{pvz.work_time}</p>
                    )}
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Назад
        </Button>
        <Button
          type="button"
          className="flex-1"
          disabled={!selectedPvz}
          onClick={onNext}
        >
          Подтвердить
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Step 3: Confirmation ─────────────────────────────────────────────────────

function StepConfirm({
  data,
  pvz,
  onBack,
  onSubmit,
  loading,
  error,
}: {
  data: FormData
  pvz: PvzLocation
  onBack: () => void
  onSubmit: () => void
  loading: boolean
  error: string | null
}) {
  const rows = [
    { label: "Получатель", value: data.name },
    { label: "Телефон", value: data.phone },
    ...(data.email ? [{ label: "E-mail", value: data.email }] : []),
    { label: "Город", value: data.city },
    { label: "Пункт выдачи", value: pvz.name },
    { label: "Адрес ПВЗ", value: pvz.address },
    ...(pvz.workTime ? [{ label: "График работы", value: pvz.workTime }] : []),
    ...(data.comment ? [{ label: "Комментарий", value: data.comment }] : []),
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border overflow-hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex gap-3 border-b border-border px-4 py-3 last:border-b-0"
          >
            <span className="w-36 shrink-0 text-sm text-muted-foreground">{row.label}</span>
            <span className="text-sm font-medium text-foreground">{row.value}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1" disabled={loading}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Назад
        </Button>
        <Button type="button" className="flex-1" onClick={onSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Оформление...
            </>
          ) : (
            "Оформить заказ"
          )}
        </Button>
      </div>
    </div>
  )
}

// ─── Step 4: Success ──────────────────────────────────────────────────────────

function StepSuccess({ uuid, onClose }: { uuid: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>
      <div>
        <DialogTitle className="text-xl">Заказ оформлен!</DialogTitle>
        <DialogDescription className="mt-2 text-pretty">
          Ваш заказ зарегистрирован в СДЭК. Менеджер свяжется с вами для подтверждения и оплаты.
        </DialogDescription>
      </div>
      {uuid && (
        <p className="rounded-lg bg-muted px-4 py-2 text-sm font-mono text-muted-foreground">
          ID заказа: {uuid}
        </p>
      )}
      <Button className="mt-2 w-full sm:w-auto" onClick={onClose}>
        Закрыть
      </Button>
    </div>
  )
}

// ─── Main dialog component ────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  cityCode: "",
  regionCode: 0,
  comment: "",
  consent: true,
}

export function CdekOrderDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("form")
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [selectedPvz, setSelectedPvz] = useState<PvzLocation | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [orderUuid, setOrderUuid] = useState<string | null>(null)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTimeout(() => {
        setStep("form")
        setFormData(INITIAL_FORM)
        setSelectedPvz(null)
        setSubmitting(false)
        setSubmitError(null)
        setOrderUuid(null)
      }, 300)
    }
  }

  async function handleSubmitOrder() {
    if (!selectedPvz) return
    setSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/cdek/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tariff_code: 136, // Door-to-door standard (Посылка склад-склад)
          delivery_point: selectedPvz.code,
          sender: {
            name: "СмартКардио",
            phones: [{ number: "+74951234567" }],
          },
          recipient: {
            name: formData.name,
            phones: [{ number: formData.phone }],
            ...(formData.email ? { email: formData.email } : {}),
          },
          packages: [
            {
              number: "1",
              weight: 500,
              length: 20,
              width: 15,
              height: 5,
              items: [
                {
                  name: "СмартКардио® прибор",
                  ware_key: "SMARTCARDIO-001",
                  payment: { value: 0 },
                  cost: 15600,
                  weight: 500,
                  amount: 1,
                },
              ],
            },
          ],
          ...(formData.comment ? { comment: formData.comment } : {}),
        }),
      })

      const json = (await res.json()) as { uuid?: string; error?: string }

      if (!res.ok || json.error) {
        setSubmitError(json.error ?? "Неизвестная ошибка при создании заказа")
        return
      }

      setOrderUuid(json.uuid ?? "")
      setStep("confirm") // reuse step slot for success — guarded by orderUuid
    } catch {
      setSubmitError("Ошибка соединения с сервером. Попробуйте ещё раз.")
    } finally {
      setSubmitting(false)
    }
  }

  const isSuccess = step === "confirm" && orderUuid !== null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <span onClick={() => setOpen(true)}>{trigger}</span>

      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        {isSuccess ? (
          <StepSuccess uuid={orderUuid!} onClose={() => handleOpenChange(false)} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {step === "form" && "Оформление заказа"}
                {step === "pvz" && "Выберите пункт выдачи"}
                {step === "confirm" && "Подтверждение заказа"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Оформление заказа СмартКардио® через СДЭК
              </DialogDescription>
            </DialogHeader>

            <StepBar step={step} />

            <div className="mt-1">
              {step === "form" && (
                <StepForm
                  data={formData}
                  onChange={(patch) => setFormData((prev) => ({ ...prev, ...patch }))}
                  onNext={() => setStep("pvz")}
                />
              )}
              {step === "pvz" && (
                <StepPvz
                  cityCode={formData.cityCode}
                  regionCode={formData.regionCode}
                  cityName={formData.city}
                  selectedPvz={selectedPvz}
                  onSelect={setSelectedPvz}
                  onBack={() => setStep("form")}
                  onNext={() => setStep("confirm")}
                />
              )}
              {step === "confirm" && !isSuccess && selectedPvz && (
                <StepConfirm
                  data={formData}
                  pvz={selectedPvz}
                  onBack={() => setStep("pvz")}
                  onSubmit={handleSubmitOrder}
                  loading={submitting}
                  error={submitError}
                />
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
