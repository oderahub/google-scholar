'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)

    // Create gradient points
    const gradientPoints: {
      x: number
      y: number
      radius: number
      color: string
      speed: { x: number; y: number }
    }[] = []
    const pointCount = 15

    for (let i = 0; i < pointCount; i++) {
      gradientPoints.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 200 + 100,
        color: i % 2 === 0 ? 'rgba(30, 64, 175, 0.03)' : 'rgba(30, 64, 175, 0.02)',
        speed: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2
        }
      })
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Update and draw gradient points
      gradientPoints.forEach((point) => {
        // Update position
        point.x += point.speed.x
        point.y += point.speed.y

        // Bounce off edges
        if (point.x < -point.radius) point.x = window.innerWidth + point.radius
        if (point.x > window.innerWidth + point.radius) point.x = -point.radius
        if (point.y < -point.radius) point.y = window.innerHeight + point.radius
        if (point.y > window.innerHeight + point.radius) point.y = -point.radius

        // Draw gradient
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          point.radius
        )

        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(
          point.x - point.radius,
          point.y - point.radius,
          point.radius * 2,
          point.radius * 2
        )
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}
