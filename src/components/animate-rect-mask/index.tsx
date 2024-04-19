import { ReactNode } from "react"
import { motion } from "framer-motion"

// https://bennettfeely.com/clippy/

export interface AnimateRectMaskProps {
  children?: ReactNode
  width?: number
  height?: number
  expanded?: boolean
  onAnimationComplete?: (open: boolean) => void
}

export const AnimateRectMask = ({
  children,
  width = 240,
  height = 320,
  expanded = false,
  onAnimationComplete,
}: AnimateRectMaskProps) => {
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
  const end = ["0 0", "100% 0", "100% 100%", "0 100%"]

  return (
    <motion.div
      style={{
        // width: "100%",
        // height: "100%",
        clipPath: `polygon(${begin.join(", ")})`,
      }}
      initial={{
        clipPath: `polygon(${begin.join(", ")})`,
      }}
      animate={{
        clipPath: `polygon(${expanded ? end.join(", ") : begin.join(", ")})`,
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
      onAnimationComplete={() => onAnimationComplete?.(expanded)}
    >
      {children}
    </motion.div>
  )
}
