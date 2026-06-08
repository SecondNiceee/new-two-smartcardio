"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

function EcgIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      {/* Heart outline */}
      <path
        d="M24 41C24 41 6 30 6 17.5C6 11.7 10.4 7.5 15.5 7.5C19 7.5 22 9.3 24 12.2C26 9.3 29 7.5 32.5 7.5C37.6 7.5 42 11.7 42 17.5C42 30 24 41 24 41Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Soft inner fill */}
      <path
        d="M24 41C24 41 6 30 6 17.5C6 11.7 10.4 7.5 15.5 7.5C19 7.5 22 9.3 24 12.2C26 9.3 29 7.5 32.5 7.5C37.6 7.5 42 11.7 42 17.5C42 30 24 41 24 41Z"
        fill="currentColor"
        opacity="0.08"
      />
      {/* ECG pulse line through the heart */}
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
      width="56"
      height="56"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      {/* Blood drop */}
      <path
        d="M24 5C24 5 38 18.5 38 29C38 36.7 31.7 43 24 43C16.3 43 10 36.7 10 29C10 18.5 24 5 24 5Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Soft inner fill */}
      <path
        d="M24 5C24 5 38 18.5 38 29C38 36.7 31.7 43 24 43C16.3 43 10 36.7 10 29C10 18.5 24 5 24 5Z"
        fill="currentColor"
        opacity="0.08"
      />
      {/* Pulse wave inside drop */}
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
      width="56"
      height="56"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      {/* Windpipe */}
      <path
        d="M24 8V22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Windpipe top split */}
      <path
        d="M20 12C20 12 22 14.5 24 14.5C26 14.5 28 12 28 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Left lung */}
      <path
        d="M24 22C24 22 22 18.5 18.5 18.5C15 18.5 13 22 13 25.5C13 30.5 10.5 33.5 10.5 37.5C10.5 40.2 12 41.5 14.5 41.5C17 41.5 18.5 39.5 19 36.5C20 30 24 28 24 22Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* Right lung */}
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

export function IndicatorsSection() {
  const { ref, style } = useScrollAnimation({ direction: "bottom" })

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

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={style} className="relative overflow-x-hidden bg-slate-900 py-12 md:py-16">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-64 w-64 rotate-12 rounded-[42%_58%_70%_30%/45%_45%_55%_55%] bg-brand-teal/20 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 -rotate-12 rounded-[63%_37%_30%_70%/57%_58%_42%_43%] bg-brand-cyan/20 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground ring-1 ring-inset ring-primary/30">
            Измерения
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Какие показатели регистрирует СмартКардио®?
          </h2>
        </div>

        {/* Indicators cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {indicators.map(({ title, subtitle, Icon }, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl bg-white/5 backdrop-blur-sm px-6 py-8 text-center ring-1 ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)] transition-all hover:bg-white/10 hover:ring-brand-teal/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-accent ring-1 ring-brand-teal/40 text-accent-foreground">
                <Icon />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                {subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Order button */}
        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Заказать прибор
          </button>
        </div>
      </div>
    </section>
  )
}
