import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, HeartPulse } from "lucide-react"

const audiences = [
  "людям с аритмией",
  "спортсменам",
  "пожилым людям",
  "детям с заболеваниями сердца",
  "для домашнего контроля",
  "для наблюдения в динамике",
]

export function GenerationsSection() {
  return (
    <section id="generations" className="relative overflow-hidden py-12 md:py-16">
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
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
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <HeartPulse className="h-4 w-4" />
              Для всей семьи
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Кому подходит СмартКардио®
            </h2>

            <ul className="mt-8 space-y-4">
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

            <div className="mt-9">
              <Button asChild size="lg">
                <a href="#contact">
                  Заказать
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
