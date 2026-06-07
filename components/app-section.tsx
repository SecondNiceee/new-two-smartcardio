"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

function EcgIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path
        d="M24 41C24 41 6 30 6 17.5C6 11.7 10.4 7.5 15.5 7.5C19 7.5 22 9.3 24 12.2C26 9.3 29 7.5 32.5 7.5C37.6 7.5 42 11.7 42 17.5C42 30 24 41 24 41Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M24 41C24 41 6 30 6 17.5C6 11.7 10.4 7.5 15.5 7.5C19 7.5 22 9.3 24 12.2C26 9.3 29 7.5 32.5 7.5C37.6 7.5 42 11.7 42 17.5C42 30 24 41 24 41Z"
        fill="currentColor"
        opacity="0.08"
      />
      <polyline
        points="9,23 17,23 20,23 22.5,15 25.5,30 28,19 30,23 39,23"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function PulseWaveIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path
        d="M24 5C24 5 38 18.5 38 29C38 36.7 31.7 43 24 43C16.3 43 10 36.7 10 29C10 18.5 24 5 24 5Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M24 5C24 5 38 18.5 38 29C38 36.7 31.7 43 24 43C16.3 43 10 36.7 10 29C10 18.5 24 5 24 5Z"
        fill="currentColor"
        opacity="0.08"
      />
      <polyline
        points="15,30 19,30 21.5,24 24.5,35 27,28 29,30 33,30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function BreathingIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path d="M24 8V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M20 12C20 12 22 14.5 24 14.5C26 14.5 28 12 28 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M24 22C24 22 22 18.5 18.5 18.5C15 18.5 13 22 13 25.5C13 30.5 10.5 33.5 10.5 37.5C10.5 40.2 12 41.5 14.5 41.5C17 41.5 18.5 39.5 19 36.5C20 30 24 28 24 22Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M24 22C24 22 26 18.5 29.5 18.5C33 18.5 35 22 35 25.5C35 30.5 37.5 33.5 37.5 37.5C37.5 40.2 36 41.5 33.5 41.5C31 41.5 29.5 39.5 29 36.5C28 30 24 28 24 22Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
    </svg>
  )
}

const indicators = [
  {
    title: "ЭКГ в шести отведениях",
    subtitle: "(I, II, III, aVL, aVR, aVF)",
    Icon: EcgIcon,
  },
  {
    title: "Пульсовая волна",
    subtitle: "с расчетом сатурации крови кислородом",
    Icon: PulseWaveIcon,
  },
  {
    title: "Дыхательные движения",
    subtitle: "(график дыхания)",
    Icon: BreathingIcon,
  },
]

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
                Полноценное ЭКГ в 6 отведениях — и всегда под рукой. Компактный прибор снимает кардиограмму за считанные секунды, а удобное приложение наглядно отображает запись и сохраняет её в личном архиве. Встроенный ИИ помогает обратить внимание на возможные нарушения ритма.
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

        {/* Indicators sub-section */}
        <div className="mt-12 rounded-2xl bg-slate-900 px-6 py-10 shadow-2xl ring-1 ring-black/10 md:px-12 md:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground ring-1 ring-inset ring-primary/30">
              Измерения
            </span>
            <h3 className="mt-3 text-balance text-2xl font-bold tracking-tight text-white md:text-3xl">
              Какие показатели регистрирует СмартКардио®?
            </h3>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {indicators.map(({ title, subtitle, Icon }, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl bg-white/5 backdrop-blur-sm px-6 py-8 text-center ring-1 ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)] transition-all hover:bg-white/10 hover:ring-brand-teal/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.4)]"
              >
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent ring-1 ring-brand-teal/40 text-accent-foreground">
                  <Icon />
                </div>
                <h4 className="text-lg font-bold tracking-tight text-white">{title}</h4>
                <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
