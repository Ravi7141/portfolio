"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Calendar, Code, ArrowRight } from "lucide-react"

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
    { number: 50, suffix: "+", label: "Projects Completed", icon: Code },
    { number: 100, suffix: "+", label: "Contributions", icon: Users },
    { number: 3, suffix: "+", label: "Years Coding", icon: Calendar }
]

export function CommunitySection({ setCursorVariant }: CommunitySectionProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    return (
        <section
            ref={containerRef}
            id="community"
            className="relative px-4 py-20 md:py-32 bg-background overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-mono text-sm tracking-widest uppercase">Open Source & Learning</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4">
                        <span className="text-foreground">Building </span>
                        <span className="text-primary">& </span>
                        <span className="text-foreground">Growing</span>
                    </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                    className="text-muted-foreground text-lg md:text-xl max-w-3xl mb-16 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Passionate about open source contribution and continuous learning. I believe in sharing knowledge,
                    collaborating with developers worldwide, and building tools that make a difference. Every line of
                    code is an opportunity to learn something new.
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
                            whileHover={{
                                scale: 1.05,
                                borderColor: "hsl(var(--primary) / 0.5)",
                                boxShadow: "0 0 40px rgba(0, 212, 255, 0.1)"
                            }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                            <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                                <AnimatedCounter target={stat.number} />
                                <span className="text-primary">{stat.suffix}</span>
                            </div>
                            <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <motion.a
                        href="https://github.com/ADITYA0018TH"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                    >
                        View GitHub Profile
                        <ArrowRight className="w-5 h-5" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
