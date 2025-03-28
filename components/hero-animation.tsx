'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)

    // Node class
    class Node {
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
          Math.random() * 100 + 155
        )}, 255, ${Math.random() * 0.5 + 0.3})`
        this.speed = Math.random() * 0.2 + 0.05
        this.angle = Math.random() * Math.PI * 2
      }

      update() {
        this.angle += Math.random() * 0.02 - 0.01
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.clientWidth) this.angle = Math.PI - this.angle
        if (this.y < 0 || this.y > canvas.clientHeight) this.angle = -this.angle
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create nodes
    const nodeCount = 50
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight))
    }

    // Draw connections between nodes
    function drawConnections() {
      if (!ctx) return

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      drawConnections()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
    }
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center space-y-4 px-6 py-8 rounded-xl bg-background/30 backdrop-blur-md border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold font-heading">Blockchain-Verified Research</h3>
          <p className="text-muted-foreground">
            Transparent funding for groundbreaking discoveries
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
        </div>
      </motion.div>
    </div>
  )
}
