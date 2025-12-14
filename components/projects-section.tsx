"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github, Star, GitFork, Loader2 } from "lucide-react"

import useSWR from "swr"

interface ProjectsSectionProps {
  setCursorVariant: (variant: string) => void
}

interface GitHubProject {
  title: string
  description: string
  tags: string[]
  link: string
  github: string
  stars: number
  forks: number
  language: string
  updatedAt: string
  image?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const languageColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#1572B6",
  Vue: "#42b883",
  Svelte: "#ff3e00",
  Dart: "#0175C2",
  Kotlin: "#A97BFF",
  Swift: "#FA7343",
  Jupyter: "#F37626",
}

function ProjectCard({
  project,
  index,
  setCursorVariant,
}: {
  project: GitHubProject
  index: number
  setCursorVariant: (variant: string) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 })

  const distortX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 200, damping: 20 })
  const distortY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  // Use custom image if provided, otherwise generate a placeholder
  const randomId = project.title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const keywords = [project.language || "code", "tech", "coding", "software"].join(",")
  const imageUrl = project.image || `https://loremflickr.com/600/400/${keywords}?lock=${randomId}`

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true)
        setCursorVariant("hover")
      }}
      onMouseLeave={() => {
        handleMouseLeave()
        setCursorVariant("default")
      }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden border border-border bg-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          boxShadow: "0 0 60px rgba(34, 211, 238, 0.3)",
        }}
      >
        {/* Image container with fluid distortion effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              x: distortX,
              y: distortY,
            }}
          >
            {/* Red channel */}
            <motion.img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-0"
              animate={{
                opacity: isHovered ? 0.5 : 0,
                x: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ filter: "hue-rotate(-60deg) saturate(2)" }}
            />
            {/* Blue channel */}
            <motion.img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-0"
              animate={{
                opacity: isHovered ? 0.5 : 0,
                x: isHovered ? 4 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ filter: "hue-rotate(60deg) saturate(2)" }}
            />
            {/* Main image */}
            <motion.img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{
                scale: isHovered ? 1.15 : 1.1,
                filter: isHovered ? "saturate(1.2) contrast(1.1)" : "saturate(1) contrast(1)",
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Scan lines overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
            }}
            animate={{
              opacity: isHovered ? 0.5 : 0,
            }}
          />

          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <motion.div
          className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end"
          style={{ transform: "translateZ(50px)" }}
        >
          <motion.div className="flex items-center gap-4 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-xs text-yellow-400">
                <Star className="w-3 h-3 fill-current" />
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <GitFork className="w-3 h-3" />
                {project.forks}
              </span>
            )}
            {project.language && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: languageColors[project.language] || "#888" }}
                />
                {project.language}
              </span>
            )}
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
          >
            {project.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono bg-primary/20 text-primary rounded-full border border-primary/30"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title with RGB Split effect */}
          <motion.div className="relative" animate={{ y: isHovered ? -10 : 0 }}>
            <motion.h3
              className="absolute text-lg md:text-2xl font-bold text-red-500/50"
              animate={{
                x: isHovered ? -2 : 0,
                opacity: isHovered ? 0.7 : 0,
              }}
              transition={{ duration: 0.1 }}
            >
              {project.title}
            </motion.h3>
            <motion.h3
              className="absolute text-lg md:text-2xl font-bold text-cyan-500/50"
              animate={{
                x: isHovered ? 2 : 0,
                opacity: isHovered ? 0.7 : 0,
              }}
              transition={{ duration: 0.1 }}
            >
              {project.title}
            </motion.h3>
            <h3 className="text-lg md:text-2xl font-bold text-foreground relative">
              {project.title}
              <span className="text-primary">.</span>
            </h3>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-sm md:text-base max-w-md mt-2 line-clamp-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          >
            {project.description}
          </motion.p>

          {/* Links */}
          <motion.div
            className="flex gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-card transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </motion.div>
        </motion.div>

        {/* Project number */}
        <motion.div
          className="absolute top-6 right-6 text-5xl font-bold text-foreground/10"
          style={{ transform: "translateZ(30px)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Glitch overlay on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.2, repeat: 2 }}
          >
            <div className="absolute inset-0 bg-primary/10" style={{ clipPath: "inset(30% 0 60% 0)" }} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection({ setCursorVariant }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const projects: GitHubProject[] = [
    {
      title: "Bus Reservation System",
      description: "Full-stack bus reservation platform using React, Node.js, Express.js, and MongoDB. Features user authentication, bus scheduling, seat booking, and cancellation.",
      tags: ["MERN Stack", "React", "Node.js", "MongoDB", "REST APIs"],
      link: "https://github.com/ADITYA0018TH/Bus_Reservation_System",
      github: "https://github.com/ADITYA0018TH/Bus_Reservation_System",
      stars: 0,
      forks: 0,
      language: "JavaScript",
      updatedAt: "2024",
      image: "/skybus-reservation.png",
    },
    {
      title: "AI Chat Application",
      description: "Chat interface integrating OpenAI API for dynamic responses. Secure backend for messaging, user logs, and token handling.",
      tags: ["OpenAI API", "React", "Node.js", "Secure Auth", "Context-Aware"],
      link: "https://github.com/ADITYA0018TH/meetai",
      github: "https://github.com/ADITYA0018TH/meetai",
      stars: 0,
      forks: 0,
      language: "TypeScript",
      updatedAt: "2024",
      image: "/meetai-app.png",
    },
  ]

  return (
    <section ref={containerRef} id="projects" className="min-h-screen px-4 py-20 md:py-32">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="red-channel">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blue-channel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-widest">{"// 002"}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-2 relative">
            <span className="glitch-text block">FEATURED</span>
            <span className="flex items-center gap-2">
              <span className="text-primary">PROJECTS</span>
              <span className="text-foreground">.</span>
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg">
            Selected works showcasing full-stack development and AI integration.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} setCursorVariant={setCursorVariant} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/ADITYA0018TH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary text-primary font-mono text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-lg group"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <Github className="w-5 h-5" />
            VIEW GITHUB PROFILE
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
