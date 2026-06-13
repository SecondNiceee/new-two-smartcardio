"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { GalleryDialog, type GalleryImage } from "@/components/gallery-dialog"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const slides: GalleryImage[] = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-Zq2OBOOaxRwy4cCxS5l3duFEVe83Dt.jpeg",
    caption: "Эпизод предсердной тахикардии",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qEatb2pnLqJaFqSgxgXAwZuKUIvGQ7.png",
    caption: "Синусовый ритм, вариант нормы",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-kVzBSNPHSDFK3O8rjBfxv9K1U8VFHL.jpeg",
    caption: "Желудочковая бигеминия с дефицитом пульса",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%98%D0%92%D0%A0-SV4dSVvbOLNmxGNHsABgdIFIzKj08S.png",
    caption: "Эпизод ускоренного идиовентрикулярного ритма",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%90%D0%92%D0%91-prPzed7Eno6VScGwVcyozOgmZBH7oq.png",
    caption: "Полная атриовентрикулярная блокада",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%82%D0%B0%D1%85%D0%B8-alsjHiLAf3KOiGG49UPHT7fNG9BGIc.png",
    caption: "Синусовая тахикардия",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%B8%D1%88%D0%B5%D0%BC%D0%B8%D1%8F-VoJm6BCyMbnija1iY3rJwnH3rtAN8f.png",
    caption: "Острая ишемия миокарда",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%96%D0%AD%D0%A1-8SmfC3HjlReUPUYXgRReVAax3xYDRd.png",
    caption: "Частая желудочковая экстрасистолия",
  },
]

export function RecordingsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    skipSnaps: false,
    startIndex: 1,
  })
  const [selectedIndex, setSelectedIndex] = useState(1)
  const { ref, style } = useScrollAnimation({ direction: "right" })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="recordings" ref={ref as React.RefObject<HTMLElement>} style={style} className="relative overflow-hidden py-8 md:py-8">
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            Более 20 000 записей снято
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Примеры записей с прибора
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Все записи сохраняются в личном архиве в формате PDF. Данные доступны для просмотра, печати или передачи специалисту
          </p>
        </div>

        {/* Embla carousel */}
        <div className="relative mt-10">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-28 md:w-40" />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-28 md:w-40" />
          <div className="overflow-hidden px-16 sm:px-20 md:px-24" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {slides.map((slide, i) => {
                const isActive = i === selectedIndex
                return (
                  <div
                    key={i}
                    className="min-w-0 shrink-0 grow-0 basis-[80%] pl-4 sm:basis-[62%] md:basis-[52%]"
                  >
                    <div
                      className={[
                        "overflow-hidden rounded-2xl transition-all duration-500 ease-out",
                        isActive
                          ? "scale-100 opacity-100 shadow-2xl ring-2 ring-primary/20"
                          : "scale-[0.88] opacity-40",
                      ].join(" ")}
                    >
                      <GalleryDialog
                        trigger={
                          <div className="group relative cursor-pointer">
                            <div className="relative aspect-[4/3] w-full">
                              <Image
                                src={slide.src}
                                alt={slide.caption || ""}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 72vw, (max-width: 768px) 55vw, 46vw"
                                priority={i === 0}
                                draggable={false}
                              />
                              {/* Magnifying glass overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                                <div className="flex h-14 w-14 scale-0 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-100">
                                  <svg
                                    className="h-6 w-6 text-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        images={slides}
                        initialIndex={i}
                        title="��римеры записей с прибора"
                      />
                      <div className="flex items-center justify-center bg-foreground/90 px-4 py-3">
                        <p className="truncate text-center text-sm font-semibold text-background md:text-base">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Предыдущая запись"
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-md ring-1 ring-border backdrop-blur-sm transition-colors hover:bg-muted sm:left-6 md:left-8"
          >
            <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label="Следующая запись"
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-md ring-1 ring-border backdrop-blur-sm transition-colors hover:bg-muted sm:right-6 md:right-8"
          >
            <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Слайды">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Запись ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "w-6 bg-primary"
                  : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
