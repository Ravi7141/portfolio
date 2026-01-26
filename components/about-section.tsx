"use client"

import { useRef } from "react"
import { m, useInView } from "framer-motion"
import { VelocityScroll } from "@/components/velocity-scroll"
import { fadeUp, viewportConfig, textRevealContainer, textRevealItem } from "@/lib/animations"

interface AboutSectionProps {
  setCursorVariant: (variant: string) => void
}

export function AboutSection({ setCursorVariant }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null)

  const words = [
    "I'm",
    "Ravi,",
    "a",
    "Java",
    "Backend",
    "Developer",
    "specializing",
    "in",
    "building",
    "RESTful",
    "APIs",
    "and",
    "scalable",
    "backend",
    "systems",
    "using",
    "Java",
    "and",
    "Spring",
    "Boot.",
    "Certified",
    "by",
    "Oracle",
    "and",
    "passionate",
    "about",
    "clean",
    "architecture",
    "and",
    "database",
    "design.",
  ]

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen flex items-center justify-center px-4 py-20 md:py-32 overflow-hidden">

      {/* Velocity Scroll Background */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-5 pointer-events-none select-none">
        <VelocityScroll text="BACKEND • JAVA • SPRING BOOT • API •" default_velocity={2} className="text-6xl md:text-9xl font-black text-foreground" />
      </div>

      <div className="max-w-5xl mx-auto z-10">
        {/* Section label */}
        <m.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <span className="text-primary font-mono text-sm tracking-widest">{"// 001"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            ABOUT<span className="text-primary">.</span>
          </h2>
        </m.div>

        {/* Animated paragraph */}
        <m.p
          className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed"
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={() => setCursorVariant("default")}
          variants={textRevealContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          {words.map((word, index) => (
            <m.span
              key={index}
              className={`inline-block mr-[0.3em] ${["Java", "Spring", "Boot.", "Backend", "RESTful", "APIs", "Oracle"].includes(word)
                ? "text-primary font-semibold"
                : "text-foreground"
                }`}
              variants={textRevealItem}
              whileHover={{
                scale: 1.1,
                color: "var(--primary)",
                transition: { duration: 0.2 },
              }}
            >
              {word}
            </m.span>
          ))}
        </m.p>

        {/* Stats */}
        <m.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          {[
            { number: "15+", label: "Skills Mastered" },
            { number: "2026", label: "Graduation" },
            { number: "Oracle", label: "Certified" },
            { number: "Java", label: "Specialist" },
          ].map((stat, index) => (
            <m.div
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
              <m.span
                className="text-4xl md:text-5xl font-bold text-primary"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={viewportConfig}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              >
                {stat.number}
              </m.span>
              <p className="mt-2 text-sm font-mono text-muted-foreground tracking-wider">{stat.label}</p>
            </m.div>
          ))}
        </m.div>

        {/* Decorative number */}
        <m.div
          className="absolute right-10 top-1/2 text-[20vw] font-bold text-muted/5 select-none pointer-events-none"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 1 }}
        >
          01
        </m.div>
      </div>
    </section>

  )
}
