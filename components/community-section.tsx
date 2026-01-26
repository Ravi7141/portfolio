"use client"

import { useRef, useEffect, useState } from "react"
import { m, useInView } from "framer-motion"
import { Code, Users, Calendar, Github, ArrowUpRight } from "lucide-react"
import { fadeUp, viewportConfig, staggerContainer } from "@/lib/animations"

interface CommunitySectionProps {
    setCursorVariant: (variant: string) => void
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return

        let startTime: number | null = null
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
    }, [isInView, target, duration])

    return <span ref={ref}>{count}</span>
}

const stats = [
    { number: 5, suffix: "+", label: "Projects Completed", icon: Code },
    { number: 250, suffix: "+", label: "LeetCode Problems", icon: Github },
    { number: 2026, suffix: "", label: "Graduation Year", icon: Calendar },
    { number: 5, suffix: "+", label: "Certifications", icon: Users },
]

export function CommunitySection({ setCursorVariant }: CommunitySectionProps) {
    const containerRef = useRef<HTMLElement>(null)

    return (
        <section
            ref={containerRef}
            id="community"
            className="relative py-24 md:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <m.div
                    className="text-center mb-16 md:mb-24"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                >
                    <span className="text-primary font-mono text-sm tracking-widest">// IMPACT</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4">
                        <span className="text-foreground">By The </span>
                        <span className="text-primary">Numbers</span>
                    </h2>
                </m.div>

                {/* Stats Grid */}
                <m.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                >
                    {stats.map((stat, index) => (
                        <m.div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all text-center"
                            variants={fadeUp}
                            whileHover={{ y: -5 }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                                    <AnimatedCounter target={stat.number} />
                                    <span className="text-primary">{stat.suffix}</span>
                                </div>
                                <p className="text-sm text-muted-foreground font-mono tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        </m.div>
                    ))}
                </m.div>

                {/* CTA */}
                <m.div
                    className="mt-16 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                >
                    <m.a
                        href="https://github.com/Ravi7141"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                    >
                        View GitHub Profile
                        <ArrowUpRight className="w-5 h-5" />
                    </m.a>
                </m.div>
            </div>
        </section>
    )
}
