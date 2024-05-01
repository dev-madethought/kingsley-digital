import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Box } from "../box"

import { Desktop } from "./desktop"

export const Header = ({ color = "$typography" }: { color?: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ position: "relative", width: "100%" }}
        >
          <Box tablet>
            <Desktop color={color} />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
