"use client"

import { useEffect, useState } from "react"

export function GradientDecorations() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay rendering until after LCP (idle callback or timeout)
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      ;(window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
        setIsVisible(true)
      })
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeout = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timeout)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle dot grid - primary purple, very light */}
      <svg className="absolute inset-0 h-full w-full text-primary/[0.04]">
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Concentric rotated squares - top right (primary purple) */}
      <svg
        className="absolute -right-24 -top-24 h-[420px] w-[420px] rotate-12 text-primary/[0.05] md:h-[520px] md:w-[520px]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <rect x="14" y="14" width="172" height="172" rx="24" stroke="currentColor" strokeWidth="1" />
        <rect x="40" y="40" width="120" height="120" rx="18" stroke="currentColor" strokeWidth="1" />
        <rect x="66" y="66" width="68" height="68" rx="12" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Long ECG / heartbeat line - bottom left (teal accent) */}
      <svg
        className="absolute -left-28 bottom-[8%] h-[360px] w-[360px] text-accent/[0.06] md:h-[460px] md:w-[460px]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M10 110 H58 l8 -30 9 60 9 -44 7 30 H128 l8 -16 8 16 H200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 150 H70 l6 -16 6 16 H200"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Hexagon - top right area (teal accent) */}
      <svg
        className="absolute right-[12%] top-[26%] h-16 w-16 text-accent/[0.10] md:h-20 md:w-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* Plus / cross mark (primary purple) */}
      <svg
        className="absolute left-[18%] top-[68%] h-12 w-12 rotate-12 text-primary/[0.08]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 18 V82 M18 50 H82"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      {/* Triangle outline (teal accent) */}
      <svg
        className="absolute right-[24%] bottom-[14%] h-14 w-14 -rotate-6 text-accent/[0.09]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,12 90,84 10,84" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

