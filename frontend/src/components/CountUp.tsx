'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
}

const formatNumber = (val: number, end: number) => {
  if (val >= 1000000 && end >= 1000000) return Math.floor(val / 1000000) + 'M'
  if (val >= 1000 && end >= 1000) return Math.floor(val / 1000) + 'K'
  return val.toString()
}

export function CountUp({ end, suffix = '', duration = 7 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        // Use easeOutQuart for a smoother slow-down effect at the end
        const easeOut = 1 - Math.pow(1 - progress, 4)
        
        setCount(Math.floor(end * easeOut))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, isInView])

  return <span ref={ref}>{formatNumber(count, end)}{suffix}</span>
}
