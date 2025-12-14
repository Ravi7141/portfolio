"use client"

import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    strength?: number
}

export function MagneticButton({ children, className = "", strength = 30 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }

        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)

        setPosition({ x: x / (strength / 10), y: y / (strength / 10) }) // Adjust divisor for sensitivity
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
