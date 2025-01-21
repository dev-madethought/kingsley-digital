/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react"
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
  getCaption,
  getMenuTitle,
  getPrimaryDescription,
  getPrimaryTitle,
  getSecondaryDescription,
  getSecondaryTitle,
} from "./translations"

export const Philosophy = (props: PhilosophyProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const menu = useSelector((state: RootState) => state.global.menu)
  const { debug, boxShadow } = useDebug()

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
          {/* 15 cols grid */}
          <Box
            css={{
              display: "grid",
              gridColumn: "span 15",
            }}
          >
            {/* new grid on the 15 cols */}
            <Box
              css={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                columnGap: "10px",
                rowGap: 40,

                "@tablet": {
                  gridTemplateColumns: "repeat(15, 1fr)",
                },
              }}
            >
              <Text
                headingM
                css={{
                  gridColumn: "1 / span 15",
                  marginBottom: 48,
                }}
              >
                {getMenuTitle(language, props)}
              </Text>
              {props.description?.map((item) => {
                return (
                  <Fragment key={item._key}>
                    <Box
                      css={{
                        gridColumn: "1 / 12 span",

                        "@tablet": {
                          gridColumn: "1 / 6 span",
                        },
                      }}
                    >
                      <div>
                        <AnimationFadeIn>
                          <Text headingS css={{ marginBottom: 40 }}>
                            {getPrimaryTitle(language, item)}
                          </Text>
                        </AnimationFadeIn>
                        <AnimationFadeIn>
                          <Text body>
                            {getPrimaryDescription(language, item)}
                          </Text>
                        </AnimationFadeIn>
                      </div>
                    </Box>

                    <Box
                      tablet
                      key={item._key}
                      css={{
                        gridColumn: "9 / 6 span",
                      }}
                    >
                      <div>
                        <AnimationFadeIn>
                          <Text headingS css={{ marginBottom: 40 }}>
                            {getSecondaryTitle(language, item)}
                          </Text>
                        </AnimationFadeIn>
                        <AnimationFadeIn>
                          <Text body>
                            {getSecondaryDescription(language, item)}
                          </Text>
                        </AnimationFadeIn>
                      </div>
                    </Box>
                  </Fragment>
                )
              })}
            </Box>
          </Box>

          <Box
            tablet
            css={{
              boxShadow,
              gridColumn: "16 / span 9",
              flexDirection: "column",
              gap: 16,

              video: {
                width: "100%",
                alignSelf: "flex-start",
                pointerEvents: "none",
              },
            }}
          >
            <video src={"/mobile.mp4"} muted autoPlay loop playsInline />
            <Text caption>{getCaption(language, props)}</Text>
          </Box>
        </Grid>
      </Container>
    </>
  )
}
