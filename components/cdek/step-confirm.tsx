"use client"

import { Loader2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FormData, PvzLocation, CourierLocation, DeliveryType } from "./types"

export function StepConfirm({
  data,
  deliveryType,
  pvz,
  courierLocation,
  onBack,
  onSubmit,
  loading,
  error,
}: {
  data: FormData
  deliveryType: DeliveryType
  pvz: PvzLocation | null
  courierLocation: CourierLocation | null
  onBack: () => void
  onSubmit: () => void
  loading: boolean
  error: string | null
}) {
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
