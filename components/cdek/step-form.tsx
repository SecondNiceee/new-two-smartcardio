"use client"

import type { FormEvent } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CityAutocomplete } from "./city-autocomplete"
import type { FormData } from "./types"

export function StepForm({
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

      <Button type="submit" className="mt-1 w-full" disabled={!data.consent || !data.cityCode}>
        Выбрать способ доставки
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </form>
  )
}
