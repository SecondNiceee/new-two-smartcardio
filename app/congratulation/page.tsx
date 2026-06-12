import Image from "next/image"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CongratulationPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-center">
      {/* Background device image */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <Image
          src="/images/device-hero.png"
          alt=""
          width={800}
          height={800}
          className="h-auto w-full max-w-3xl object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg">
        <CheckCircle className="h-16 w-16 text-primary" strokeWidth={1.5} />

        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
          Заказ успешно оформлен!
        </h1>

        <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
          Подробности заказа и информация о доставке отправлены на вашу электронную почту.
        </p>

        <p className="text-sm text-muted-foreground">
          Мы&nbsp;свяжемся с вами в ближайшее время для подтверждения.
        </p>

        <Button asChild size="lg" className="mt-2">
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </main>
  )
}
