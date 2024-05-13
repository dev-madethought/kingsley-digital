"use client"

import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Header } from "@/components/header"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"
import { STEPS } from "@/types/intro"
import { Hero as HeroProps } from "@/types/sanity"

import { Sentence } from "./sentence"
import {
  getGreeting,
  getMainDescription,
  getMainTitle,
  getSecondaryDescription,
  getSecondaryTitle,
  getSentence,
} from "./translations"

export const Hero = (props: HeroProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { step } = useSelector((state: RootState) => state.intro)
  const { debug, boxShadow } = useDebug()

  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (step === STEPS.DONE) {
      video.current?.play()
    }
  }, [step])

  return (
    <Container
      debug={debug}
      css={{
        position: "relative",
        clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)",
        ...(step === STEPS.DONE && { zIndex: 1 }),
      }}
    >
      <Grid>
        <Box
          ref={video}
          as="video"
          src={"/hero.mp4"}
          autoPlay={false}
          muted
          loop
          playsInline
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />

        <Box
          css={{
            marginTop: "calc(var(--vh) - 48px)",
            transform: "translateY(-100%)",
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "1 / span 20",
            },

            "@desktop": {
              gridColumn: "1 / span 14",
            },
          }}
        >
          <Sentence
            greeting={getGreeting(language, props) as any}
            sentence={getSentence(language, props) as any}
            opacity={step === STEPS.DONE ? 1 : 0}
          />
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            color: "white",
            boxShadow,
            marginBottom: 32,

            "@tablet": {
              gridColumn: "9 / span 6",
              marginBottom: 115,
            },

            "@desktop": {
              gridColumn: "13 / span 4",
              marginBottom: 115,
            },
          }}
        >
          <AnimationFadeIn>
            <Text uppercase wrap>
              {getMainTitle(language, props)}
            </Text>
          </AnimationFadeIn>

          <AnimationFadeIn>
            <Text uppercase wrap css={{ opacity: 0.5 }}>
              {getSecondaryTitle(language, props)}
            </Text>
          </AnimationFadeIn>
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            color: "white",
            boxShadow,
            gap: 20,
            marginBottom: 50,

            "@tablet": {
              gridColumn: "15 / span 10",
              marginBottom: 115,
            },

            "@desktop": {
              gridColumn: "17 / span 8",
              marginBottom: 115,
            },
          }}
        >
          <AnimationFadeIn>
            <PortableText
              value={getMainDescription(language, props) as any}
              components={components}
            />
          </AnimationFadeIn>
          <Box
            css={{
              display: "none",

              "@tablet": {
                opacity: 0.5,
                display: "flex",
              },
            }}
          >
            <AnimationFadeIn>
              <PortableText
                value={getSecondaryDescription(language, props) as any}
                components={components}
              />
            </AnimationFadeIn>
          </Box>
        </Box>

        <Box
          css={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1, // needs to be on top of the sentence
          }}
        >
          <Header color="white" />
        </Box>
      </Grid>
    </Container>
  )
}
