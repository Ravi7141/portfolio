"use client"

import { useEffect, useState } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { HeroSection } from "@/components/hero-section"
import { FloatingNav } from "@/components/floating-nav"
import { ProjectsSection } from "@/components/projects-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { ParticleGrid } from "@/components/particle-grid"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Preloader } from "@/components/preloader"
import { ExperienceSection } from "@/components/experience-section"
import { DesignProcessSection } from "@/components/design-process-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <SmoothScroll>
      <CustomCursor variant={cursorVariant} />
      <ParticleGrid />
      <FloatingNav />

      <main className="relative z-10">
        <HeroSection setCursorVariant={setCursorVariant} />
        <AboutSection setCursorVariant={setCursorVariant} />
        <DesignProcessSection setCursorVariant={setCursorVariant} />
        <ProjectsSection setCursorVariant={setCursorVariant} />
        <TechStackSection setCursorVariant={setCursorVariant} />

        <ExperienceSection setCursorVariant={setCursorVariant} />
        <CommunitySection setCursorVariant={setCursorVariant} />
        <ContactSection setCursorVariant={setCursorVariant} />
        <Footer setCursorVariant={setCursorVariant} />
      </main>
    </SmoothScroll>
  )
}

