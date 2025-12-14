"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { VelocityScroll } from "@/components/velocity-scroll"
import { Briefcase, GraduationCap } from "lucide-react"

interface ExperienceSectionProps {
    setCursorVariant: (variant: string) => void
}

export function ExperienceSection({ setCursorVariant }: ExperienceSectionProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const experiences = [
        {
            type: "work",
            title: "Full Stack Developer",
            company: "Freelance",
            period: "2023 - Present",
            description: "Developing scalable web applications using the MERN stack. Collaborating with clients to deliver custom solutions.",
            skills: ["React", "Node.js", "MongoDB", "TailwindCSS"]
        },
        {
            type: "education",
            title: "B.Tech in Computer Science",
            company: "University of Technology",
            period: "2022 - 2026",
            description: "Pursuing a Bachelor of Technology degree with a focus on web technologies and software engineering.",
            skills: ["Data Structures", "Algorithms", "Database Management"]
        }
    ]

    return (
        <section ref={containerRef} id="experience" className="relative min-h-screen flex items-center justify-center px-4 py-20 md:py-32 overflow-hidden bg-background">

            {/* Velocity Scroll Background */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-5 pointer-events-none select-none">
                <VelocityScroll text="EXPERIENCE • EDUCATION • JOURNEY •" default_velocity={3} className="text-6xl md:text-9xl font-black text-foreground" />
            </div>

            <div className="max-w-5xl mx-auto z-10 w-full">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-mono text-sm tracking-widest">{"// 004"}</span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-2">
                        MY <span className="text-primary">JOURNEY.</span>
                    </h2>
                </motion.div>

                <div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="relative pl-8 md:pl-12"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 p-1 bg-background border-2 border-primary rounded-full">
                                {exp.type === 'work' ? <Briefcase className="w-4 h-4 text-primary" /> : <GraduationCap className="w-4 h-4 text-primary" />}
                            </div>

                            <div
                                className="bg-card/30 backdrop-blur-sm border border-border p-6 rounded-xl hover:border-primary/50 transition-colors group"
                                onMouseEnter={() => setCursorVariant("hover")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.title}</h3>
                                        <p className="text-lg text-muted-foreground">{exp.company}</p>
                                    </div>
                                    <span className="text-sm font-mono px-3 py-1 rounded-full bg-secondary/50 border border-border">{exp.period}</span>
                                </div>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill, i) => (
                                        <span key={i} className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
