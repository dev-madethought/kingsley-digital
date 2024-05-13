/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"
import { Philosophy as PhilosophyProps } from "@/types/sanity"

import {
  getPrimaryDescription,
  getPrimaryTitle,
  getSecondaryDescription,
  getSecondaryTitle,
} from "./translations"

const DURATION = 3000

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

            "@tablet": {
              paddingTop: 80,
            },

            "@desktop": {
              paddingTop: 250,
            },
          }}
        >
          {/* primary language */}
          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",

              "@tablet": {
                gridColumn: "1 / span 11",
              },

              "@desktop": {
                gridColumn: "1 / span 6",
              },
            }}
          >
            <Box css={{ flexDirection: "column", gap: 40, boxShadow }}>
              {props.description?.map((item) => {
                return (
                  <Fragment key={item._key}>
                    <AnimationFadeIn>
                      <Text headingS>{getPrimaryTitle(language, item)}</Text>
                    </AnimationFadeIn>

                    <AnimationFadeIn>
                      <Text body>{getPrimaryDescription(language, item)}</Text>
                    </AnimationFadeIn>
                  </Fragment>
                )
              })}
            </Box>
          </Box>

          {/* Secondary language (hides on mobile) */}
          <Box
            tablet
            css={{
              "@tablet": {
                flexDirection: "column",
                gridColumn: "13 / span 11",
              },

              "@desktop": {
                flexDirection: "column",
                gridColumn: "8 / span 6",
              },
            }}
          >
            <Box
              css={{
                flexDirection: "column",
                gap: 40,
                boxShadow,
                opacity: 0.5,
              }}
            >
              {props.description?.map((item) => {
                return (
                  <Fragment key={item._key}>
                    <AnimationFadeIn>
                      <Text headingS>{getSecondaryTitle(language, item)}</Text>
                    </AnimationFadeIn>

                    <AnimationFadeIn>
                      <Text body>
                        {getSecondaryDescription(language, item)}
                      </Text>
                    </AnimationFadeIn>
                  </Fragment>
                )
              })}
            </Box>
          </Box>

          <Box
            desktop
            css={{
              gridColumn: "16 / span 3",
              boxShadow,

              video: {
                width: "100%",
              },
            }}
          >
            <video
              ref={video3}
              src={"/desktop-3.mp4"}
              muted
              autoPlay
              loop
              playsInline
              style={{
                opacity: index % 3 === 2 ? 1 : 0,
                transition: "opacity 0.3s ease-out",
              }}
            />
          </Box>

          <Box
            desktop
            css={{
              gridColumn: "19 / span 3",
              boxShadow,

              video: {
                width: "100%",
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
                opacity: index % 3 === 1 ? 1 : 0,
                transition: "opacity 0.3s ease-out",
              }}
            />
          </Box>

          <Box
            desktop
            css={{
              gridColumn: "22 / span 3",
              boxShadow,

              video: {
                width: "100%",
              },
            }}
          >
            <video
              ref={video1}
              src={"/desktop-1.mp4"}
              muted
              autoPlay
              loop
              playsInline
              style={{
                opacity: index % 3 === 0 ? 1 : 0,
                transition: "opacity 0.3s ease-out",
              }}
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}
