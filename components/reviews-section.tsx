"use client"

import { useState, useEffect, useCallback } from "react"
import { ResponsivePicture } from "@/components/responsive-picture"
import useEmblaCarousel from "embla-carousel-react"
import { Star, MessageSquarePlus } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ReviewDialog } from "@/components/review-dialog"

type Review = {
  id: string
  name: string
  source: string
  rating: number
  text: string
  initials: string
}

const reviews: Review[] = [
  {
    id: "olga",
    name: "Ольга Е.",
    source: "Яндекс.Маркет",
    rating: 5,
    initials: "О",
    text: "Прибор очень понравился, мне как врачу очень важно, что шесть отведений, и есть дополнительная информация с пульсовой волной и сатурацией. В целом интуитивно понятно, как пользоваться.",
  },
  {
    id: "sergey-o",
    name: "Сергей Овчинников",
    source: "Email",
    rating: 5,
    initials: "С",
    text: "Купил прибор папе для контроля аритмии — это было лучшее вложение средств за последние месяцы. Полностью ушла тревога и неизвестность по поводу его ритма, а также проблемы с тем, как записать плёнку для врача.",
  },
  {
    id: "anon-ecg",
    name: "Пользователь",
    source: "Email",
    rating: 5,
    initials: "П",
    text: "После проблем с сердцем врач посоветовал регулярно проверять ЭКГ. СмартКардио® стал настоящим спасением — не нужно тратить время на походы в больницу. Всё делается за пару минут дома. Приложение сохраняет данные для врача.",
  },
  {
    id: "viktor",
    name: "Виктор С.",
    source: "Email",
    rating: 5,
    initials: "В",
    text: "СмартКардио® приятно удивил своей точностью. Уже несколько раз сверял результаты с больничным ЭКГ — данные совпадают! Очень простое управление, всё понятно и интуитивно. Пять звёзд!",
  },
  {
    id: "gennady",
    name: "Геннадий В.",
    source: "Яндекс.Маркет",
    rating: 5,
    initials: "Г",
    text: "Аппарат прекрасен. Отлично снимает кардиограмму. Куплен на маркете у продавца СмартКардио®. Рекомендую.",
  },
  {
    id: "veronika",
    name: "Вероника Юрьевна",
    source: "Яндекс.Маркет",
    rating: 5,
    initials: "В",
    text: "Лёгкий, удобный, быстрый, результат сразу в телефоне! Для меня это мега удобно, я ещё не встречала такого прибора в онлайн-магазинах. Недостатков нет.",
  },
  {
    id: "michael",
    name: "Михаил А.",
    source: "Яндекс.Маркет",
    rating: 5,
    initials: "М",
    text: "Отличный, очень нужный прибор. Внучке посоветовали в НИИ педиатрии приобрести смарт-кардио. Прибор оказался очень удобным и простым в использовании. Никаких присосок и проводов не нужно. Только мобильный телефон и регистрируй ЭКГ и частоту пульса.",
  },
  {
    id: "darya",
    name: "Дарья К.",
    source: "Email",
    rating: 5,
    initials: "Д",
    text: "Пользоваться прибором очень удобно, он компактный, всегда под рукой, долго держит зарядку. Огромное спасибо службе поддержки, которая оперативно помогла установить приложение.",
  },
  {
    id: "natalya",
    name: "Наталья П.",
    source: "Яндекс.Маркет",
    rating: 5,
    initials: "Н",
    text: "Использую уже полгода. Прибор компактный, заряда хватает надолго. Очень удобно брать с собой в дорогу. Показания совпадают с результатами стационарного ЭКГ в поликлинике.",
  },
  {
    id: "andrey",
    name: "Андрей М.",
    source: "Google Play",
    rating: 5,
    initials: "А",
    text: "Отличный гаджет для домашнего контроля сердца. Простое подключение к смартфону, приложение понятное. За два месяца использования ни одного сбоя. Рекомендую всем, кто следит за здоровьем.",
  },
  {
    id: "tamara",
    name: "Тамара Г.",
    source: "Email",
    rating: 5,
    initials: "Т",
    text: "Купила маме на 70-летие. Она сама разобралась за 15 минут — говорит, что всё очень просто. Теперь снимает ЭКГ каждое утро и показывает результаты кардиологу на приёме. Врач доволен.",
  },
  {
    id: "igor",
    name: "Игорь Н.",
    source: "RuStore",
    rating: 5,
    initials: "И",
    text: "Занимаюсь спортом и слежу за сердечным ритмом. СмартКардио® даёт полноценное ЭКГ, а не просто пульс, как обычные фитнес-браслеты. Это совсем другой уровень информации о состоянии сердца.",
  },
  {
    id: "svetlana",
    name: "Светлана Р.",
    source: "Email",
    rating: 5,
    initials: "С",
    text: "После перенесённой болезни врач порекомендовал регулярно проверять ЭКГ. Этот прибор — находка. Не нужно каждый раз ехать в больницу, всё можно сделать дома за пару минут. Результат сохраняется в PDF.",
  },
  {
    id: "valentina",
    name: "Валентина К.",
    source: "Яндекс.Маркет",
    rating: 5,
    initials: "В",
    text: "Дочка помогла установить приложение, и теперь я сама снимаю ЭКГ и отправляю врачу через мессенджер. Очень современно и удобно! Внешне компактный и красивый, в работе — надёжный и точный.",
  },
  {
    id: "roman",
    name: "Роман Д.",
    source: "Email",
    rating: 5,
    initials: "Р",
    text: "Отличная альтернатива походу в поликлинику. Результаты сравнимы с профессиональным оборудованием. Прибор держу в кармане пиджака — небольшой и лёгкий. Пользуюсь уже больше года.",
  },
  {
    id: "ludmila",
    name: "Людмила Ф.",
    source: "Google Play",
    rating: 5,
    initials: "Л",
    text: "Купила после того, как стало пошаливать сердце. Очень рада покупке: теперь вижу, когда аритмия, а когда всё в норме. Спокойнее стало на душе. Приложение понятное, поддержка отвечает быстро.",
  },
  {
    id: "pavel",
    name: "Павел С.",
    source: "Email",
    rating: 5,
    initials: "П",
    text: "Использую для ежедневного мониторинга. Данные за несколько месяцев видны в истории — удобно отслеживать динамику и показывать врачу сразу архив, а не один снимок. Функция сатурации тоже пригодилась.",
  },
  {
    id: "elena-v",
    name: "Елена В.",
    source: "Email",
    rating: 5,
    initials: "Е",
    text: "Заказала для отца, который живёт в другом городе. Теперь он присылает мне результаты ЭКГ, и я сразу вижу, как у него дела с сердцем. Прибор прост в использовании даже для пожилых.",
  },
  {
    id: "denis",
    name: "Денис А.",
    source: "Яндекс.Маркет",
    rating: 5,
    initials: "Д",
    text: "Как человек с мерцательной аритмией, я очень ценю возможность снять ЭКГ прямо в момент приступа. Прибор реально помог поймать эпизод, который врач увидел и скорректировал лечение. Это бесценно.",
  },
  {
    id: "irina",
    name: "Ирина Б.",
    source: "RuStore",
    rating: 5,
    initials: "И",
    text: "Прибор маленький, но очень функциональный. Качество ЭКГ отличное — кардиолог сразу признал, что запись чёткая и пригодна для диагностики. Заряжается быстро, аккумулятора хватает надолго.",
  },
  {
    id: "konstantin",
    name: "Константин Л.",
    source: "Email",
    rating: 5,
    initials: "К",
    text: "Долго выбирал между разными приборами. Остановился на СмартКардио® из-за 6 отведений — это не игрушка, а полноценный кардиограф. За три месяца использования полностью доволен покупкой.",
  },
  {
    id: "marina",
    name: "Марина О.",
    source: "Email",
    rating: 5,
    initials: "М",
    text: "Мой кардиолог сам посоветовал этот прибор. Теперь прихожу на приём уже с готовой историей ЭКГ за месяц — врач очень доволен качеством записи.",
  },
  {
    id: "aleksey",
    name: "Алексей Т.",
    source: "Google Play",
    rating: 5,
    initials: "А",
    text: "Купил себе и жене. Пользуемся каждый вечер. Удобно, что приложение хранит все записи и можно сравнивать. После нагрузки, после кофе, в покое — видно всё. Очень познавательно и полезно для здоровья.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка: ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const { ref, style } = useScrollAnimation({ direction: "bottom" })

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

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
    <section
      id="reviews"
      ref={ref as React.RefObject<HTMLElement>}
      style={style}
      className="overflow-x-hidden py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Two-column layout: photo left, reviews right */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-12">
          {/* Photo (left, desktop) */}
          <div className="order-1 hidden lg:block">
            <div className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <ResponsivePicture
                src="/images/review-customer.png"
                alt="Покупатель СмартКардио держит прибор в руке"
                className="h-full w-full"
                imgStyle={{ objectPosition: "-53px center" }}
                width={420}
                height={600}
              />
            </div>
          </div>

          {/* Reviews (right) */}
          <div className="order-2 min-w-0 flex flex-col">
            {/* Heading */}
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                Отзывы
              </span>
              <h2 className="mt-6 text-pretty text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Отзывы наших ��окупателей
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Реальные истории людей, которые уже заботятся о своём сердце вместе со СмартКардио®
              </p>
            </div>

            <div className="mt-8 flex-1 flex flex-col">
            <div className="relative">
              {/* Navigation arrows */}
              <button
                onClick={scrollPrev}
                aria-label="Предыдущий отзыв"
                className="absolute left-0 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition-colors hover:bg-background md:flex"
              >
                <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                aria-label="Следующий отзыв"
                className="absolute right-0 top-1/2 z-20 hidden translate-x-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition-colors hover:bg-background md:flex"
              >
                <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Carousel Track */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex will-change-transform">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="min-w-0 shrink-0 grow-0 basis-[90%] pl-4 sm:basis-[55%] xl:basis-[48%]"
                    >
                      <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold text-base">
                            {review.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground truncate">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.source}</p>
                          </div>
                        </div>

                        {/* Stars */}
                        <StarRating rating={review.rating} />

                        {/* Text */}
                        <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                          &laquo;{review.text}&raquo;
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Слайды">
                {reviews.map((r, i) => (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={i === selectedIndex}
                    aria-label={`Перейти к отзыву ${i + 1}`}
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

            {/* Photo (mobile only, below carousel) */}
            <div className="mt-6 block lg:hidden">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <ResponsivePicture
                  src="/images/review-customer.png"
                  alt="Покупатель СмартКардио держит прибор в руке"
                  className="h-96 w-full"
                  imgStyle={{ objectPosition: "top" }}
                  width={420}
                  height={400}
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <ReviewDialog
                trigger={
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap sm:px-7 sm:py-3 sm:text-sm"
                  >
                    <MessageSquarePlus className="h-4 w-4" />
                    Оставить свой отзыв
                  </button>
                }
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
