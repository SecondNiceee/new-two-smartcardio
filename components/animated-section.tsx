"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

type AnimationDirection = "left" | "right" | "bottom" | "top"

interface AnimatedSectionProps {
  children: React.ReactNode
  direction?: AnimationDirection
  delay?: number
  className?: string
  as?: "section" | "div"
  id?: string
}

export function AnimatedSection({
  children,
  direction = "bottom",
  delay = 0,
  className,
  as: Component = "div",
  id,
}: AnimatedSectionProps) {
  const { ref, style } = useScrollAnimation({ direction, delay })

  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      style={style}
      className={cn(className)}
      id={id}
    >
      {children}
    </Component>
  )
}
