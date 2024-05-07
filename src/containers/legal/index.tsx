import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"
import { Legal as LegalProps } from "@/types/sanity"

import {
  getPrimaryBody,
  getPrimaryTitle,
  getSecondaryBody,
} from "./translations"

export const Legal = (props: LegalProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, boxShadow } = useDebug()

  return (
    <Container
      debug={debug}
      css={{
        background: "$background",
      }}
    >
      <Grid
        css={{
          paddingTop: 233,
          paddingBottom: 40,

          "@tablet": {
            paddingTop: 250,
            paddingBottom: 56,
          },
        }}
      >
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            marginBottom: 40,
            boxShadow,

            "@tablet": {
              gridColumn: "1 / span 6",
              marginBottom: 0,
            },
          }}
        >
          <Text headingM>{getPrimaryTitle(language, props)}</Text>
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "8 / span 8",
            },
          }}
        >
          <PortableText
            value={getPrimaryBody(language, props) as any}
            components={components}
          />
        </Box>

        <Box
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "17 / span 8",
              opacity: 0.5,
              boxShadow,
            },
          }}
        >
          <PortableText
            value={getSecondaryBody(language, props) as any}
            components={components}
          />
        </Box>
      </Grid>
    </Container>
  )
}
