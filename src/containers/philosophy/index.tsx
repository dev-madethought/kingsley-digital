/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { RootState } from "@/state/store"
import { Philosophy as PhilosophyProps } from "@/types/sanity"

import {
  getMainBody,
  getMainTitle,
  getSecondaryBody,
  getSecondaryTitle,
} from "./translations"

export const Philosophy = (props: PhilosophyProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, border } = useDebug()

  return (
    <>
      {/* mobile only */}
      <Box
        mobile
        css={{
          gridColumn: "span 12",
          border,

          img: {
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
          },
        }}
      >
        {props.image && (
          <img src={urlForImage(props.image)} alt="philosophy image" />
        )}
      </Box>

      {/* mobile, tablet and desktop */}
      <Container>
        <Grid
          debug={debug}
          css={{
            paddingTop: 88,
            paddingBottom: 60,
            background: "$background",
            "@tablet": {
              paddingTop: 250,
            },
          }}
        >
          {/* primary language */}
          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",
              border,
              "@tablet": {
                gridColumn: "1 / span 5",
              },
            }}
          >
            <Text headingS css={{ marginBottom: 40 }}>
              {getMainTitle(language, props)}
            </Text>

            <Box css={{ flexDirection: "column", gap: 20 }}>
              <PortableText
                value={getMainBody(language, props)!}
                components={components}
              />
            </Box>
          </Box>

          {/* Secondary language (hides on mobile) */}
          <Box
            css={{
              display: "none",
              "@tablet": {
                display: "flex",
                flexDirection: "column",
                border,
                gridColumn: "7 / span 5",
              },
            }}
          >
            <Text headingS css={{ marginBottom: 40, opacity: 0.5 }}>
              {getSecondaryTitle(language, props)}
            </Text>

            <Box css={{ flexDirection: "column", gap: 20, opacity: 0.5 }}>
              <PortableText
                value={getSecondaryBody(language, props)!}
                components={components}
              />
            </Box>
          </Box>

          <Box
            tablet
            css={{
              gridColumn: "22 / span 3",
              border,

              img: {
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
              },
            }}
          >
            {props.image && (
              <img src={urlForImage(props.image)} alt="philosophy image" />
            )}
          </Box>
        </Grid>
      </Container>
    </>
  )
}
