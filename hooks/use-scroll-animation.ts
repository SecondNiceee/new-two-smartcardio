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
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated) return

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
  }, [threshold, delay, hasAnimated])

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

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0)" : getTransform(),
    transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }

  return { ref, style, isVisible }
}
