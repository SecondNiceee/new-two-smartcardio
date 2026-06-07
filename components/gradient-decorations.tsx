"use client"

import { useEffect, useState } from "react"

/**
 * The SmartCardio brand logo (the same PNG used in the header), rendered in
 * monochrome. We use the PNG as a CSS mask so the shape comes from the image's
 * alpha channel while the fill color comes from `currentColor` (inherited from
 * the parent's text color, e.g. text-primary/[0.05]). The logo is wider than it
 * is tall, so the box uses an aspect ratio and the mask is sized to contain.
 */
function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/media/logo.png)",
        maskImage: "url(/media/logo.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  )
}

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

      {/* Rings + centered brand logo - top right (primary purple) */}
      <div className="absolute -right-24 -top-24 h-[420px] w-[420px] text-primary/[0.05] md:h-[520px] md:w-[520px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
        </svg>
        <LogoMark className="absolute left-1/2 top-1/2 h-[28%] w-[44%] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Rings + centered ECG line - bottom left (teal accent) */}
      <svg
        className="absolute -left-28 bottom-[8%] h-[360px] w-[360px] text-accent/[0.06] md:h-[460px] md:w-[460px]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="68" stroke="currentColor" strokeWidth="1" />
        {/* ECG line centered at y=100, symmetric across x=100 (40 -> 160) */}
        <path
          d="M40 100 H78 l8 -26 8 52 9 -38 7 26 H122 l8 -14 8 14 H160"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Standalone brand logos inside small rings */}
      <div className="absolute right-[12%] top-[26%] h-16 w-16 text-accent/[0.09]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <LogoMark className="absolute left-1/2 top-1/2 h-[34%] w-[56%] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="absolute left-[18%] top-[68%] h-12 w-12 text-primary/[0.07]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <LogoMark className="absolute left-1/2 top-1/2 h-[34%] w-[56%] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="absolute right-[24%] bottom-[14%] h-14 w-14 text-accent/[0.08]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <LogoMark className="absolute left-1/2 top-1/2 h-[34%] w-[56%] -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}
