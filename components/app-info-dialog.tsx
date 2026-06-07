"use client"

import { type ReactNode } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AppInfoDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <span className="mx-auto inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            Приложение
          </span>
          <DialogTitle className="mt-3 text-center text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Удобное приложение
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Image */}
          <div className="mx-auto w-full max-w-xs lg:w-[45%] lg:max-w-none lg:shrink-0">
            <Image
              src="/images/violations-detection.png"
              alt="Три смартфона с приложением СмартКардио, показывающие цветовую индикацию результатов: зеленый — норма, жёлтый — экстрасистолия, красный — фибрилляция предсердий"
              width={900}
              height={700}
              className="h-auto w-full"
            />
          </div>

          {/* Text content */}
          <div className="lg:flex-1">
            <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Удобное приложение с ИИ-диагностикой
            </h3>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              Приложение СмартКардио® — это простой и понятный инструмент для работы с кардиограммами. Оно мгновенно отображает запись ЭКГ, сохраняет все измерения в личном архиве и помогает отслеживать динамику и делиться данными с врачом. Встроенная ИИ-диагностика автоматически распознаёт широкий спектр нарушений ритма, а наглядная цветовая индикация помогает быстро понять результат.
            </p>

            {/* Color indicators */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                </div>
                <p className="font-semibold text-foreground">Норма</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                  <div className="h-4 w-4 rounded-full bg-yellow-500" />
                </div>
                <p className="font-semibold text-foreground">Внимание</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
                  <div className="h-4 w-4 rounded-full bg-red-500" />
                </div>
                <p className="font-semibold text-foreground">Тревога</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
