import { ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"

// https://bennettfeely.com/clippy/

export interface AnimateRectMaskProps {
  children?: ReactNode
  width?: number
  height?: number
  animate?: boolean
  onAnimationComplete?: (open: boolean) => void
}

export const AnimateRectMask = ({
  children,
  width = 240,
  height = 320,
  animate = false,
  onAnimationComplete,
}: AnimateRectMaskProps) => {
  const [animating, setAnimating] = useState(animate)

  const centerX = `calc((var(--vw) - ${width}px) / 2)`
  const centerY = `calc((var(--vh) - ${height}px) / 2)`
  const rectWidth = `${width}px`
  const rectHeight = `${height}px`
  const begin = [
    `${centerX} ${centerY}`,
    `calc(${centerX} + ${rectWidth}) ${centerY}`,
    `calc(${centerX} + ${rectWidth}) calc(${centerY} + ${rectHeight})`,
    `${centerX} calc(${centerY} + ${rectHeight})`,
  ]
  const end = ["0 0", "100vw 0", "100vw 100vh", "0 100vh"]

  useEffect(() => {
    if (animate) {
      setAnimating(true)
    }
  }, [animate])

  const handleAnimationComplete = () => {
    setAnimating(false)
  }

  if (animating && animate) {
    return (
      <motion.div
        style={{
          clipPath: `polygon(${begin.join(", ")})`,
        }}
        initial={{
          clipPath: `polygon(${begin.join(", ")})`,
        }}
        animate={{
          clipPath: `polygon(${animate ? end.join(", ") : begin.join(", ")})`,
          transition: { duration: 0.8, ease: "easeInOut" },
        }}
        onAnimationComplete={() => handleAnimationComplete()}
      >
        {children}
      </motion.div>
    )
  }
  return children
}
