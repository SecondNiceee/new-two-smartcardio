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
            Приложение
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Посмотрите результат в приложении
          </h2>
        </div>

        {/* Main content block */}
        <div className="mt-8 rounded-2xl bg-background px-8 py-8 shadow-2xl ring-1 ring-black/10 md:px-12 md:py-8">
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

              <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                Портативный кардиограф СмартКардио®
              </h3>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                СмартКардио® — это компактный персональный прибор для записи ЭКГ, который всегда под рукой. Достаточно приложить устройство к телу, чтобы за считанные секунды снять кардиограмму в 6 отведениях. Прибор работает в связке с мобильным приложением: оно мгновенно отображает результат, помогает выявлять нарушения ритма и сохраняет все измерения в личном архиве, чтобы вы могли отслеживать динамику и делиться данными с врачом.
              </p>

              {/* Feature highlights */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2" style={{ marginBottom: '1.5rem' }}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">6 отведений</p>
                    <p className="text-sm text-muted-foreground">Полный охват данных</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Личный архив</p>
                    <p className="text-sm text-muted-foreground">История измерений</p>
                  </div>
                </div>
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
    </section>
  )
}
