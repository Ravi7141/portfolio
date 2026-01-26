"use client"

import { useRef } from "react"
import { m, useScroll } from "framer-motion"
import { VelocityScroll } from "@/components/velocity-scroll"
import { Briefcase, GraduationCap } from "lucide-react"
import { fadeUp, scaleIn, viewportConfig, staggerContainer } from "@/lib/animations"

interface ExperienceSectionProps {
    setCursorVariant: (variant: string) => void
}

export function ExperienceSection({ setCursorVariant }: ExperienceSectionProps) {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const experiences = [
        {
            type: "education",
            title: "B.Tech in Computer Science",
            company: "Parul Institute of Engineering and Technology, Vadodara",
            period: "2022 - 2026",
            description: "Pursuing Bachelor's degree with a CGPA of 8.27 / 10. Focus on backend development and system architecture.",
            skills: ["Computer Networks", "DBMS", "OOP", "OS"]
        },
        {
            type: "work",
            title: "Java Certified Foundations Associate",
            company: "Oracle (1Z0-811)",
            period: "Certification",
            description: "Validated fundamental knowledge of Java programming language concepts and terminology.",
            skills: ["Java SE", "Object Oriented Concepts"]
        },
        {
            type: "work",
            title: "Java Spring Framework 6",
            company: "Udemy (Telusko, Navin Reddy)",
            period: "Certification",
            description: "Comprehensive training on Spring Framework 6 with Spring Boot 3.",
            skills: ["Spring Boot 3", "Spring MVC", "AOP"]
        },
        {
            type: "work",
            title: "SQL on Oracle Cloud",
            company: "Oracle",
            period: "Certification",
            description: "Proficiency in SQL data manipulation and definition on Oracle Cloud infrastructure.",
            skills: ["SQL", "PL/SQL", "Oracle Cloud"]
        },
        {
            type: "work",
            title: "LeetCode Achievement",
            company: "Problem Solving",
            period: "Continuous",
            description: "Solved 250+ LeetCode problems; earned a 50-day consistency badge. Demonstrated strong problem-solving skills.",
            skills: ["Data Structures", "Algorithms", "Logic Building"]
        }
    ]

    return (
        <section ref={containerRef} id="experience" className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none opacity-20" />

            {/* Animated Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

            {/* Velocity Scroll Background */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-20 inset-x-0 opacity-5 pointer-events-none select-none">
                <VelocityScroll text="EXPERIENCE • EDUCATION • JOURNEY •" default_velocity={3} className="text-6xl md:text-9xl font-black text-foreground" />
            </div>

            <div className="max-w-6xl mx-auto z-10 w-full relative px-4">
                {/* Section Header */}
                <m.div
                    className="mb-24 md:mb-32"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                >
                    <span className="text-primary font-mono text-sm tracking-widest uppercase">Career Path</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4">
                        <span className="text-foreground">Professional </span>
                        <span className="text-primary">Journey</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                        A timeline of my professional growth and educational milestones.
                    </p>
                </m.div>

                <div className="relative">
                    {/* Central Line - Draws on Scroll */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/30 -translate-x-1/2">
                        <m.div
                            className="w-full bg-linear-to-b from-primary via-cyan-400 to-primary origin-top shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                            style={{ scaleY: scrollYProgress, height: "100%" }}
                        />
                    </div>

                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row gap-8 md:gap-16 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 z-10 flex items-center justify-center">
                                    <m.div
                                        className="w-14 h-14 rounded-full bg-linear-to-br from-primary/20 to-cyan-500/10 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.4),inset_0_0_15px_rgba(34,211,238,0.1)]"
                                        variants={scaleIn}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={viewportConfig}
                                        whileHover={{ scale: 1.3, borderColor: "hsl(var(--primary))", boxShadow: "0 0 50px rgba(34,211,238,0.7), inset 0 0 20px rgba(34,211,238,0.3)" }}
                                    >
                                        {exp.type === 'work' ? (
                                            <Briefcase className="w-5 h-5 text-primary" />
                                        ) : (
                                            <GraduationCap className="w-5 h-5 text-primary" />
                                        )}
                                    </m.div>
                                </div>

                                {/* Content Card */}
                                <m.div
                                    className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={viewportConfig}
                                >
                                    <m.div
                                        className={`group relative bg-card/60 backdrop-blur-md border border-border/50 p-6 md:p-8 rounded-2xl inline-block w-full md:max-w-xl ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                                            }`}
                                        onMouseEnter={() => setCursorVariant("hover")}
                                        onMouseLeave={() => setCursorVariant("default")}
                                        whileHover={{
                                            borderColor: "rgba(34, 211, 238, 0.5)",
                                            boxShadow: "0 0 40px rgba(34, 211, 238, 0.15), 0 0 80px rgba(34, 211, 238, 0.05), inset 0 1px 0 rgba(255,255,255,0.1)"
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {/* Hover Glow Effect - Radial gradient from top-left */}
                                        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        {/* Bottom right subtle glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <div className={`relative z-10 flex flex-col gap-2 mb-4 ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                                            <span className="text-sm font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                {exp.period}
                                            </span>
                                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                {exp.title}
                                            </h3>
                                            <p className="text-lg text-muted-foreground font-medium">
                                                {exp.company}
                                            </p>
                                        </div>

                                        <p className="relative z-10 text-muted-foreground mb-6 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        <div className={`relative z-10 flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                            {exp.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-mono px-2 py-1 bg-secondary/50 text-foreground rounded border border-border group-hover:border-primary/30 transition-colors"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </m.div>
                                </m.div>

                                {/* Spacer for the other side */}
                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
