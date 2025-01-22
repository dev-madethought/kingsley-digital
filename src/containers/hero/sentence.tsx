import { AnimatePresence, motion } from "framer-motion"

import { Box } from "@/components/box"
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
        style={{
          display: "flex",
        }}
      >
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",

            "@tablet": {
              flexDirection: "row",
            },
          }}
        >
          <Text
            css={{
              paddingTop: 30,
              color: "white",
              justifyContent: "center",
              display: "flex",
              marginBottom: 24,

              "@tablet": {
                minWidth: 60,
                marginBottom: 0,
              },
            }}
          >
            {greeting}
          </Text>
          <Text
            headingXL
            css={{
              position: "relative",
              color: "white",

              // "&:before": {
              //   content: greeting,
              //   padding: "0 $space$40",
              // },
            }}
          >
            {sentence}
          </Text>
        </Box>
      </motion.div>
    </AnimatePresence>
  )
}
