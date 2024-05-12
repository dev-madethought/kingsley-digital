"use client"

import { CSSProperties, ReactNode } from "react"

import { AnimationCharacterReveal } from "@/components/animate-character-reveal"
import { AnimationFadeIn } from "@/components/animation-fade-in"
import { AnimationWordReveal } from "@/components/animation-word-reveal"
import { Box } from "@/components/box"

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
      border: "1px dashed red",
      ...css,
    }}
  >
    {children}
  </Box>
)

export default function Page() {
  return (
    <>
      <Section css={{ flexDirection: "column" }}>
        <AnimationWordReveal text="This is a word reveal animation" />
        <AnimationCharacterReveal text="This is a character reveal animation" />
      </Section>
      <Section>
        <AnimationFadeIn>This is a fade in</AnimationFadeIn>
      </Section>
      <Section>
        <AnimationCharacterReveal text="This is a character reveal animation" />
      </Section>
    </>
  )
}
