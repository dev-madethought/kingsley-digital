import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { AnimateRectMask } from "@/components/animate-rect-mask"
import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Header } from "@/components/header"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
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

export const Hero = (props: HeroProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const [expanded, setExpanded] = useState(false)
  const { debug, boxShadow } = useDebug()

  useEffect(() => {
    const timeout = setTimeout(() => setExpanded(true), 300)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimateRectMask expanded={expanded}>
      <Container
        debug={debug}
        css={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Grid>
          <Box
            as="video"
            src={"/hero.mp4"}
            autoPlay
            muted
            loop
            playsInline
            css={{
              display: "unset",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Box
            css={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 99999999,
              border: "1px dashed red",
            }}
          >
            <Header color="white" />
          </Box>

          <Box
            css={{
              marginTop: "calc(100vh - 48px)",
              transform: "translateY(-100%)",
              zIndex: 1,
              gridColumn: "span 12",
              boxShadow,

              "@tablet": {
                gridColumn: "1 / span 14",
              },
            }}
          >
            <Sentence
              greeting={getGreeting(language, props) as any}
              sentence={getSentence(language, props) as any}
            />
          </Box>

          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",
              color: "white",
              boxShadow,
              zIndex: 1,
              marginBottom: 32,

              "@tablet": {
                gridColumn: "13 / span 4",
                marginBottom: 115,
              },
            }}
          >
            <Text uppercase wrap>
              {getMainTitle(language, props)}
            </Text>
            <Text uppercase wrap css={{ opacity: 0.5 }}>
              {getSecondaryTitle(language, props)}
            </Text>
          </Box>

          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",
              color: "white",
              boxShadow,
              gap: 20,
              zIndex: 1,
              marginBottom: 50,

              "@tablet": {
                gridColumn: "17 / span 8",
                marginBottom: 115,
              },
            }}
          >
            <PortableText
              value={getMainDescription(language, props) as any}
              components={components}
            />
            <Box
              css={{
                display: "none",

                "@tablet": {
                  opacity: 0.5,
                  display: "flex",
                },
              }}
            >
              <PortableText
                value={getSecondaryDescription(language, props) as any}
                components={components}
              />
            </Box>
          </Box>
        </Grid>
      </Container>
    </AnimateRectMask>
  )
}
