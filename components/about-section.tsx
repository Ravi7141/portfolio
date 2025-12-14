"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { VelocityScroll } from "@/components/velocity-scroll"

interface AboutSectionProps {
  setCursorVariant: (variant: string) => void
}

export function AboutSection({ setCursorVariant }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const words = [
    "I'm",
    "Aditya,",
    "a",
    "Full",
    "Stack",
    "Developer",
    "building",
    "scalable",
    "and",
    "user-friendly",
    "web",
    "applications",
    "using",
    "the",
    "MERN",
    "stack.",
    "Passionate",
    "about",
    "modern",
    "web",
    "systems,",
    "clean",
    "design,",
    "and",
    "data",
    "security.",
  ]

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen flex items-center justify-center px-4 py-20 md:py-32 overflow-hidden">

      {/* Velocity Scroll Background */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-5 pointer-events-none select-none">
        <VelocityScroll text="VISIONARY • INNOVATOR • CREATOR •" default_velocity={2} className="text-6xl md:text-9xl font-black text-foreground" />
      </div>

      <div className="max-w-5xl mx-auto z-10">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-widest">{"// 001"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            ABOUT<span className="text-primary">.</span>
          </h2>
        </motion.div>

        {/* Animated paragraph */}
        <motion.p
          className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed"
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-[0.3em] ${["Full", "Stack", "Developer", "MERN", "scalable", "Passionate"].includes(word)
                ? "text-primary font-semibold"
                : "text-foreground"
                }`}
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{
                delay: index * 0.03,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                color: "var(--primary)",
                transition: { duration: 0.2 },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          {[
            { number: "20+", label: "Skills Mastered" },
            { number: "2026", label: "Graduation" },
            { number: "B.Tech", label: "CSE" },
            { number: "MERN", label: "Specialist" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                borderColor: "hsl(var(--primary))",
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)",
              }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <motion.span
                className="text-4xl md:text-5xl font-bold text-primary"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.span>
              <p className="mt-2 text-sm font-mono text-muted-foreground tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative number */}
        <motion.div
          className="absolute right-10 top-1/2 text-[20vw] font-bold text-muted/5 select-none pointer-events-none"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          01
        </motion.div>
      </div>
    </section>

  )
}
