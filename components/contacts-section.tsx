const socials = [
  {
    name: "Научно-популярная медицина",
    href: "https://vk.com",
    network: "ВКонтакте",
    icon: "/media/icon-vk.svg",
  },
  {
    name: "Для врачей",
    href: "https://t.me",
    network: "Telegram",
    icon: "/media/icon-telegram.svg",
  },
  {
    name: "Наш блог",
    href: "https://dzen.ru",
    network: "Дзен",
    icon: "/media/icon-dzen.svg",
  },
]

export function ContactsSection() {
  return (
    <section
      id="contacts"
      className="relative bg-black py-16 md:py-24"
      style={{
        backgroundImage: "url('/media/footerBg.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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

        <div className="mx-auto mt-10 flex items-start justify-center gap-12">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} — ${social.network}`}
              className="group flex w-44 flex-col items-center gap-3"
            >
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent transition-transform duration-300 group-hover:-translate-y-1">
                <img src={social.icon} alt={social.network} className="h-10 w-10 object-contain" />
              </span>
              <span className="text-balance text-center text-sm font-bold text-white">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
