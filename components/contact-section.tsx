"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Send, Mail, MapPin, ArrowRight, Sparkles } from "lucide-react"
import { fadeUp, viewportConfig } from "@/lib/animations"
import { MagneticButton } from "@/components/ui/magnetic-button"

interface ContactSectionProps {
    setCursorVariant: (variant: string) => void
}

export function ContactSection({ setCursorVariant }: ContactSectionProps) {
    const containerRef = useRef<HTMLElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const mouseXSpring = useSpring(0, { stiffness: 100, damping: 30 })
    const mouseYSpring = useSpring(0, { stiffness: 100, damping: 30 })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            if (formRef.current) formRef.current.reset()
            alert("Message sent! (This is a demo)")
        }, 2000)
    }

    return (
        <section
            ref={containerRef}
            id="contact"
            className="relative min-h-screen py-24 md:py-32 overflow-hidden flex items-center"
        >
            {/* Dynamic Background */}
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-size-[100px_100px]" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left - Content */}
                    <motion.div
                        className="space-y-12"
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        variants={{
                            show: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <motion.div variants={fadeUp} className="space-y-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                CONTACT
                            </span>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="block text-foreground">Let's build</span>
                                <span className="block text-muted-foreground">something</span>
                                <span className="block text-primary">extraordinary.</span>
                            </h2>
                        </motion.div>

                        <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed max-w-md">
                            Have a project in mind or just want to chat? I'm always open to new ideas and opportunities.
                        </motion.p>

                        <motion.div variants={fadeUp} className="space-y-6">
                            <a
                                href="mailto:aditya.raj862003@gmail.com"
                                className="group block"
                                onMouseEnter={() => setCursorVariant("hover")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border group-hover:border-primary/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="p-4 rounded-full bg-background border border-border group-hover:border-primary transition-colors">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground font-mono mb-1">Email Me</p>
                                            <p className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors">aditya.raj862003@gmail.com</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </a>

                            <div className="group block">
                                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="p-4 rounded-full bg-background border border-border group-hover:border-primary transition-colors">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground font-mono mb-1">Located In</p>
                                            <p className="text-lg md:text-xl font-medium text-foreground">Bihar, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        style={{ y }}
                        className="relative"
                    >
                        {/* Decorative background for form */}
                        <div className="absolute -inset-1 bg-linear-to-b from-primary/20 via-transparent to-transparent opacity-50 blur-2xl -z-10 rounded-4xl" />

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-6 p-8 md:p-10 rounded-4xl bg-card/30 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

                            <h3 className="text-2xl font-bold mb-8 relative z-10">Send a Message</h3>

                            <div className="space-y-4 relative z-10">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-mono text-muted-foreground ml-1">NAME</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full bg-background/50 border border-border p-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50 group-hover:bg-background/80"
                                            placeholder="What's your name?"
                                        />
                                        <div className="absolute inset-0 rounded-xl border border-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-mono text-muted-foreground ml-1">EMAIL</label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full bg-background/50 border border-border p-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50 group-hover:bg-background/80"
                                            placeholder="How can I reach you?"
                                        />
                                        <div className="absolute inset-0 rounded-xl border border-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-mono text-muted-foreground ml-1">MESSAGE</label>
                                    <div className="relative group">
                                        <textarea
                                            id="message"
                                            rows={5}
                                            required
                                            className="w-full bg-background/50 border border-border p-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50 resize-none group-hover:bg-background/80"
                                            placeholder="Tell me about your project..."
                                        />
                                        <div className="absolute inset-0 rounded-xl border border-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 relative z-10">
                                <MagneticButton className="w-full">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary text-primary-foreground p-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 relative overflow-hidden group"
                                        onMouseEnter={() => setCursorVariant("hover")}
                                        onMouseLeave={() => setCursorVariant("default")}
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        {isSubmitting ? (
                                            <span className="animate-pulse">Sending...</span>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </button>
                                </MagneticButton>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
