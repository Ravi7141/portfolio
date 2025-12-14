"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface DesignProcessSectionProps {
    setCursorVariant: (variant: string) => void
}

const processSteps = [
    {
        number: "01",
        title: "Strategize",
        description: "To create something awesome, one must first talk about the details. Planning is essential for success."
    },
    {
        number: "02",
        title: "Wireframe",
        description: "After hashing out the details of the project, it's easy to throw the ideas onto pen & paper."
    },
    {
        number: "03",
        title: "Design",
        description: "The most fun part of all - adding pizzazz to the wireframes and bringing ideas to life."
    },
    {
        number: "04",
        title: "Development",
        description: "The design may be final but it needs to be functional and practical. Development is key."
    },
    {
        number: "05",
        title: "Quality Assurance",
        description: "Performance optimization, testing, and refinement to ensure the highest quality output."
    }
]

export function DesignProcessSection({ setCursorVariant }: DesignProcessSectionProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    return (
        <section
            ref={containerRef}
            id="process"
            className="relative min-h-screen px-4 py-20 md:py-32 bg-background"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-mono text-sm tracking-widest uppercase">Steps I follow</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4">
                        <span className="text-foreground">My </span>
                        <span className="text-primary">Design </span>
                        <span className="text-foreground">Process</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                        A systematic approach to building exceptional digital experiences.
                    </p>
                </motion.div>

                {/* Process Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 0 40px rgba(0, 212, 255, 0.15)"
                            }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            {/* Step Number */}
                            <motion.span
                                className="text-6xl font-bold text-primary/20 absolute top-4 right-6"
                                whileHover={{ scale: 1.1, color: "hsl(var(--primary) / 0.4)" }}
                            >
                                {step.number}
                            </motion.span>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {step.number}. {step.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
