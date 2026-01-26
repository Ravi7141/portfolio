"use client"

import { motion } from "framer-motion"

export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Glitch text effect */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tighter">
            <motion.span
              className="inline-block"
              animate={{
                opacity: [1, 0.5, 1],
                x: [-2, 2, -2, 0],
              }}
              transition={{ duration: 0.15, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            >
              R
            </motion.span>
            <motion.span
              className="inline-block text-primary"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
            >
              .
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                opacity: [1, 0.5, 1],
                x: [2, -2, 2, 0],
              }}
              transition={{ duration: 0.15, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.8 }}
            >
              R
            </motion.span>
          </h1>

          {/* Glitch overlay layers */}
          <motion.div
            className="absolute inset-0 text-6xl md:text-8xl font-bold text-primary opacity-50"
            style={{ clipPath: "inset(40% 0 61% 0)" }}
            animate={{
              clipPath: ["inset(40% 0 61% 0)", "inset(92% 0 1% 0)", "inset(43% 0 1% 0)", "inset(25% 0 58% 0)"],
              x: [-2, 2, -2, 0],
            }}
            transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY }}
          >
            R.R
          </motion.div>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="mt-8 h-[2px] bg-muted overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-muted-foreground font-mono text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          INITIALIZING EXPERIENCE...
        </motion.p>
      </div>
    </motion.div>
  )
}
