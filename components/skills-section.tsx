"use client"

import { m } from "framer-motion"
import {
    SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiMongodb,
    SiTailwindcss, SiFramer, SiGit
} from "react-icons/si"
import { staggerContainer, fadeUp, scaleIn, viewportConfig } from "@/lib/animations"

const skills = [
    { name: "React", icon: SiReact, color: "#61DAFB", level: 90 },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 85 },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 80 },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 75 },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 95 },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF", level: 80 },
    { name: "Git", icon: SiGit, color: "#F05032", level: 85 },
]

export function SkillsSection() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none opacity-20" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <m.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Proficiency</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A curated stack of technologies I use to build robust and scalable applications.
                    </p>
                </m.div>

                <m.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                >
                    {skills.map((skill, index) => (
                        <m.div
                            key={index}
                            variants={scaleIn}
                            className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-lg bg-background border border-border group-hover:border-primary/30 transition-colors">
                                    <skill.icon
                                        className="w-8 h-8 transition-colors"
                                        style={{ color: skill.color }}
                                    />
                                </div>
                                <span className="font-bold text-lg">{skill.name}</span>
                            </div>

                            <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                                <m.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: skill.color }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                    viewport={viewportConfig}
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                            </div>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </section>
    )
}
