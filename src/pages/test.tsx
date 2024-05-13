/* eslint-disable @next/next/no-img-element */
"use client"

import { CSSProperties, ReactNode } from "react"

import { AnimationCharacterReveal } from "@/components/animate-character-reveal"
import { AnimationFadeIn } from "@/components/animation-fade-in"
import { AnimationMaskReveal } from "@/components/animation-mask-reveal"
import { AnimationWordReveal } from "@/components/animation-word-reveal"
import { Box } from "@/components/box"
import { Text } from "@/components/text"

const Section = ({
  children,
  css,
}: {
  children: ReactNode
  css?: Partial<CSSProperties>
}) => (
  <Box
    css={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      flexDirection: "column",
      border: "1px dashed black",
      ...css,
    }}
  >
    {children}
  </Box>
)

export default function Page() {
  return (
    <>
      {/* MASK REVEAL */}
      <Section>
        <AnimationMaskReveal>
          <img src="/test.jpg" alt="test" />
        </AnimationMaskReveal>
      </Section>

      {/* CHARACTER REVEAL */}
      <Section>
        <Text headingS>
          <AnimationCharacterReveal text="This is an animation character reveal" />
        </Text>
        <Text headingM>
          <AnimationCharacterReveal text="This is an animation character reveal" />
        </Text>
      </Section>

      {/* WORD REVEAL */}
      <Section>
        <Text headingS>
          <AnimationWordReveal text="This is an animation word reveal" />
        </Text>
        <Text headingM>
          <AnimationWordReveal text="This is an animation word reveal" />
        </Text>
      </Section>

      {/* FADE IN */}
      <Section>
        <AnimationFadeIn>This is a fade in</AnimationFadeIn>
      </Section>
    </>
  )
}
