"use client"

import Image from "next/image"
import { HeartPulse } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const audiences = [
  "людям с аритмией",
  "спортсменам",
  "пожилым людям",
  "детям с заболеваниями сердца",
  "для домашнего контроля",
  "для наблюдения в динамике",
]

export function GenerationsSection() {
  const { ref, style } = useScrollAnimation({ direction: "right" })

  return (
    <section
      id="generations"
      ref={ref as React.RefObject<HTMLElement>}
      style={style}
      className="relative overflow-hidden py-12 md:py-16"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="rounded-2xl bg-background px-8 py-8 shadow-2xl ring-1 ring-black/10 md:px-12 md:py-10">
          {/* Header on top of the whole block */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <HeartPulse className="h-4 w-4" />
              Для всей семьи
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Кому подходит СмартКардио®
            </h2>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Image */}
            <div className="order-1 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-foreground/5 lg:order-none">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/media/generations.png"
                  alt="Руки трёх поколений держат прибор СмартКардио"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <ul className="space-y-4">
                {audiences.map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <p className="text-pretty text-base font-medium text-foreground md:text-lg">{item}</p>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  const target = document.querySelector("#order")
                  target?.scrollIntoView({ behavior: "smooth" })
                }}
                className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Заказать
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
