"use client"

import { Check } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const audience = [
  'Люди с жалобами на "нарушения" в работе сердца',
  "Пациенты, которым необходим регулярный контроль ЭКГ",
  "Люди старшего возраста, заботящиеся о здоровье сердца",
  "Люди с семейной историей заболеваний сердца",
  "Пользователи телемедицинских сервисов",
]

export function AudienceSlider() {
  const { ref, style } = useScrollAnimation({ direction: "left" })

  return (
    <section id="audience" ref={ref as React.RefObject<HTMLElement>} style={style} className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            Кому подходит
          </span>
          <h2 className="mt-6 text-pretty text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Для кого создан СмартКардио
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {audience.map((item, i) => (
            <li
              key={item}
              className={`flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm ${
                i === audience.length - 1 && audience.length % 2 !== 0 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="text-base font-medium leading-relaxed text-foreground md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
