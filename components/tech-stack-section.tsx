"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import LogoLoop from "@/components/logo-loop"
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiPostman,
  SiOpenai,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiHibernate,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { VscVscode } from "react-icons/vsc"

const techLogos = [
  { node: <FaJava className="text-[#ED8B00]" />, title: "Java", href: "https://www.java.com" },
  { node: <SiSpringboot className="text-[#6DB33F]" />, title: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
  { node: <SiPostgresql className="text-[#336791]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMysql className="text-[#4479A1]" />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiDocker className="text-[#2496ED]" />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiHibernate className="text-[#59666C]" />, title: "Hibernate", href: "https://hibernate.org" },
  { node: <SiMongodb className="text-[#47A248]" />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiJavascript className="text-[#F7DF1E]" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiReact className="text-[#61DAFB]" />, title: "React.js", href: "https://reactjs.org" },
  { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiHtml5 className="text-[#E34F26]" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 className="text-[#1572B6]" />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiGit className="text-[#F05032]" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub className="text-white" />, title: "GitHub", href: "https://github.com" },
  { node: <SiPostman className="text-[#FF6C37]" />, title: "Postman", href: "https://www.postman.com" },
  { node: <SiOpenai className="text-[#412991]" />, title: "OpenAI API", href: "https://openai.com" },
  { node: <VscVscode className="text-[#007ACC]" />, title: "Visual Studio Code", href: "https://code.visualstudio.com" },
]

interface TechStackSectionProps {
  setCursorVariant: (variant: string) => void
}

export function TechStackSection({ setCursorVariant }: TechStackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  return (
    <section ref={containerRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ y, rotate }} className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
          >
            <span className="inline-block mr-3">TECH</span>
            <span
              className="inline-block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-cyan-500"
            >
              ARSENAL
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg max-w-2xl mx-auto font-mono"
          >
            The tools and technologies I use to build scalable, high-performance backend systems.
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {/* Row 1: Left to Right */}
          <div className="relative">
            <LogoLoop
              logos={techLogos.slice(0, 16)}
              speed={60}
              direction="right"
              logoHeight={64}
              gap={60}
              pauseOnHover
              scaleOnHover
              fadeOut={false}
              className="pt-8 pb-20"
              renderItem={(item) => {
                if ('node' in item) {
                  return (
                    <div
                      className="flex flex-col items-center gap-3 group/icon cursor-pointer"
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <div className="text-5xl transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                        {item.node}
                      </div>
                      <span className="text-sm font-mono text-neutral-500 group-hover/icon:text-cyan-400 transition-colors opacity-0 group-hover/icon:opacity-100 absolute -bottom-6 whitespace-nowrap">
                        {item.title}
                      </span>
                    </div>
                  )
                }
                return null
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
