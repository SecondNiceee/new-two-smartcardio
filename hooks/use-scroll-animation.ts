"use client"

import { useEffect, useRef } from "react"

type AnimationDirection = "left" | "right" | "bottom" | "top"

interface UseScrollAnimationOptions {
  direction?: AnimationDirection
  threshold?: number
  delay?: number
}

// CSS классы для анимации добавляются через JS после монтирования,
// поэтому серверный HTML всегда полностью видимый (для ботов/краулеров).
// Анимация работает через CSS transition + класс "scroll-animated".
export function useScrollAnimation({
  direction = "bottom",
  threshold = 0.15,
  delay = 0,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Уважаем prefers-reduced-motion — анимацию не запускаем
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    // Добавляем CSS-переменную направления и класс "will-animate"
    // только на клиенте — сервер видит чистый HTML без скрытого контента
    const directionMap: Record<AnimationDirection, string> = {
      bottom: "translateY(60px)",
      top: "translateY(-60px)",
      left: "translateX(-60px)",
      right: "translateX(60px)",
    }

    element.style.setProperty("--sa-transform", directionMap[direction])
    element.classList.add("will-animate")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const trigger = () => {
            element.classList.add("scroll-animated")
            element.classList.remove("will-animate")
          }
          if (delay > 0) {
            setTimeout(trigger, delay)
          } else {
            trigger()
          }
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin: "-40px 0px" }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [direction, threshold, delay])

  return { ref }
}
