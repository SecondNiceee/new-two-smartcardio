"use client"

import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ViolationsSection() {
  const { ref, style } = useScrollAnimation({ direction: "left" })

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={style} className="relative overflow-x-hidden py-12 md:py-14">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            ИИ-диагностика
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Распознавание нарушений
          </h2>
        </div>

        {/* Main content block */}
        <div className="mt-8 rounded-2xl bg-background px-8 py-8 shadow-2xl ring-1 ring-black/10 md:px-12 md:py-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

            {/* Image — left side */}
            <div className="mx-auto w-full max-w-xs lg:w-[45%] lg:max-w-none lg:shrink-0">
              <Image
                src="/images/violations-detection.png"
                alt="Три смартфона с приложением СмартКардио, показывающие цветовую индикацию результатов: зеленый — норма, жёлтый — экстрасистолия, красный — фибрилляция предсердий"
                width={900}
                height={700}
                className="h-auto w-full"
                priority
              />
            </div>

            {/* Text content — right side */}
            <div className="relative max-w-xl px-12 py-8 lg:flex-1">
              {/* Top-left corner accent */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-2 h-16 w-16 rounded-tl-[2rem] border-l-2 border-t-2 border-primary/40"
              />
              {/* Bottom-right corner accent */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-16 rounded-br-[2rem] border-b-2 border-r-2 border-primary/40"
              />

              <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                Цветовая индикация для быстрого восприятия
              </h3>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                Приложение СмартКардио® содержит автоматическое распознавание широкого спектра нарушений с помощью искусственного интеллекта. Цветовая индикация способствует лучшему восприятию данных.
              </p>

              {/* Color indicators */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <div className="h-4 w-4 rounded-full bg-green-500" />
                  </div>
                  <p className="font-semibold text-foreground">Норма</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                    <div className="h-4 w-4 rounded-full bg-yellow-500" />
                  </div>
                  <p className="font-semibold text-foreground">Внимание</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
                    <div className="h-4 w-4 rounded-full bg-red-500" />
                  </div>
                  <p className="font-semibold text-foreground">Тревога</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
