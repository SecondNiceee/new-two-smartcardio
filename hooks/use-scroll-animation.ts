"use client"

import { useEffect, useRef, useState } from "react"

type AnimationDirection = "left" | "right" | "bottom" | "top"

interface UseScrollAnimationOptions {
  direction?: AnimationDirection
  threshold?: number
  delay?: number
}

export function useScrollAnimation({
  direction = "bottom",
  threshold = 0.15,
  delay = 0,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  // Стартуем как "не анимировано". Анимацию включаем только после монтирования
  // на клиенте, чтобы серверный HTML (который видят боты и краулеры) всегда
  // содержал полностью видимый контент.
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [animationEnabled, setAnimationEnabled] = useState(false)

  useEffect(() => {
    // Уважаем настройку пользователя «уменьшить движение» — анимацию не запускаем
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      setHasAnimated(true)
      return
    }

    setAnimationEnabled(true)
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated || !animationEnabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              setHasAnimated(true)
            }, delay)
          } else {
            setIsVisible(true)
            setHasAnimated(true)
          }
          observer.unobserve(element)
        }
      },
      { 
        threshold,
        rootMargin: "-50px 0px"
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, delay, hasAnimated, animationEnabled])

  const getTransform = () => {
    switch (direction) {
      case "left":
        return "translateX(-80px)"
      case "right":
        return "translateX(80px)"
      case "top":
        return "translateY(-80px)"
      case "bottom":
      default:
        return "translateY(80px)"
    }
  }

  // Пока анимация не включена (серверный HTML, боты, отключённый JS,
  // prefers-reduced-motion) контент всегда полностью видим и без сдвига.
  const shouldHide = animationEnabled && !isVisible

  const style: React.CSSProperties = {
    opacity: shouldHide ? 0 : 1,
    transform: shouldHide ? getTransform() : "translate(0, 0)",
    transition: animationEnabled
      ? "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      : undefined,
  }

  return { ref, style, isVisible }
}
