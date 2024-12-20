"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
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
        minHeight: "var(--vh)",
        clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)",
        ...(step === STEPS.DONE && { zIndex: 1 }),
      }}
    >
      <Grid css={{ height: "var(--vh)" }}>
        {/* VIDEO */}
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
            paddingTop: "$space$40",
            color: "white",
            fontSize: 18,
            marginTop: "5vh",

            "@tablet": {
              marginTop: "25vh",
            },
          }}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: step === STEPS.DONE ? 1 : 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              {getGreeting(language, props)}
            </motion.div>
          </AnimatePresence>
        </Box>
        <Box
          css={{
            gridColumn: "span 12",
            boxShadow,
            marginTop: "$space$10",

            "@tablet": {
              marginTop: "25vh",
              gridColumn: "2 / span 18",
            },

            "@desktop": {
              gridColumn: "2 / span 18",
            },
          }}
        >
          <Text
            headingXL
            css={{
              position: "relative",
              color: "white",
            }}
          >
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: step === STEPS.DONE ? 1 : 0,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                {getSentence(language, props)}
              </motion.div>
            </AnimatePresence>
          </Text>
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            color: "white",
            boxShadow,
            gap: 20,
            marginTop: "$space$20",
            marginBottom: 50,

            "@tablet": {
              marginTop: "auto",
              gridColumn: "15 / span 10",
            },
          }}
        >
          <Box css={{ flexDirection: "column", marginBottom: "auto" }}>
            <AnimationFadeIn>
              <Text uppercase headingS>
                {getMainTitle(language, props)}
              </Text>
            </AnimationFadeIn>

            <AnimationFadeIn>
              <Text uppercase wrap css={{ opacity: 0.5 }}>
                {getSecondaryTitle(language, props)}
              </Text>
            </AnimationFadeIn>
          </Box>
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
