"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function AppSection() {
  const { ref, style } = useScrollAnimation({ direction: "left" })

  return (
    <section id="app" ref={ref as React.RefObject<HTMLElement>} style={style} className="relative overflow-x-hidden py-12 md:py-14">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            Что это?
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            СмартКардио®
          </h2>
        </div>

        {/* Main content block — product intro + measurements combined */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-black/10">
          {/* Top: product description + video */}
          <div className="px-8 py-8 md:px-12 md:py-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

              {/* Text content with hero-style corner accents */}
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

                <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Портативный Кардиомонитор СмартКардио®
                </h3>

                <p className="mt-5 text-lg leading-relaxed text-foreground md:text-xl">
                  СмартКардио® — это кардиомонитор, доступный в любом месте. Снимайте ЭКГ
                  без визита в поликлинику и получайте данные, готовые для врача.
                </p>
                <p className="mt-4 text-base font-semibold text-primary md:text-lg">
                  Результат за 20 секунд.
                </p>

                {/* Indicators list */}
                <div className="mt-8">
                  <p className="text-base font-semibold uppercase tracking-wide text-primary">Показатели</p>
                  <ul className="mt-4 space-y-3">
                    {["ЭКГ в шести отведениях", "Пульсовая волна", "Дыхательные движения"].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <span className="text-base font-medium text-foreground md:text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-base text-muted-foreground" style={{ marginBottom: "1.5rem" }}>
                    Данные передаются и сохраняются на смартфоне в режиме онлайн
                  </p>
                </div>

                {/* Order button */}
                <button
                  onClick={() => {
                    const target = document.querySelector("#order")
                    target?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Заказать
                </button>
              </div>

              {/* Video container - 25% width, no decoration */}
              <div className="mx-auto w-full max-w-xs lg:w-[25%] lg:max-w-none lg:shrink-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-auto w-full"
                >
                  <source src="/media/app-demo.webm" type="video/webm" />
                  Ваш браузер не поддерживает воспроизведение видео.
                </video>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
