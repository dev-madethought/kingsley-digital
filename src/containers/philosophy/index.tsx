/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"
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
  const { border } = useDebug()

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
          <img src={urlForImage(props.image)} alt={props.image.alt} />
        )}
      </Box>

      {/* mobile, tablet and desktop */}
      <Container
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
              gridColumn: "span 5",
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

        {/* spacer hidden on mobile */}
        <Box
          css={{
            display: "none",
            "@tablet": {
              display: "flex",
              gridColumn: "span 1",
              border,
            },
          }}
        />

        {/* Secondary language (hides on mobile) */}
        <Box
          css={{
            display: "none",
            "@tablet": {
              display: "flex",
              flexDirection: "column",
              border,
              gridColumn: "span 5",
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
            display: "grid",
            gridTemplateColumns: "repeat(13, 1fr)",
            columnGap: 10,
            gridColumn: "span 13",
            border,
          }}
        >
          <Box
            css={{
              gridColumn: "10/14",
              img: {
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
              },
            }}
          >
            {props.image && (
              <img src={urlForImage(props.image)} alt={props.image.alt} />
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}
