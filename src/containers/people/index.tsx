import { Fragment, useEffect, useRef } from "react"
import { scroll } from "framer-motion/dom"
import { useSelector } from "react-redux"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Person } from "@/components/person"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"
import { People as PeopleProps } from "@/types/sanity"

import {
  getPrimaryDescription,
  getSecondaryDescription,
  getTitle,
} from "./translations"

export const People = (props: PeopleProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, boxShadow } = useDebug()

  const domElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let unsubscribe = null

    if (domElement.current) {
      unsubscribe = scroll(() => null, {
        source: domElement.current,
        axis: "x",
      })
    }

    return () => {
      unsubscribe?.()
    }
  }, [])
  return (
    <Container
      debug={debug}
      css={{
        paddingTop: 120,
        paddingBottom: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",

        "@tablet": {
          paddingTop: 172,
          paddingBottom: 108,
        },
      }}
    >
      <Grid>
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            marginBottom: 40,
            boxShadow,

            "@tablet": {
              marginBottom: "unset",
              gridColumn: "1 / span 5",
            },
          }}
        >
          <AnimationFadeIn>
            <Text headingM>{getTitle(language, props)}</Text>
          </AnimationFadeIn>
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "8 / span 8",
            },

            "@desktop": {
              gridColumn: "10 / span 6",
            },
          }}
        >
          <AnimationFadeIn>
            {getPrimaryDescription(language, props)}
          </AnimationFadeIn>
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

            "@desktop": {
              gridColumn: "17 / span 6",
            },
          }}
        >
          <AnimationFadeIn>
            {getSecondaryDescription(language, props)}
          </AnimationFadeIn>
        </Box>
      </Grid>

      <Box
        css={{
          paddingTop: 114,
          paddingBottom: 40,
          overflowX: "scroll",
          column: 12,
          gap: 10,

          "@tablet": {
            paddingTop: 229,
            column: 24,
          },

          "@desktop": {
            column: 15,
          },

          "&::-webkit-scrollbar": {
            height: 5,
            width: 5,
            background: "$darker",
            borderRadius: "1ex",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "$typography",
            borderRadius: "1ex",
          },
        }}
      >
        {props.people?.map((person, i) => (
          <Fragment key={i}>
            <Person person={person} index={i} />
            {i < (props.people?.length || 1) - 1 && (
              <Box tablet css={{ flexShrink: 0, column: 1, boxShadow }} />
            )}
          </Fragment>
        ))}
      </Box>
    </Container>
  )
}
