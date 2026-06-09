const socials = [
  {
    name: "Научно-популярная медицина",
    href: "https://vk.com",
    network: "ВКонтакте",
  },
  {
    name: "Для врачей",
    href: "https://t.me",
    network: "Telegram",
  },
  {
    name: "Наш блог",
    href: "https://dzen.ru",
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

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} — ${social.network}`}
              className="group flex flex-col items-center gap-3"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-1 md:h-20 md:w-20" />
              <span className="text-balance text-center text-sm font-bold text-white md:text-base">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
