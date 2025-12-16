"use client"

import { useRef, useState } from "react"
import { m } from "framer-motion"
import { Send, Mail, MapPin, ArrowUpRight } from "lucide-react"
import { fadeUp, viewportConfig } from "@/lib/animations"

interface ContactSectionProps {
    setCursorVariant: (variant: string) => void
}

export function ContactSection({ setCursorVariant }: ContactSectionProps) {
    const containerRef = useRef<HTMLElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

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
            className="relative min-h-screen py-24 md:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left - Content */}
                    <m.div
                        className="space-y-8"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                    >
                        <div>
                            <span className="text-primary font-mono text-sm tracking-widest">// CONTACT</span>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4">
                                <span className="text-foreground">Let's </span>
                                <span className="text-primary">Talk.</span>
                            </h2>
                        </div>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                            Have a project in mind? Let's build something extraordinary together.
                        </p>

                        <div className="space-y-6 pt-4">
                            <m.a
                                href="mailto:aditya.raj862003@gmail.com"
                                className="group flex items-center gap-4"
                                whileHover={{ x: 8 }}
                                onMouseEnter={() => setCursorVariant("hover")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                <div className="p-4 rounded-full bg-card border border-border group-hover:border-primary/50 transition-colors">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-mono">Email</p>
                                    <p className="text-foreground group-hover:text-primary transition-colors">aditya.raj862003@gmail.com</p>
                                </div>
                            </m.a>

                            <m.div
                                className="group flex items-center gap-4"
                                whileHover={{ x: 8 }}
                            >
                                <div className="p-4 rounded-full bg-card border border-border">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-mono">Location</p>
                                    <p className="text-foreground">Bihar, India</p>
                                </div>
                            </m.div>
                        </div>
                    </m.div>

                    {/* Right - Form */}
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-6 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
                        >
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-mono text-muted-foreground">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full bg-background border border-border p-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-mono text-muted-foreground">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full bg-background border border-border p-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-mono text-muted-foreground">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="w-full bg-background border border-border p-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <m.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-primary-foreground p-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onMouseEnter={() => setCursorVariant("hover")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </m.button>
                        </form>
                    </m.div>
                </div>
            </div>
        </section>
    )
}
