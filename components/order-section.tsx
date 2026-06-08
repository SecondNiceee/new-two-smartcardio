import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function OrderSection() {
  return (
    <section
      id="order"
      aria-labelledby="order-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Scrollable / parallax background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/media/footerBg.png)" }}
      />
      {/* Darkening overlay for readability */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/70"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center md:px-8 md:py-16 lg:py-20">
        <h2
          id="order-heading"
          className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Закажите СмартКардио® уже сегодня
        </h2>

        <figure className="mt-8 max-w-2xl">
          <blockquote className="text-pretty text-lg font-medium italic leading-relaxed text-white/90 md:text-xl">
            {"\u00ABВрачи лечат болезни, а здоровье и долголетие нужно добывать самому.\u00BB"}
          </blockquote>
          <figcaption className="mt-4 text-sm text-white/70 md:text-base">
            — Врач, учёный, сердечно-сосудистый хирург Николай Михайлович Амосов
          </figcaption>
        </figure>

        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="group relative h-14 overflow-hidden rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_8px_30px_-6px] shadow-primary/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_-6px] hover:shadow-primary/70"
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
    </section>
  )
}
