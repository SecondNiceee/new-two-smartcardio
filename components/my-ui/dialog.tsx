"use client"

import React, { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  // Lock body scroll when open — only restore on cleanup (unmount or close)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Find trigger and content among children
  const childArray = React.Children.toArray(children)
  const trigger = childArray.find(
    (child) => React.isValidElement(child) && child.type === DialogTrigger
  )
  const content = childArray.find(
    (child) => React.isValidElement(child) && child.type === DialogContent
  )

  return (
    <>
      {/* Always render trigger */}
      {trigger}
      
      {/* Only render portal when open */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => onOpenChange(false)}
            />
            {/* Content */}
            {content}
          </div>,
          document.body
        )}
    </>
  )
}

type DialogContentProps = {
  children: ReactNode
  className?: string
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

type DialogTriggerProps = {
  children: ReactNode
  onClick: () => void
  asChild?: boolean
}

export function DialogTrigger({ children, onClick, asChild }: DialogTriggerProps) {
  if (asChild) {
    // Clone child and add onClick
    const child = children as React.ReactElement
    return (
      <>
        {React.cloneElement(child, {
          onClick: (e: React.MouseEvent) => {
            onClick()
            child.props?.onClick?.(e)
          },
        })}
      </>
    )
  }

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}
