import { useSelector } from "react-redux"

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
  const { debug, border } = useDebug()

  // TODO: add Container
  return (
    <>
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
            <Text headingM>{getTitle(language, props)}</Text>
          </Box>
          <Box
            css={{
              flexDirection: "column",
              gridColumn: "span 12",
              border,
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
              border,
              "@tablet": {
                gridColumn: "17 / span 6",
              },
            }}
          >
            {getSecondaryDescription(language, props)}
          </Box>

          <Box
            css={{
              gridColumn: "10 / 25",
              overflow: "hidden",
              overflowX: "auto",
            }}
          >
            <Box
              css={{
                gridColumn: "10 / span 6",
                display: "flex",
                gap: "10px",
              }}
            >
              {props.people?.map((person, i) => (
                <Person key={i} {...person} />
              ))}
            </Box>
          </Box>
        </Grid>
      </Container>

      <Container
        css={{
          display: "unset",
          overflowX: "auto",
          border: "1px solid red",
        }}
      >
        <Grid>
          <Box
            css={{
              gridColumn: "10 / span 6",
              display: "flex",
              gap: "10px",
            }}
          >
            {props.people?.map((person, i) => (
              <Person key={i} {...person} />
            ))}
          </Box>
        </Grid>
      </Container>
    </>
  )
}
