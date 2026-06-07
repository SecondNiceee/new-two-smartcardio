import Image from "next/image"

const socials = [
  {
    name: "Научно-популярная медицина",
    href: "https://vk.com",
    bg: "/media/social-vk.png",
    icon: "/media/icon-vk.svg",
    network: "ВКонтакте",
  },
  {
    name: "Для врачей",
    href: "https://t.me",
    bg: "/media/social-telegram.png",
    icon: "/media/icon-telegram.svg",
    network: "Telegram",
  },
  {
    name: "Наш блог",
    href: "https://dzen.ru",
    bg: "/media/social-dzen.png",
    icon: "/media/icon-dzen.svg",
    network: "Дзен",
  },
]

export function ContactsSection() {
  return (
    <section id="contacts" className="bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Наши контакты
          </h2>
          <a
            href="mailto:support@smartcardio.ru"
            className="mt-3 inline-block text-2xl font-semibold text-white/70 transition-colors hover:text-white md:text-3xl"
          >
            support@smartcardio.ru
          </a>
          <p className="mt-8 text-pretty text-xl font-medium text-white/90 md:text-2xl">
            Присоединяйтесь к нам в социальных сетях!
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} — ${social.network}`}
              className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 hover:ring-white/25"
            >
              <Image
                src={social.bg || "/placeholder.svg"}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />
              <div className="relative flex flex-col items-center gap-3 px-4 text-center">
                <Image
                  src={social.icon || "/placeholder.svg"}
                  alt=""
                  width={56}
                  height={56}
                  className="h-12 w-12 drop-shadow-lg md:h-14 md:w-14"
                />
                <span className="text-balance text-2xl font-bold text-white drop-shadow-md md:text-3xl">
                  {social.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
