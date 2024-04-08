import { motion } from "framer-motion"

// https://codesandbox.io/p/sandbox/framer-motion-react-wavy-letter-text-animation-j69kkr?file=%2Fsrc%2FWavyText.tsx
export const AnimateTextLines = () => {
  const line1 = "   We invest in the"
  const line2 = "World's Potential"

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        staggerChildren: 0.08,
      },
    },
  }

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }
  return (
    <motion.div
      variants={sentence}
      initial="hidden"
      animate="visible"
      style={{ fontSize: 60 }}
    >
      {line1.split("").map((char, index) => {
        return (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        )
      })}
      <br />
      {line2.split("").map((char, index) => {
        return (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        )
      })}
    </motion.div>
  )
}
