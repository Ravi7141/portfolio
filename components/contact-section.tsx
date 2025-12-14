"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { VelocityScroll } from "@/components/velocity-scroll"
import { Send, Mail, MapPin, Phone } from "lucide-react"

interface ContactSectionProps {
    setCursorVariant: (variant: string) => void
}

export function ContactSection({ setCursorVariant }: ContactSectionProps) {
    const containerRef = useRef<HTMLElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            if (formRef.current) formRef.current.reset()
            alert("Message sent! (This is a demo)")
        }, 2000)
    }

    return (
        <section ref={containerRef} id="contact" className="relative min-h-screen flex items-center justify-center px-4 py-20 md:py-32 overflow-hidden bg-background">

            {/* Velocity Scroll Background */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-5 pointer-events-none select-none">
                <VelocityScroll text="CONTACT • CONNECT • COLLABORATE •" default_velocity={-2} className="text-6xl md:text-9xl font-black text-foreground" />
            </div>

            <div className="max-w-6xl mx-auto z-10 w-full grid md:grid-cols-2 gap-16">

                {/* Left Column: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-mono text-sm tracking-widest">{"// 005"}</span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-8">
                        LET'S <span className="text-primary">TALK.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                        Have a project in mind or acting as a visionary? Let's build something extraordinary together.
                    </p>

                    <div className="space-y-8">
                        <motion.div
                            className="flex items-center gap-4 group"
                            whileHover={{ x: 10 }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            <div className="p-4 rounded-full bg-card border border-border group-hover:border-primary transition-colors">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-mono">Mail Me</p>
                                <a href="mailto:adityaraj@example.com" className="text-lg font-medium group-hover:text-primary transition-colors">adityaraj@example.com</a>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4 group"
                            whileHover={{ x: 10 }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            <div className="p-4 rounded-full bg-card border border-border group-hover:border-primary transition-colors">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-mono">Location</p>
                                <p className="text-lg font-medium group-hover:text-primary transition-colors">India</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-card/30 backdrop-blur-md p-8 rounded-2xl border border-border">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-mono text-muted-foreground">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full bg-background/50 border border-border p-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-mono text-muted-foreground">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full bg-background/50 border border-border p-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-mono text-muted-foreground">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                required
                                className="w-full bg-background/50 border border-border p-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-primary-foreground p-4 rounded-lg font-bold flex items-center justify-center gap-2 overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : (
                                <>
                                    Send Message <Send className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
