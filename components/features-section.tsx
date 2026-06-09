"use client"

import { Card } from "@/components/ui/card"
import { Brain, Wifi, HeartPulse, Clock, ShieldCheck, Smartphone } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const features = [
  {
    icon: Wifi,
    title: "Без проводов и кабинета",
    description:
      "Приложите пальцы к электродам — прибор снимает ЭКГ дистанционно, где бы вы ни находились.",
  },
  {
    icon: Brain,
    title: "ИИ-прогноз",
    description:
      "Нейросеть анализирует ритм и сразу выдаёт прогноз состояния сердца и возможные риски.",
  },
  {
    icon: Clock,
    title: "Результат за секунды",
    description:
      "Не нужно ждать расшифровки — итог анализа появляется менее чем за 30 секунд.",
  },
  {
    icon: HeartPulse,
    title: "Раннее выявление",
    description:
      "Аритмии и отклонения распознаются до того, как появятся серьёзные симптомы.",
  },
  {
    icon: Smartphone,
    title: "Синхронизация с телефоном",
    description:
      "Все измерения сохраняются в приложении и доступны вашему врачу в один тап.",
  },
  {
    icon: ShieldCheck,
    title: "Защита данных",
    description:
      "Медицинские данные шифруются и хранятся в соответствии со стандартами безопасности.",
  },
]

export function FeaturesSection() {
  const { ref, style } = useScrollAnimation({ direction: "bottom" })

  return (
    <section id="features" ref={ref as React.RefObject<HTMLElement>} style={style} className="overflow-x-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Возможности
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Кардиолог, который всегда с вами
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            СмартКардио® объединяет точную электрокардиографию и искусственный
            интеллект в одном компактном приборе.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/60 p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
