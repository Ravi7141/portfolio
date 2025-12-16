"use client"

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion"

export function AnimationProvider({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
                {children}
            </MotionConfig>
        </LazyMotion>
    )
}
