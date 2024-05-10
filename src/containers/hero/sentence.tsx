import { AnimatePresence, motion } from "framer-motion"

import { Text } from "@/components/text"

export const Sentence = ({
  greeting,
  sentence,
  opacity,
}: {
  greeting: string
  sentence: string
  opacity: number
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        <Text
          headingXL
          css={{
            position: "relative",
            color: "white",

            "&:before": {
              content: greeting,
              padding: "0 $space$40",
            },
          }}
        >
          {sentence}
        </Text>
      </motion.div>
    </AnimatePresence>
  )
}
