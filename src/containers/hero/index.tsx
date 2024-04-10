import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { AnimateRectMask } from "@/components/animate-rect-mask"
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"
import { RootState } from "@/state/store"
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

// text reveal animation: https://brad-carter.medium.com/how-to-animate-a-text-reveal-effect-in-react-with-framer-motion-ae8ddd296f0d
// video mask animation: https://bertchcapital.com/
export const Hero = (props: HeroProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const [expanded, setExpanded] = useState(false)
  const { border } = useDebug()

  useEffect(() => {
    // animation on timeout
    const timeout = setTimeout(() => setExpanded(true), 300)
    return () => {
      clearTimeout(timeout)
    }

    // animation on scroll
    // const handleScroll = () => {
    //   setExpanded(true)
    //   window.removeEventListener("scroll", handleScroll)
    // }
    // window.addEventListener("scroll", handleScroll)
    // return () => {
    //   window.removeEventListener("scroll", handleScroll)
    // }
  }, [])

  return (
    <Box css={{ position: "relative" }}>
      <AnimateRectMask expanded={expanded}>
        <video
          src={"/hero.mp4"}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Container
          css={{
            position: "absolute",
            top: "100vh",
            left: 0,
            width: "100vw",
            transform: "translateY(calc(-100% - 40px))",
            zIndex: 999,
          }}
        >
          <Sentence
            greeting={getGreeting(language, props)!}
            sentence={getSentence(language, props)!}
          />
        </Container>
      </AnimateRectMask>

      <Container
        css={{
          position: "relative",
          justifyContent: "end",
          paddingTop: "calc(100vh + 150px)",
          paddingBottom: 115,
          color: "white",
          zIndex: 0,
        }}
      >
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            marginBottom: 32,
            border,
            "@tablet": {
              gridColumn: "13/17",
              marginBottom: 0,
            },
          }}
        >
          <Text uppercase>{getMainTitle(language, props)}</Text>
          <Text uppercase css={{ opacity: 0.5 }}>
            {getSecondaryTitle(language, props)}
          </Text>
        </Box>
        <Box
          css={{
            gridColumn: "span 12",
            border,
            "@tablet": {
              gridColumn: "span 8",
            },
          }}
        >
          <Box css={{ flexDirection: "column", gap: 20 }}>
            <PortableText
              value={getMainDescription(language, props)!}
              components={components}
            />
            <Box css={{ opacity: 0.5 }}>
              <PortableText
                value={getSecondaryDescription(language, props)!}
                components={components}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
