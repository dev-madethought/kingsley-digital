import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import getTranslationForKey, { TranslatableProps } from "@/lib/utils"
import { RootState } from "@/state/store"
import { otherLanguage } from "@/utils"

import { AnimationFadeIn } from "../animation-fade-in"

export const TranslatedRow = (props: Omit<TranslatableProps, "language">) => {
  const language = useSelector((state: RootState) => state.global.language)

  // @ts-ignore, TODO: fix this
  const primary = getTranslationForKey({ ...props, language })

  // @ts-ignore, TODO: fix this
  const secondary = getTranslationForKey({
    ...props,
    language: otherLanguage(language),
  })

  return (
    <>
      <Box
        css={{
          flexDirection: "column",
          gridColumn: "1 / -1",

          "@tablet": {
            gridColumn: "1 / span 11",
          },

          "@desktop": {
            gridColumn: "1 / span 5",
          },
        }}
      >
        <AnimationFadeIn>{primary}</AnimationFadeIn>
      </Box>
      <Box
        tablet
        css={{
          flexDirection: "column",
          gridColumn: "1 / -1",
          opacity: 0.5,

          "@tablet": {
            gridColumn: "1 / span 11",
          },

          "@desktop": {
            gridColumn: "8 / span 5",
          },
        }}
      >
        <AnimationFadeIn>{secondary}</AnimationFadeIn>
      </Box>
    </>
  )
}
