"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CustomCursorProps {
  variant: string
}

export function CustomCursor({ variant }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    },
    [cursorX, cursorY],
  )

  useEffect(() => {
    setIsVisible(true)
    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [moveCursor])

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "transparent",
      border: "2px solid var(--primary)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: "var(--primary)",
      border: "none",
      mixBlendMode: "difference" as const,
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: "var(--foreground)",
      border: "none",
      mixBlendMode: "difference" as const,
    },
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={variant}
        variants={variants}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1 h-1 bg-primary rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  )
}
