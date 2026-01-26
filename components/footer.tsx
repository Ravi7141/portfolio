"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp, Heart, Home, Code2, Star, BookOpen, Zap, Ban, FileText } from "lucide-react"
import { useRef, useState } from "react"

const dockItems = [
  { icon: Home, href: "#hero", label: "Home" },
  { icon: Code2, href: "#projects", label: "Projects" },
  { icon: Star, href: "#about", label: "About" },
  { icon: BookOpen, href: "#experience", label: "Experience" },
  { icon: Zap, href: "#tech-stack", label: "Tech Stack" },
  { icon: Ban, href: "#contact", label: "Contact" },
  { icon: Mail, href: "mailto:rajputravi2070@gmail.com", label: "Email" },
  { icon: FileText, href: "/resume.pdf", label: "Resume" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/Ravi7141", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/ravi-rajput", label: "LinkedIn" },
]

export function Footer({ setCursorVariant }: { setCursorVariant: (variant: string) => void }) {
  const containerRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleMouseEnter = () => setCursorVariant("hover")
  const handleMouseLeave = () => setCursorVariant("default")

  // Calculate scale for dock magnification effect
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(hoveredIndex - index)
    if (distance === 0) return 1.5
    if (distance === 1) return 1.25
    if (distance === 2) return 1.1
    return 1
  }

  const getTranslateY = (index: number) => {
    if (hoveredIndex === null) return 0
    const distance = Math.abs(hoveredIndex - index)
    if (distance === 0) return -20
    if (distance === 1) return -12
    if (distance === 2) return -5
    return 0
  }

  return (
    <motion.footer
      ref={containerRef}
      style={{ y, opacity }}
      className="relative border-t border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden pt-16 pb-8"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none" />

      {/* Glowing orb */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Dock Navigation - macOS Style */}
        <div className="flex justify-center mb-16">
          <motion.div
            className="relative inline-flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dock items */}
            {dockItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative group flex flex-col items-center"
                onMouseEnter={() => {
                  setHoveredIndex(index)
                  handleMouseEnter()
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null)
                  handleMouseLeave()
                }}
                animate={{
                  scale: getScale(index),
                  y: getTranslateY(index),
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-800/95 backdrop-blur-md text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none border border-white/10"
                  initial={{ opacity: 0, y: 5, scale: 0.8 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 5,
                    scale: hoveredIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800/95" />
                </motion.div>

                {/* Icon container */}
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-700/60 backdrop-blur-sm border border-white/10 transition-all duration-200 group-hover:bg-neutral-600/70 group-hover:border-white/20">
                  <item.icon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />

                  {/* Reflection effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                </div>
              </motion.a>
            ))}

            {/* Divider */}
            <div className="w-px h-10 bg-white/20 mx-2" />

            {/* Social links */}
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex flex-col items-center"
                onMouseEnter={() => {
                  setHoveredIndex(dockItems.length + index)
                  handleMouseEnter()
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null)
                  handleMouseLeave()
                }}
                animate={{
                  scale: getScale(dockItems.length + index),
                  y: getTranslateY(dockItems.length + index),
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-800/95 backdrop-blur-md text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none border border-white/10"
                  initial={{ opacity: 0, y: 5, scale: 0.8 }}
                  animate={{
                    opacity: hoveredIndex === dockItems.length + index ? 1 : 0,
                    y: hoveredIndex === dockItems.length + index ? 0 : 5,
                    scale: hoveredIndex === dockItems.length + index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {social.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800/95" />
                </motion.div>

                {/* Icon container */}
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-700/60 backdrop-blur-sm border border-white/10 transition-all duration-200 group-hover:bg-neutral-600/70 group-hover:border-white/20">
                  <social.icon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider with animation */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-xs font-mono text-neutral-500 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="text-neutral-500">©</span>
            <span>{new Date().getFullYear()}</span>
            <span className="text-neutral-600">|</span>
            <span>Ravi Rajput</span>
            <span className="text-neutral-600">|</span>
            <span>Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </motion.span>
          </motion.p>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            whileHover={{ y: -2 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ArrowUp className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider group-hover:text-white transition-colors">
              Back to top
            </span>
          </motion.button>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <motion.h2
          className="text-[15vw] font-black text-white/[0.02] leading-none tracking-tighter text-center whitespace-nowrap"
          style={{ transform: "translateY(35%)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          RAVI RAJPUT
        </motion.h2>
      </div>
    </motion.footer>
  )
}
