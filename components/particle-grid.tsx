"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    const gridSize = 50
    const points: { x: number; y: number; originX: number; originY: number }[] = []

    // Create grid points
    for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        points.push({ x, y, originX: x, originY: y })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw points
      points.forEach((point) => {
        const dx = mouseX - point.originX
        const dy = mouseY - point.originY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 30
          point.x = point.originX - (dx / distance) * force
          point.y = point.originY - (dy / distance) * force
        } else {
          point.x += (point.originX - point.x) * 0.1
          point.y += (point.originY - point.y) * 0.1
        }

        // Draw point
        const opacity = distance < maxDistance ? 0.8 : 0.3
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(0, 212, 255, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < gridSize * 1.5) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
