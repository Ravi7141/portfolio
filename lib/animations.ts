
import { Variants } from "framer-motion"

// Apple-like smooth easing
export const EASE = [0.22, 1, 0.36, 1] as const // Custom cubic-bezier (easeOut)
export const SPRING = { type: "spring", stiffness: 100, damping: 20 } as const

// --- Wrappers ---

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

// --- Element Animations ---

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE }
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE }
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE }
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE }
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE }
  },
}

// --- Text Animations ---

export const textRevealContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const textRevealItem: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: EASE }
  },
}

// --- Interactions ---

export const hoverScale: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  },
}

export const hoverLift: Variants = {
    hover: {
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
    }
}

// --- Viewport Config ---

export const viewportConfig = {
  once: true,
  margin: "-10% 0px -10% 0px", // Trigger when element is 10% inside viewport
}
