"use client"

import { useState, useCallback, useEffect, type ReactNode } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/my-ui/dialog"

export type GalleryImage = {
  src: string
  caption?: string
}

type GalleryDialogProps = {
  trigger: ReactNode
  images: GalleryImage[]
  initialIndex?: number
  title?: string
}

export function GalleryDialog({
  trigger,
  images,
  initialIndex = 0,
  title = "Галерея изображений",
}: GalleryDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    skipSnaps: false,
    startIndex: initialIndex,
  })

  // Reset to initial index when dialog opens
  useEffect(() => {
    if (open && emblaApi) {
      emblaApi.scrollTo(initialIndex, true)
      setSelectedIndex(initialIndex)
    }
  }, [open, initialIndex, emblaApi])

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

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollPrev()
      } else if (e.key === "ArrowRight") {
        scrollNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, scrollPrev, scrollNext])

  const currentImage = images[selectedIndex]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0">
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-30 flex cursor-pointer items-center gap-2.5 rounded-full bg-white/10 px-5 py-3 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-6 md:top-6 md:px-6 md:py-3.5 md:text-lg"
        >
          <svg
            className="h-6 w-6 md:h-7 md:w-7"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="hidden sm:inline">Выйти</span>
        </button>

        {/* Main container */}
        <div className="relative flex h-[100dvh] w-[100vw] flex-col">
          {/* Embla carousel */}
          <div className="relative flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex h-full touch-pan-y">
              {images.map((image, i) => (
                <div
                  key={i}
                  className="relative min-w-0 shrink-0 grow-0 basis-full"
                >
                  <div className="flex h-full items-center justify-center px-4 py-16 md:px-16 md:py-20">
                    <Image
                      src={image.src}
                      alt={image.caption || `Изображение ${i + 1}`}
                      width={1920}
                      height={1080}
                      className="h-screen w-auto max-w-[95vw] object-contain"
                      sizes="95vw"
                      priority={i === initialIndex}
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                aria-label="Предыдущее изображение"
                className="absolute left-2 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-4 md:h-16 md:w-16"
              >
                <svg
                  className="h-7 w-7 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                aria-label="Следующее изображение"
                className="absolute right-2 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-4 md:h-16 md:w-16"
              >
                <svg
                  className="h-7 w-7 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Caption and counter at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-6 pt-12">
            {currentImage?.caption && (
              <p className="mb-3 text-center text-base font-medium text-white md:text-lg">
                {currentImage.caption}
              </p>
            )}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Перейти к изображению ${i + 1}`}
                    className={[
                      "h-2.5 cursor-pointer rounded-full transition-all duration-300",
                      i === selectedIndex
                        ? "w-6 bg-white"
                        : "w-2.5 bg-white/40 hover:bg-white/60",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
