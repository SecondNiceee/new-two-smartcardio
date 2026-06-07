"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/* --- Brand logos (white glyph, used on colored tiles) --- */

function AppStoreLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

function GooglePlayLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  )
}

function RuStoreLogo() {
  return <Image src="/media/stores/rustore.svg" alt="" width={44} height={44} className="h-11 w-11 rounded-lg" />
}

function AppGalleryLogo() {
  return <Image src="/media/stores/appgallery.svg" alt="" width={44} height={44} className="h-11 w-11 rounded-lg" />
}

type StoreItem = {
  name: string
  caption: string
  href: string
  tile?: string
  logo: ReactNode
  /** when true, the logo is a full-color image that already includes its own tile background */
  fullTile?: boolean
}

const stores: StoreItem[] = [
  {
    name: "TestFlight",
    caption: "Загрузить в",
    href: "#",
    tile: "bg-gradient-to-br from-sky-500 to-blue-600",
    logo: <AppStoreLogo />,
  },
  {
    name: "Google Play",
    caption: "Доступно в",
    href: "#",
    tile: "bg-gradient-to-br from-emerald-500 to-green-600",
    logo: <GooglePlayLogo />,
  },
  {
    name: "RuStore",
    caption: "Установите из",
    href: "#",
    logo: <RuStoreLogo />,
    fullTile: true,
  },
  {
    name: "AppGallery",
    caption: "Скачайте в",
    href: "#",
    logo: <AppGalleryLogo />,
    fullTile: true,
  },
]

export function DownloadDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Скачайте приложение СмартКардио®</DialogTitle>
          <DialogDescription className="text-center">
            Выберите магазин приложений для вашего устройства
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stores.map((store) => (
            <a
              key={store.name}
              href={store.href}
              className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted/60"
            >
              {store.fullTile ? (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                  {store.logo}
                </span>
              ) : (
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white ${store.tile}`}
                >
                  {store.logo}
                </span>
              )}
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-muted-foreground">{store.caption}</span>
                <span className="font-semibold text-foreground">{store.name}</span>
              </span>
            </a>
          ))}
        </div>
        
        {/* Apple instruction button */}
        <div className="mt-4 border-t border-border pt-4">
          <a
            href="#"
            className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Инструкция для Apple (скачать подробное видео)
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
