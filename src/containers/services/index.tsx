// import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
// import { RootState } from "@/state/store"
import { People as PeopleProps } from "@/types/sanity"

export const Services = (props: PeopleProps) => {
  // const language = useSelector((state: RootState) => state.global.language)
  const { boxShadow } = useDebug()

  return (
    <Box
      css={{
        flexDirection: "column",
        background: "$background",
        // paddingTop: 120,
        // paddingBottom: 50,

        "@tablet": {
          // paddingTop: 172,
          // paddingBottom: 108,
        },
      }}
    >
      <Container>
        <Grid>
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
            <Text headingM>SERVICES</Text>
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
            PRIMARY DESCRIPTION
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
            SECONDARY DESCRIPTION
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
