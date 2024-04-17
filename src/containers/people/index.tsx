import { useEffect, useRef } from "react"
import { scroll } from "framer-motion/dom"
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { getWidth } from "@/components/grid"
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
    <Box
      css={{
        flexDirection: "column",
        background: "$background",
        paddingTop: 120,
        paddingBottom: 50,

        "@tablet": {
          paddingTop: 172,
          paddingBottom: 108,
        },
      }}
    >
      <Container>
        <Grid debug={debug}>
          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",
              boxShadow,
              "@tablet": {
                gridColumn: "1 / span 5",
              },
            }}
          >
            <Text headingM>{getTitle(language, props)}</Text>
          </Box>
          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",
              boxShadow,
              "@tablet": {
                gridColumn: "10 / span 6",
              },
            }}
          >
            {getPrimaryDescription(language, props)}
          </Box>

          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",
              opacity: 0.5,
              boxShadow,
              "@tablet": {
                gridColumn: "17 / span 6",
              },
            }}
          >
            {getSecondaryDescription(language, props)}
          </Box>
        </Grid>
      </Container>

      <Container
        css={{
          display: "unset",
          overflowX: "auto",
          margin: "0 $20",
          padding: 0,
          marginTop: 114,

          "@tablet": {
            margin: "0 $40",
            padding: 0,
            marginTop: 229,
          },
        }}
      >
        <Grid>
          <Box
            css={{
              gridColumn: "10 / span 6",
              display: "flex",
              gap: "10px",
              overflowX: "visible",
            }}
          >
            {props.people?.map((person, i) => (
              <Person key={i} person={person} />
            ))}
          </Box>
        </Grid>
      </Container>

      <Container
        css={{
          marginTop: 114,
          paddingBottom: 100,
          boxShadow,

          "@tablet": {
            paddingTop: 229,
          },
        }}
      >
        <Box css={{ justifyContent: "flex-end" }}>
          <Box
            css={{
              overflowX: "scroll",
              width: getWidth(15),
              gap: 10,
              paddingBottom: 40,

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
              <Person key={i} person={person} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
