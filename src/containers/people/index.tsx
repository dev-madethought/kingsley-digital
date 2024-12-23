import { Fragment, useEffect, useRef } from "react"
import { scroll } from "framer-motion/dom"
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid, useDebug } from "@/components/grid"
import Heading from "@/components/heading"
import { Person } from "@/components/person"
import { TranslatedRow } from "@/components/translated-row"
import { RootState } from "@/state/store"
import { People as PeopleProps } from "@/types/sanity"

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
        <Heading props={props} language={language} translationKey="title" />

        <TranslatedRow props={props} translationKey="description" />
      </Grid>

      <Box
        css={{
          paddingTop: 114,
          paddingBottom: 40,
          overflowX: "auto",
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
