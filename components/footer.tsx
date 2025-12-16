"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp, Heart, MapPin, Phone, Twitter } from "lucide-react"
import { useRef, useState } from "react"

const socialLinks = [
  { icon: Github, href: "https://github.com/ADITYA0018TH", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/adityaraj", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
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

  const handleMouseEnter = () => setCursorVariant("text")
  const handleMouseLeave = () => setCursorVariant("default")

  return (
    <motion.footer
      ref={containerRef}
      style={{ y, opacity }}
      className="relative border-t border-cyan-500/20 bg-black/95 backdrop-blur-xl overflow-hidden pt-24 pb-12"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
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
        className="absolute -top-20 left-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content - 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 lg:gap-20 mb-16 md:mb-20">

          {/* Column 1: Brand & Info */}
          <div className="space-y-8">
            <motion.div className="relative inline-block" whileHover={{ scale: 1.02 }}>
              <h3 className="text-3xl font-black tracking-tighter">
                <span className="text-cyan-400">ADITYA</span>
                <br />
                <span className="text-white">RAJ</span>
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 h-[3px] bg-linear-to-r from-cyan-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            <p className="text-neutral-400 text-sm leading-relaxed font-mono">
              Building the future, one pixel at a time.
              <span className="text-cyan-400 block mt-2 font-bold">Full Stack Developer</span>
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-3 pt-2">
              <motion.div
                className="w-2.5 h-2.5 bg-green-500 rounded-full"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 8px rgba(34, 197, 94, 0)"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Available for work</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:pl-8">
            <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="relative group inline-flex items-center gap-2"
                    onMouseEnter={() => {
                      handleMouseEnter()
                      setHoveredLink(link.label)
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave()
                      setHoveredLink(null)
                    }}
                  >
                    <span className="text-neutral-400 text-sm font-medium transition-colors group-hover:text-cyan-400">
                      {link.label}
                    </span>
                    <motion.span
                      className="text-cyan-400 text-xs absolute -left-4"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{
                        opacity: hoveredLink === link.label ? 1 : 0,
                        x: hoveredLink === link.label ? 0 : -5,
                      }}
                    >
                      →
                    </motion.span>
                  </a>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] mb-8">Contact</h4>
            <div className="space-y-6">
              <motion.a
                href="https://maps.app.goo.gl/bAiDP4bgFGq8WcEd7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
                whileHover={{ x: 5 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0 group-hover:text-cyan-400/80 transition-colors" />
                <span className="text-neutral-400 text-sm group-hover:text-white transition-colors leading-tight">
                  Bihar, India
                </span>
              </motion.a>

              <motion.a
                href="tel:+917061452180"
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Phone className="w-5 h-5 text-cyan-400 shrink-0 group-hover:text-cyan-400/80 transition-colors" />
                <span className="text-neutral-400 text-sm group-hover:text-white transition-colors">
                  +91 7061452180
                </span>
              </motion.a>

              <motion.a
                href="mailto:aditya.raj862003@gmail.com"
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 group-hover:text-cyan-400/80 transition-colors" />
                <span className="text-neutral-400 text-sm group-hover:text-white transition-colors">
                  aditya.raj862003@gmail.com
                </span>
              </motion.a>
            </div>
          </div>

          {/* Column 4: Connect & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] mb-8">Connect</h4>
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative p-3 border border-neutral-800 rounded-xl bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10">
                      <social.icon className="w-5 h-5 text-neutral-400 transition-colors group-hover:text-cyan-400" />
                      {/* Glow effect */}
                      <motion.div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center gap-3 mt-12 self-start"
              whileHover={{ x: 5 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="p-3 border border-neutral-800 rounded-lg bg-neutral-900/50 transition-all group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10">
                <ArrowUp className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
                Back to top
              </span>
            </motion.button>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <motion.p
            className="text-xs font-mono text-neutral-500 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="text-neutral-500">©</span>
            <span>{new Date().getFullYear()}</span>
            <span className="text-neutral-600">|</span>
            <span>Aditya Raj</span>
            <span className="text-neutral-600">|</span>
            <span>Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </motion.span>
          </motion.p>

          {/* Tech badges */}
          <div className="flex items-center gap-3">
            {["Next.js", "TypeScript", "Tailwind"].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider border border-neutral-800 rounded bg-neutral-900/50 text-neutral-500"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  borderColor: "rgba(0, 212, 255, 0.5)",
                  color: "rgb(0, 212, 255)",
                  boxShadow: "0 0 15px rgba(0, 212, 255, 0.1)"
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <motion.h2
          className="text-[18vw] font-black text-white/5 leading-none tracking-tighter text-center whitespace-nowrap"
          style={{ transform: "translateY(35%)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ADITYA RAJ
        </motion.h2>
      </div>
    </motion.footer>
  )
}
