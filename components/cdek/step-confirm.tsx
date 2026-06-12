"use client"

import { useState } from "react"
import { Loader2, ChevronLeft, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { FormData, PvzLocation, CourierLocation, DeliveryType } from "./types"

const DEVICE_PRICE = 15600
const CASE_PRICE = 300

export function StepConfirm({
  data,
  deliveryType,
  pvz,
  courierLocation,
  deliverySum,
  onBack,
  onSubmit,
  loading,
  error,
}: {
  data: FormData
  deliveryType: DeliveryType
  pvz: PvzLocation | null
  courierLocation: CourierLocation | null
  deliverySum: number
  onBack: () => void
  onSubmit: (withCase: boolean) => void
  loading: boolean
  error: string | null
}) {
  const [withCase, setWithCase] = useState(false)
  const deliveryRows =
    deliveryType === "pvz" && pvz
      ? [
          { label: "Способ доставки", value: "Пункт выдачи" },
          { label: "Пункт выдачи", value: pvz.name },
          { label: "Адрес ПВЗ", value: pvz.address },
          ...(pvz.workTime ? [{ label: "График работы", value: pvz.workTime }] : []),
        ]
      : courierLocation
        ? [
            { label: "Способ доставки", value: "Курьером" },
            { label: "Адрес доставки", value: `${data.city}, ${courierLocation.address}` },
          ]
        : []

  const deviceTotal = DEVICE_PRICE + (withCase ? CASE_PRICE : 0)
  const totalPrice = deviceTotal + Math.round(deliverySum)
  const itemName = withCase
    ? "Прибор СмартКардио® с чехлом для хранения"
    : "Прибор СмартКардио®"

  const rows = [
    { label: "Получатель", value: data.name },
    { label: "Телефон", value: data.phone },
    ...(data.email ? [{ label: "E-mail", value: data.email }] : []),
    { label: "Город", value: data.city },
    ...deliveryRows,
    ...(data.comment ? [{ label: "Комментарий", value: data.comment }] : []),
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border">
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

      {/* Case upsell */}
      <label
        htmlFor="add-case"
        className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 transition-colors hover:bg-muted/70 has-[[data-state=checked]]:border-primary/40 has-[[data-state=checked]]:bg-primary/5"
      >
        <Checkbox
          id="add-case"
          checked={withCase}
          onCheckedChange={(v) => setWithCase(!!v)}
          className="mt-0.5 shrink-0"
        />
        <div className="flex flex-1 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium">Добавить чехол для хранения прибора</span>
          </div>
          <span className="shrink-0 text-sm font-semibold text-primary">+{CASE_PRICE} ₽</span>
        </div>
      </label>

      <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
        <span className="text-sm text-muted-foreground">{itemName}</span>
        <span className="text-sm font-medium">{deviceTotal.toLocaleString("ru-RU")} ₽</span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
        <span className="text-sm text-muted-foreground">Доставка</span>
        <span className="text-sm font-medium">{Math.round(deliverySum).toLocaleString("ru-RU")} ₽</span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
        <span className="text-base font-semibold">Итого к оплате</span>
        <span className="text-base font-bold text-primary">{totalPrice.toLocaleString("ru-RU")} ₽</span>
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
        <Button type="button" className="flex-1" onClick={() => onSubmit(withCase)} disabled={loading}>
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
