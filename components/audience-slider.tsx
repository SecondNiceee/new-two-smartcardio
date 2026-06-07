"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, User, Stethoscope, Building2 } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

type Slide = {
  id: string
  tag: string
  title: string
  description: string
  bullets: string[]
  image: string
  imageAlt: string
  Icon: typeof User
}

const slides: Slide[] = [
  {
    id: "users",
    tag: "Для пользователей",
    title: "Контроль сердца дома, без очередей",
    description:
      "Снимайте ЭКГ за полминуты в любое удобное время и получайте понятный прогноз состояния сердца прямо на смартфон.",
    bullets: [
      "Измерение ЭКГ за 30 секунд",
      "Мгновенный понятный результат",
      "История наблюдений всегда под рукой",
    ],
    image: "/media/for-users.png",
    imageAlt: "Мужчина держит прибор СмартКардио",
    Icon: User,
  },
  {
    id: "doctors",
    tag: "Для врачей",
    title: "Больше данных — точнее решения",
    description:
      "Получайте ЭКГ пациентов удалённо, отслеживайте динамику и принимайте решения на основе автоматического анализа.",
    bullets: [
      "Удалённый мониторинг пациентов",
      "Автоматическая расшифровка ЭКГ",
      "Динамика показателей в одном окне",
    ],
    image: "/media/for-doctors.png",
    imageAlt: "Врач с прибором СмартКардио",
    Icon: Stethoscope,
  },
  {
    id: "clinics",
    tag: "Для медицинских центров",
    title: "Масштабируйте кардиодиагностику",
    description:
      "Оснастите клинику компактными приборами и предложите пациентам дистанционный мониторинг сердца как новую услугу.",
    bullets: [
      "Поток пациентов без лишней нагрузки",
      "Единая платформа для всех данных",
      "Новый сервис дистанционной диагностики",
    ],
    image: "/media/for-clinics.png",
    imageAlt: "Передача прибора СмартКардио пациенту",
    Icon: Building2,
  },
]

export function AudienceSlider() {
  const [active, setActive] = useState(0)
  const slide = slides[active]
  const { ref, style } = useScrollAnimation({ direction: "left" })

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + slides.length) % slides.length)
  }

  return (
    <section id="audience" ref={ref as React.RefObject<HTMLElement>} style={style} className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            Кому подходит
          </span>
          <h2 className="mt-6 text-pretty text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Одно решение для каждого
          </h2>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {slides.map((s, i) => {
            const isActive = i === active
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                <s.Icon className="h-4 w-4" />
                {s.tag}
              </button>
            )
          })}
        </div>

        {/* Slide */}
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
          <div className="grid items-stretch gap-0 md:grid-cols-2">
            <div className="relative min-h-80 bg-secondary md:min-h-[32rem]">
              <Image
                key={slide.image}
                src={slide.image || "/placeholder.svg"}
                alt={slide.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <slide.Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">{slide.tag}</span>
              </div>

              <h3 className="text-pretty text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {slide.title}
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {slide.description}
              </p>

              <ul className="flex flex-col gap-3">
                {slide.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Controls */}
              <div className="mt-2 flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Предыдущий слайд"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Следующий слайд"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActive(i)}
                      aria-label={`Перейти к слайду ${i + 1}`}
                      className={`h-2 cursor-pointer rounded-full transition-all ${
                        i === active ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
