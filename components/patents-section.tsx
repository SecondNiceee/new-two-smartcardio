"use client"

import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ShieldCheck } from "lucide-react"

const patents = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SZHtawzErYEd644quYHM8LwYgk2Mk0.png",
    alt: "Патент на полезную модель №206009 - Автономное устройство для регистрации жизненноважных показателей",
    title: "Патент на полезную модель",
    number: "№206009",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UNSzQRKmJhqUhY8yPyMSQ4SusG2Hf7.png",
    alt: "Патент на изобретение №2766759 - Многофункциональное портативное устройство для регистрации и анализа жизненно важных показателей",
    title: "Патент на изобретение",
    number: "№2766759",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rj1DqXLdCWMMdviv8u29aBZiYp1w5M.png",
    alt: "Свидетельство о государственной регистрации программы для ЭВМ №2022663045 - Cardioxium Backend",
    title: "Свидетельство ПО",
    number: "№2022663045",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rxte0U4BFOa3bfEXmwyiLSy1Ka7lTE.png",
    alt: "Свидетельство на товарный знак №989247 - SMARTCARDIO",
    title: "Товарный знак",
    number: "№989247",
  },
]

export function PatentsSection() {
  const { ref, style } = useScrollAnimation({ direction: "bottom" })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={style}
      className="relative overflow-hidden py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            <ShieldCheck className="h-4 w-4" />
            Защищено законом
          </span>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Уникальность продукции защищена патентами Российской Федерации
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Прибор СмартКардио® создан российскими разработчиками при участии практикующих врачей кардиологов.
          </p>
        </div>

        {/* Patents Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {patents.map((patent) => (
            <div
              key={patent.number}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/50 p-3 ring-1 ring-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-xl sm:p-4"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted/30">
                <Image
                  src={patent.src}
                  alt={patent.alt}
                  fill
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center sm:mt-4">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {patent.title}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-base">
                  {patent.number}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
