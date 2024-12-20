/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
import { getTranslationForKey } from "@/lib/utils"
import { RootState } from "@/state/store"
import { Philosophy as PhilosophyProps } from "@/types/sanity"

import {
  getPrimaryDescription,
  getPrimaryTitle,
  getSecondaryDescription,
  getSecondaryTitle,
} from "./translations"

const DURATION = 3000

const DescriptionRow = ({
  primary,
  secondary,
}: {
  primary: React.ReactNode
  secondary: React.ReactNode
}) => (
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

export const Philosophy = (props: PhilosophyProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, boxShadow } = useDebug()
  const video1 = useRef<HTMLVideoElement>(null)
  const video2 = useRef<HTMLVideoElement>(null)
  const video3 = useRef<HTMLVideoElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        return (prevIndex += 1)
      })
    }, DURATION)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* mobile only */}
      <Box
        css={{
          boxShadow,

          video: {
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            pointerEvents: "none",
          },

          "@tablet": {
            video: {
              width: "calc(100% - 80px)",
              margin: "0 auto",
            },
          },

          "@desktop": {
            display: "none",
          },
        }}
      >
        <video src={"/mobile.mp4"} muted autoPlay loop playsInline />
      </Box>

      {/* mobile, tablet and desktop */}
      <Container debug={debug}>
        <Grid
          css={{
            paddingTop: 88,
            paddingBottom: 60,
            rowGap: 40,
            gridAutoFlow: "dense",

            "@tablet": {
              paddingTop: 80,
            },

            "@desktop": {
              paddingTop: 250,
            },
          }}
        >
          <Box
            css={{
              gridColumn: "1 / -1",
              paddingBottom: "$space$40",
            }}
          >
            <Text headingM>
              {getTranslationForKey({
                key: "menu",
                props,
                language,
              })}
            </Text>
          </Box>

          {/* descriptions  */}
          {props.description?.map((item) => {
            return (
              <>
                <DescriptionRow
                  key={item._key}
                  primary={
                    <Text headingS>{getPrimaryTitle(language, item)}</Text>
                  }
                  secondary={
                    <Text body>{getSecondaryTitle(language, item)}</Text>
                  }
                />
                <DescriptionRow
                  key={item._key}
                  primary={
                    <Text headingS>
                      {getPrimaryDescription(language, item)}
                    </Text>
                  }
                  secondary={
                    <Text body>{getSecondaryDescription(language, item)}</Text>
                  }
                />
              </>
            )
          })}

          <Box
            desktop
            css={{
              boxShadow,
              position: "relative",

              "@tablet": {
                gridColumn: "-11 / span 11",
              },

              video: {
                width: "calc(100% + $space$40)",
                position: "absolute",
              },
            }}
          >
            <video
              ref={video2}
              src={"/desktop-2.mp4"}
              muted
              autoPlay
              loop
              playsInline
              style={{
                transition: "opacity 0.3s ease-out",
              }}
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}
