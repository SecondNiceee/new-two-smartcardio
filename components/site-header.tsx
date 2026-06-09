"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DownloadDialog } from "@/components/download-dialog"
import { AppInfoDialog } from "@/components/app-info-dialog"

const navItems = [
  { label: "Как это работает", href: "#how" },
  { label: "Инструкция", href: "#instruction" },
  { label: "Контакты", href: "#contact" },
]

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-2 shadow-md">
            <Image
              src="/media/logo.png"
              alt="Логотип СмартКардио"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Смарт<span className="text-white/70">Кардио</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AppInfoDialog
            trigger={
              <Button
                variant="ghost"
                className="hidden text-white/80 hover:bg-white/10 hover:text-white md:flex"
              >
                Приложение
              </Button>
            }
          />
          <Button
            asChild
            className="bg-white text-foreground hover:bg-white/90"
          >
            <a href="#contact">Заказать прибор</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
