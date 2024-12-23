/* eslint-disable @next/next/no-img-element */
import { useRef } from "react"
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid, useDebug } from "@/components/grid"
import { Heading } from "@/components/heading"
import { TranslatedRow } from "@/components/translated-row"
import { RootState } from "@/state/store"
import { Philosophy as PhilosophyProps } from "@/types/sanity"

export const Philosophy = (props: PhilosophyProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, boxShadow } = useDebug()
  const video2 = useRef<HTMLVideoElement>(null)

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
            paddingTop: 60,
            paddingBottom: 60,
            gridAutoFlow: "dense",
            rowGap: "$space$40",

            "@tablet": {
              paddingTop: 80,
            },

            "@desktop": {
              paddingTop: 250,
            },
          }}
        >
          <Heading props={props} language={language} translationKey="menu" />

          {/* descriptions  */}
          {props.description?.map((item) => {
            return (
              <>
                <TranslatedRow
                  key={item._key}
                  props={item as any}
                  translationKey="title"
                />
                <TranslatedRow
                  key={item._key}
                  props={item as any}
                  translationKey="description"
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
