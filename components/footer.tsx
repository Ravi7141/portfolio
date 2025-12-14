"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp, Heart, Zap } from "lucide-react"
import { useRef, useState } from "react"

const socialLinks = [
  { icon: Github, href: "https://github.com/ADITYA0018TH", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/adityaraj", label: "LinkedIn" },
  { icon: Mail, href: "mailto:adityaraj@example.com", label: "Email" },
]

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#tech-stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Footer({ setCursorVariant }: { setCursorVariant: (variant: string) => void }) {
  const containerRef = useRef<HTMLElement>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.footer
      ref={containerRef}
      style={{ y, opacity }}
      className="relative border-t border-cyan-500/20 bg-black/80 backdrop-blur-xl overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute -top-20 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute -bottom-20 right-1/4 w-60 h-60 bg-purple-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand section */}
          <div className="space-y-6">
            <motion.div className="relative inline-block" whileHover={{ scale: 1.02 }}>
              <h3 className="text-3xl font-black tracking-tighter">
                <span className="text-cyan-400">ADITYA</span>
                <span className="text-white">.RAJ</span>
              </h3>
              <motion.div
                className="absolute -bottom-1 left-0 h-[2px] bg-linear-to-r from-cyan-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-mono">
              Building the future, one pixel at a time.
              <span className="text-cyan-400"> Full Stack Developer</span> obsessed with creating scalable systems
              that push boundaries.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.4)", "0 0 0 8px rgba(74, 222, 128, 0)"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Available for work</span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em]">Navigation</h4>
            <nav className="grid grid-cols-2 gap-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative group"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => {
                    setCursorVariant("text")
                    setHoveredLink(link.label)
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default")
                    setHoveredLink(null)
                  }}
                >
                  <span className="text-neutral-400 text-sm font-medium transition-colors group-hover:text-cyan-400">
                    {link.label}
                  </span>
                  <motion.span
                    className="absolute -left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xs"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{
                      opacity: hoveredLink === link.label ? 1 : 0,
                      x: hoveredLink === link.label ? 0 : -5,
                    }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Social links */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em]">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="relative p-3 border border-neutral-800 rounded-xl bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10">
                    <social.icon className="w-5 h-5 text-neutral-400 transition-colors group-hover:text-cyan-400" />

                    {/* Glow effect */}
                    <motion.div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Tooltip */}
                  <motion.span
                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-cyan-500 text-black text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    initial={{ y: 5 }}
                    whileHover={{ y: 0 }}
                  >
                    {social.label}
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center gap-2 mt-6"
              whileHover={{ x: 5 }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="p-2 border border-neutral-800 rounded-lg bg-neutral-900/50 transition-all group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10">
                <ArrowUp className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                Back to top
              </span>
            </motion.button>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-linear-to-r from-cyan-400 to-transparent"
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-xs font-mono text-neutral-600 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="text-neutral-500">©</span>
            <span>{new Date().getFullYear()}</span>
            <span className="text-neutral-700">|</span>
            <span>Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </motion.span>
            <span>&</span>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            >
              <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            </motion.span>
            <span>by</span>
            <span className="text-cyan-400 font-semibold">Aditya Raj</span>
          </motion.p>

          {/* Tech badges */}
          <div className="flex items-center gap-2">
            {["Next.js", "Framer", "Tailwind"].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-neutral-800 rounded bg-neutral-900/50 text-neutral-500"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  borderColor: "rgba(0, 212, 255, 0.5)",
                  color: "rgb(0, 212, 255)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.h2
          className="text-[20vw] font-black text-neutral-900/50 leading-none tracking-tighter select-none"
          style={{ transform: "translateY(30%)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ADITYA
        </motion.h2>
      </div>
    </motion.footer>
  )
}
