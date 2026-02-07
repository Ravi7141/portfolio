"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion"
import {
  Github,
  Linkedin,
  Download,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  Maximize2,
  Minus,
  X
} from "lucide-react"
import Image from "next/image"

// --- Components ---

// 1. The "Code Window" - Visualizing you as code
const CodeWindow = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const codeSnippet = `public class BackendArchitect {
  
  private String name = "Ravi Rajput";
  private String[] stack = {
    "Java", 
    "Spring Boot", 
    "Microservices", 
    "AWS"
  };

  public void buildSystems() {
    // Scalable, secure, and robust
    System.out.println("Ready to deploy.");
  }
}`

  return (
    <div className="relative w-full max-w-md rounded-xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Terminal className="w-3 h-3" />
          <span>Developer.java</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Copy onClick={handleCopy} className="w-3 h-3 cursor-pointer text-muted-foreground hover:text-white" />
        </div>
      </div>

      {/* Code Area */}
      <div className="p-6 overflow-x-auto">
        <pre className="text-gray-300 leading-relaxed">
          <code>
            <span className="text-orange-400">public class</span> <span className="text-yellow-300">BackendArchitect</span> {"{"}
            {"\n\n"}
            {"  "}<span className="text-orange-400">private</span> String name = <span className="text-green-400">"Ravi Rajput"</span>;
            {"\n"}
            {"  "}<span className="text-orange-400">private</span> String[] stack = {"{"}
            {"\n"}
            {"    "}<span className="text-green-400">"Java"</span>,
            {"\n"}
            {"    "}<span className="text-green-400">"Spring Boot"</span>,
            {"\n"}
            {"    "}<span className="text-green-400">"Microservices"</span>
            {"\n"}
            {"  "}{"}"};
            {"\n\n"}
            {"  "}<span className="text-orange-400">public void</span> <span className="text-blue-400">buildSystems</span>() {"{"}
            {"\n"}
            {"    "}<span className="text-gray-500">// Scalable, secure, robust</span>
            {"\n"}
            {"    "}System.out.println(<span className="text-green-400">"Ready to work."</span>);
            {"\n"}
            {"  "}{"}"}
            {"\n"}
            {"}"}
          </code>
        </pre>

        {/* Copy Feedback */}
        {copied && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-green-500 text-black text-xs font-bold rounded shadow-lg">
            COPIED
          </div>
        )}
      </div>
    </div>
  )
}

// 2. Main Hero Section
export function HeroSection({ setCursorVariant }: { setCursorVariant: (v: string) => void }) {
  const containerRef = useRef<HTMLElement>(null)

  // Mouse Spotlight Logic
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Scroll Effects
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.9])
  const filter = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(10px)"])
  const y = useTransform(scrollY, [0, 400], [0, -50])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] flex items-center justify-center bg-background overflow-hidden py-20"
      onMouseMove={handleMouseMove}
    >
      {/* --- Ambient Background --- */}

      {/* 1. Dynamic Spotlight (Subtle lighting on the "floor") */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 lg:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 107, 0, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. Grid Texture (Very subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* --- Main Content Grid --- */}
      <motion.div
        className="relative z-10 container max-w-6xl mx-auto px-6"
        style={{ opacity, scale, filter, y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Typography & Pitch */}
          <div className="order-2 lg:order-1 flex flex-col items-start text-left space-y-8">

            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-mono font-medium text-primary tracking-wide">AVAILABLE FOR HIRE</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Building the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-300 to-primary animate-gradient-x">
                  Backend Logic.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                I am <span className="text-white font-medium">Ravi Rajput</span>. A Java Backend Developer engineering scalable APIs, robust microservices, and secure cloud architectures.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-gray-200 hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-black"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <span className="mr-2">View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 font-medium text-white transition-all duration-300 hover:bg-white/10"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Download className="mr-2 w-4 h-4" />
                Resume
              </a>
            </motion.div>

            {/* Social Proof / Stack Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-8 border-t border-white/5 w-full"
            >
              <p className="text-xs text-muted-foreground mb-4 font-mono uppercase tracking-widest">Powering Systems With</p>
              <div className="flex gap-6 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                {/* Simple text representation for cleaner look, or use icons */}
                <span className="text-sm font-semibold text-white flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />Java</span>
                <span className="text-sm font-semibold text-white flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" />Spring Boot</span>
                <span className="text-sm font-semibold text-white flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Docker</span>
                <span className="text-sm font-semibold text-white flex items-center gap-2"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />AWS</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            {/* The Background Glow behind the visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />

            {/* Container for Image + Code Window */}
            <div className="relative">

              {/* 1. The Profile Image (Clean Card) */}
              <motion.div
                className="relative z-100 w-80 h-80 sm:w-[27rem] sm:h-[27rem] mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl lg:translate-x-40 lg:translate-y-28"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/dp.jpg"
                  alt="Ravi Rajput"
                  fill
                  sizes="(max-width: 640px) 320px, 432px"
                  className="object-cover object-top"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgEEAgMBAAAAAAAAAAAAAQIDAAQFESExBhJRYf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aw+3xGNuLsRXOXjtkP1kMDNr8ABB/flVYfHWMt1seo0YhRpIxruj/AEpQD//Z"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* 2. The Floating Code Window (Overlapping) */}
              <motion.div
                className="hidden md:block absolute right-42 bottom-12 z-20"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                <CodeWindow />
              </motion.div>



            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}