import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function OrderSection() {
  return (
    <section
      id="order"
      aria-labelledby="order-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Content (left) */}
        <div className="flex flex-col items-start text-left">
          <h2
            id="order-heading"
            className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
          >
            Закажите СмартКардио® уже сегодня
          </h2>

          <figure className="mt-8">
            <blockquote className="text-pretty text-lg font-medium italic leading-relaxed text-slate-700 md:text-xl">
              {"\u00ABВрачи лечат болезни, а здоровье и долголетие нужно добывать самому.\u00BB"}
            </blockquote>
            <figcaption className="mt-4 text-sm text-slate-500 md:text-base">
              — Врач, учёный, сердечно-сосудистый хирург Николай Михайлович Амосов
            </figcaption>
          </figure>

          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="group relative h-14 overflow-hidden rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_8px_30px_-6px] shadow-primary/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_-6px] hover:shadow-primary/50"
            >
              <a href="#contact">
                {/* Shine sweep */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative flex items-center gap-2">
                  Заказать за 15 600 ₽
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Button>
          </div>
        </div>

        {/* Photo (right) */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200">
            <Image
              src="/images/advantages-bg.png"
              alt="Консультация врача с пациентом и прибором СмартКардио"
              width={1456}
              height={1080}
              className="h-auto w-full object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
