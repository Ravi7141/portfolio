"use client"

import type React from "react"
import { useRef, useState } from "react"
import { m, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import { fadeUp, staggerContainer, viewportConfig, scaleIn } from "@/lib/animations"

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
    <m.div
      ref={cardRef}
      className="relative group h-full"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
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
      <m.div
        className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden border border-border bg-card shadow-lg"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          boxShadow: "0 0 60px rgba(34, 211, 238, 0.2)",
          borderColor: "rgba(34, 211, 238, 0.5)"
        }}
      >
        {/* Image container with fluid distortion effect */}
        <div className="absolute inset-0 overflow-hidden bg-background">
          <m.div
            className="absolute inset-0"
            style={{
              x: distortX,
              y: distortY,
            }}
          >
            {/* Red channel */}
            <m.img
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
            <m.img
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
            <m.img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
              initial={{ scale: 1.1 }}
              animate={{
                scale: isHovered ? 1.15 : 1.1,
                filter: isHovered ? "saturate(1.2) contrast(1.1)" : "saturate(1) contrast(1)",
              }}
            />
          </m.div>

          {/* Scan lines overlay */}
          <m.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
            }}
            animate={{
              opacity: isHovered ? 0.5 : 0,
            }}
          />

          <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent z-20" />
        </div>

        {/* Content */}
        <m.div
          className="absolute inset-0 p-6 flex flex-col justify-end z-30"
          style={{ transform: "translateZ(50px)" }}
        >
          <m.div className="flex items-center gap-4 mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-xs text-yellow-400 font-mono bg-yellow-400/10 px-2 py-1 rounded">
                <Star className="w-3 h-3 fill-current" />
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                <GitFork className="w-3 h-3" />
                {project.forks}
              </span>
            )}
            {project.language && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: languageColors[project.language] || "#888" }}
                />
                {project.language}
              </span>
            )}
          </m.div>

          {/* Tags */}
          <m.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
          >
            {project.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono bg-primary/20 text-primary rounded-full border border-primary/30 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </m.div>

          {/* Title with RGB Split effect */}
          <m.div className="relative mb-2" animate={{ y: isHovered ? -5 : 0 }}>
            {/* Glitch layers */}
            <m.h3
              className="absolute text-xl md:text-2xl font-bold text-red-500/50"
              animate={{
                x: isHovered ? -2 : 0,
                opacity: isHovered ? 0.7 : 0,
              }}
            >
              {project.title}
            </m.h3>
            <m.h3
              className="absolute text-xl md:text-2xl font-bold text-cyan-500/50"
              animate={{
                x: isHovered ? 2 : 0,
                opacity: isHovered ? 0.7 : 0,
              }}
            >
              {project.title}
            </m.h3>
            <h3 className="text-xl md:text-2xl font-bold text-foreground relative z-10">
              {project.title}
              <span className="text-primary">.</span>
            </h3>
          </m.div>

          {/* Description */}
          <m.p
            className="text-muted-foreground text-sm max-w-md line-clamp-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7, height: isHovered ? "auto" : "auto" }}
          >
            {project.description}
          </m.p>

          {/* Links */}
          <m.div
            className="flex gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold tracking-wide hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              <ExternalLink className="w-4 h-4" />
              VIEW PROJECT
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg text-sm font-bold tracking-wide hover:bg-card hover:border-primary/50 transition-colors backdrop-blur-md"
            >
              <Github className="w-4 h-4" />
              CODE
            </a>
          </m.div>
        </m.div>

        {/* Project number */}
        <m.div
          className="absolute top-6 right-6 text-6xl font-black text-foreground/5 z-0 select-none"
          style={{ transform: "translateZ(20px)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </m.div>

        {/* Glitch overlay on hover */}
        {isHovered && (
          <m.div
            className="absolute inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.2, repeat: 2 }}
          >
            <div className="absolute inset-0 bg-primary/10" style={{ clipPath: "inset(30% 0 60% 0)" }} />
          </m.div>
        )}
      </m.div>
    </m.div>
  )
}

export function ProjectsSection({ setCursorVariant }: ProjectsSectionProps) {
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
    <section id="projects" className="min-h-screen px-4 py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5))] pointer-events-none" />

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

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section header */}
        <m.div
          className="mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <span className="text-primary font-mono text-sm tracking-widest">{"// 002"}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-2 relative">
            <span className="flex items-center gap-2">
              FEATURED <span className="text-primary">PROJECTS</span>
              <span className="text-foreground">.</span>
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg">
            Selected works showcasing full-stack development and AI integration.
          </p>
        </m.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} setCursorVariant={setCursorVariant} />
          ))}
        </div>

        <m.div
          className="mt-24 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <a
            href="https://github.com/ADITYA0018TH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-mono text-lg hover:border-primary hover:text-primary transition-all duration-300 rounded-full group bg-card/50 backdrop-blur-sm"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            VIEW GITHUB PROFILE
            <m.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              →
            </m.span>
          </a>
        </m.div>
      </div>
    </section>
  )
}
