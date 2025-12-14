"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Github, Linkedin, Download, Sparkles } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import Image from "next/image"

interface HeroSectionProps {
  setCursorVariant: (variant: string) => void
}

export function HeroSection({ setCursorVariant }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [githubStars, setGithubStars] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const mouseXSpring = useSpring(0, { stiffness: 100, damping: 30 })
  const mouseYSpring = useSpring(0, { stiffness: 100, damping: 30 })

  const nameChars = "ADITYA RAJ".split("")
  const xTransforms = nameChars.map((_, index) => (x: number) => x * (index % 2 === 0 ? 1 : -1) * 0.3)
  const yTransforms = nameChars.map((_, index) => (y: number) => y * (index % 2 === 0 ? -1 : 1) * 0.3)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 50
      const y = (clientY / innerHeight - 0.5) * 50
      setMousePosition({ x, y })
      mouseXSpring.set(x)
      mouseYSpring.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseXSpring, mouseYSpring])

  const roles = ["Full Stack Developer", "MERN Stack Developer", "Web Developer", "Problem Solver"]
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Fetch GitHub stars
  useEffect(() => {
    const fetchGitHubStars = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ADITYA0018TH/repos?per_page=100')
        if (response.ok) {
          const repos = await response.json()
          const totalStars = repos.reduce((acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count, 0)
          setGithubStars(totalStars)
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error)
      }
    }
    fetchGitHubStars()
  }, [])

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-4 py-20"
      style={{
        transform: `translateY(${useTransform(scrollYProgress, [0, 1], [0, 300])}px)`,
        opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
        scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.8]),
      }}
    >
      {/* Eye Opening Transition Effect */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none flex flex-col"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }} // Fade out container after effect forces complete
      >
        {/* Top Eyelid */}
        <motion.div
          className="bg-background w-full flex-1"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          style={{ originY: 0 }}
        />

        {/* Bottom Eyelid */}
        <motion.div
          className="bg-background w-full flex-1"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          style={{ originY: 1 }}
        />

        {/* Vision Blur Effect */}
        <motion.div
          className="absolute inset-0 backdrop-blur-[10px]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </motion.div>


      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-size-[100px_100px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-center">
          {/* Left Column - Text Content - takes more space */}
          <div className="flex-1 text-center lg:text-left lg:pr-8">
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-mono text-muted-foreground tracking-wider">AVAILABLE FOR WORK</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] mb-6"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="flex flex-wrap justify-center lg:justify-start">
                {nameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-foreground hover:text-primary transition-colors duration-200"
                    initial={{ y: 100, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.04,
                      type: "spring",
                      stiffness: 100,
                    }}
                    style={{
                      x: xTransforms[index](mousePosition.x),
                      y: yTransforms[index](mousePosition.y),
                    }}
                    whileHover={{
                      scale: 1.15,
                      color: "hsl(var(--primary))",
                      transition: { duration: 0.15 },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            {/* Animated Role Switcher */}
            <motion.div
              className="h-12 mb-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="text-xl md:text-2xl lg:text-3xl font-mono text-primary"
                key={currentRole}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {"<"}
                {roles[currentRole]}
                {" />"}
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              A Motivated and detail-oriented <span className="text-primary font-semibold">Full Stack Developer</span> specialized
              in building scalable web applications using the <span className="text-primary font-semibold">MERN stack</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg overflow-hidden"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  View My Work
                </span>
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-primary via-cyan-400 to-primary bg-size-[200%_100%]"
                  animate={{ backgroundPosition: ["0%_0%", "100%_0%", "0%_0%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download="Aditya_Raj_Resume.pdf"
                className="group px-8 py-4 border border-border hover:border-primary text-foreground font-semibold rounded-lg flex items-center gap-2 transition-colors bg-card/50 backdrop-blur-sm"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <MagneticButton>
                <div className="relative group">
                  <motion.a
                    href="https://github.com/ADITYA0018TH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all backdrop-blur-sm"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.a>

                  {/* Star Count Badge */}
                  {githubStars !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -top-2 -right-2 flex items-center gap-0.5 bg-card border border-border px-1.5 py-0.5 rounded-full shadow-sm"
                    >
                      <Sparkles className="w-2 h-2 text-yellow-500" />
                      <span className="text-[10px] font-mono font-bold">{githubStars}</span>
                    </motion.div>
                  )}
                </div>
              </MagneticButton>

              <MagneticButton>
                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all backdrop-blur-sm"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column - Image Content */}
          <motion.div
            className="relative shrink-0 lg:w-[380px] xl:w-[420px]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            {/* Decorative Elements - Geometric Lines */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 border-t-2 border-r-2 border-primary/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 border-b-2 border-l-2 border-primary/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            />

            {/* Floating Tech Elements */}
            <motion.div
              className="absolute -left-4 top-1/4 w-2 h-16 bg-linear-to-b from-primary to-transparent"
              animate={{ height: ["64px", "80px", "64px"], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute -right-4 bottom-1/3 w-2 h-20 bg-linear-to-t from-cyan-400 to-transparent"
              animate={{ height: ["80px", "96px", "80px"], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />

            {/* Photo Container - Passport Style */}
            <motion.div
              className="relative z-10"
              style={{
                x: useTransform(mouseXSpring, (x) => x * 0.3),
                y: useTransform(mouseYSpring, (y) => y * 0.3),
              }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-linear-to-br from-primary/30 via-cyan-500/20 to-primary/30 blur-2xl opacity-60" />

              {/* Photo Frame */}
              <div className="relative">
                {/* Animated Border */}
                <motion.div
                  className="absolute -inset-[3px] bg-linear-to-br from-primary via-cyan-400 to-primary rounded-2xl"
                  animate={{
                    background: [
                      "linear-gradient(0deg, hsl(var(--primary)), rgb(34,211,238), hsl(var(--primary)))",
                      "linear-gradient(180deg, hsl(var(--primary)), rgb(34,211,238), hsl(var(--primary)))",
                      "linear-gradient(360deg, hsl(var(--primary)), rgb(34,211,238), hsl(var(--primary)))",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] lg:w-[360px] lg:h-[480px] rounded-2xl overflow-hidden bg-background"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/aditya-profile.png"
                    alt="Aditya Raj"
                    fill
                    className="object-cover object-top"
                    priority
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Overlay Effects */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Scan Line Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)",
                    }}
                  />

                  {/* Horizontal Scan */}
                  <motion.div
                    className="absolute inset-x-0 h-[2px] bg-linear-to-r from-transparent via-primary to-transparent opacity-50"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  {/* Glitch Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 mix-blend-screen opacity-0 hover:opacity-100"
                    whileHover={{
                      background: [
                        "transparent",
                        "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)",
                        "transparent",
                      ],
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Name Overlay at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-background via-background/80 to-transparent">
                    <motion.p
                      className="text-xs font-mono text-primary tracking-[0.2em]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      CREATIVE DEVELOPER
                    </motion.p>
                  </div>
                </motion.div>

                {/* Corner Accents */}
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50" />
              </div>

              {/* Floating Badge - Experience */}
              <motion.div
                className="absolute -right-4 md:-right-12 lg:-right-20 top-1/4 px-3 py-1.5 bg-card/90 backdrop-blur-md border border-primary/30 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-mono">EXPERIENCE</p>
                    <p className="text-sm font-bold text-foreground">3+ Years</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge - Projects */}
              <motion.div
                className="absolute -left-4 md:-left-12 lg:-left-20 bottom-1/4 px-3 py-1.5 bg-card/90 backdrop-blur-md border border-primary/30 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-mono">PROJECTS</p>
                    <p className="text-sm font-bold text-foreground">50+</p>
                  </div>
                </div>
              </motion.div>

              {/* Status Indicator */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/90 backdrop-blur-md border border-green-500/30 rounded-full shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs font-mono text-green-400">OPEN TO WORK</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[10px] font-mono text-muted-foreground tracking-[0.3em]">SCROLL DOWN</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Background Text */}
      <motion.div
        className="absolute bottom-20 right-0 text-[15vw] font-bold text-muted/5 select-none pointer-events-none whitespace-nowrap"
        style={{ x: useTransform(mouseXSpring, (x) => x * 2) }}
      >
        DEVELOPER
      </motion.div>
    </motion.section>
  )
}
