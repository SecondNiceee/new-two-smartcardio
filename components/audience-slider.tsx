"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const items = [
  "Людям с аритмией",
  "Спортсменам",
  "Пожилым людям",
  "Детям с заболеваниями сердца",
  "Для домашнего контроля",
  "Для наблюдения в динамике",
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
            Кому подходит СмартКардио®
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
          <div className="grid items-stretch gap-0 md:grid-cols-2">
            <div className="relative min-h-80 bg-secondary md:min-h-[32rem]">
              <Image
                src="/media/generations.png"
                alt="Три поколения держат прибор СмартКардио"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-foreground">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-5 w-5" />
                    </span>
                    <span className="text-pretty text-base leading-relaxed md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
