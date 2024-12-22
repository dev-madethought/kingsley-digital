import { Box } from "@/components/box"
import { Text } from "@/components/text"
import { getTranslationForKey, TranslatableProps } from "@/lib/utils"

import { languages } from "../../../sanity.config"

export const Heading = (
  translatableProps: Exclude<TranslatableProps, "language">
) => (
  <Box
    css={{
      gridColumn: "1 / -1",
      paddingBottom: "$space$40",
    }}
  >
    <Text headingM>{getTranslationForKey(translatableProps)}</Text>
  </Box>
)

export default Heading
