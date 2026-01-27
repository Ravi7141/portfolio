"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Home, User, Briefcase, Code2, Mail, Cpu, Sparkles } from "lucide-react"

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "tech-stack", icon: Code2, label: "Skills" },

  { id: "contact", icon: Mail, label: "Contact" },
]

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }

      setLastScrollY(currentScrollY)

      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = currentScrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x * 0.1)
    mouseY.set(y * 0.1)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHoveredIndex(null)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-[2px] rounded-full opacity-60"
            style={{
              background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Main container with magnetic effect */}
          <motion.div
            className="relative flex items-center gap-1 px-2 py-2 rounded-full border border-primary/30 bg-background/80 backdrop-blur-2xl overflow-hidden"
            style={{
              x: smoothX,
              y: smoothY,
            }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsExpanded(true)}
            onHoverEnd={() => setIsExpanded(false)}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at var(--x, 50%) var(--y, 50%), var(--primary) 0%, transparent 50%)",
              }}
              animate={
                {
                  "--x": hoveredIndex !== null ? `${(hoveredIndex / navItems.length) * 100}%` : "50%",
                } as any
              }
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Scanning line effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                opacity: 0.1,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Logo/Brand */}
            <motion.div
              className="relative px-3 py-2 rounded-full bg-primary/10 border border-primary/20 mr-2 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection("hero")}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>

            {/* Nav items */}
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              const isHovered = hoveredIndex === index

              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative px-3 py-2 rounded-full transition-colors group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Active/Hover background */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        layoutId="navHighlight"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, var(--primary), var(--primary)/50)"
                            : "var(--primary)/10",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isActive ? 1 : 0.5, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Glow effect for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/50 blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}

                  {/* Icon and label container */}
                  <div className="relative z-10 flex items-center gap-2">
                    <Icon
                      className={`w-4 h-4 transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                        }`}
                    />

                    {/* Expanded label */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`hidden md:block text-xs font-medium whitespace-nowrap overflow-hidden ${isActive ? "text-primary-foreground" : "text-muted-foreground"
                            }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tooltip on hover (when not expanded) */}
                  <AnimatePresence>
                    {isHovered && !isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-background/95 border border-primary/30 backdrop-blur-xl"
                      >
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">{item.label}</span>
                        {/* Tooltip arrow */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background/95 border-l border-t border-primary/30 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Ripple effect on click */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    whileTap={{
                      boxShadow: ["0 0 0 0 rgba(var(--primary-rgb), 0.4)", "0 0 0 20px rgba(var(--primary-rgb), 0)"],
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              )
            })}

            {/* Status indicator */}
            <motion.div
              className="relative ml-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden md:block text-xs font-medium text-emerald-500 whitespace-nowrap overflow-hidden"
                  >
                    Available
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Bottom reflection */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full bg-primary/20 blur-xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
