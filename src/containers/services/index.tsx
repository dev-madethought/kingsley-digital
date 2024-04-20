import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"
import { Services as ServicesProps } from "@/types/sanity"

import * as Styles from "./styles"
import {
  getPrimaryDescription,
  getSecondaryDescription,
  getTitle,
} from "./translations"

export const Services = (props: ServicesProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, boxShadow } = useDebug()

  return (
    <Container
      debug={debug}
      css={{
        background: "$background",
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
            boxShadow,
            "@tablet": {
              gridColumn: "21 / span 4",
              marginBottom: 88,
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
              gridColumn: "1 / span 6",
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
              gridColumn: "8 / span 6",
            },
          }}
        >
          {getSecondaryDescription(language, props)}
        </Box>

        {/* IMAGES */}
        <Box
          css={{
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "1 / span 14",
              marginTop: 113,
            },
          }}
        >
          IMAGES GO HERE
        </Box>

        {/* ACCORDION */}
        <Box
          css={{
            gridColumn: "span 12",
            // boxShadow,

            "@tablet": {
              gridColumn: "15 / span 10",
              marginTop: 113,
            },
          }}
        >
          <Styles.AccordionRoot type="single" collapsible>
            {props.allServices?.map((service, i) => (
              <Styles.AccordionItem key={service._key} value={service._key}>
                <Styles.AccordionTrigger>
                  <Box css={{ gap: 10 }}>
                    <Box
                      css={{
                        column: 2,
                        paddingLeft: 8,
                        alignItems: "center",
                      }}
                    >
                      0{i + 1}
                    </Box>
                    <Text>Item {i + 1}</Text>
                  </Box>
                  <Box
                    css={{
                      column: 1,
                      paddingRight: 8,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    +
                  </Box>
                </Styles.AccordionTrigger>
                <Styles.AccordionContent>
                  Small text for item {i + 1} Lorem ipsum dolor sit amet
                </Styles.AccordionContent>
              </Styles.AccordionItem>
            ))}
          </Styles.AccordionRoot>
        </Box>
      </Grid>
    </Container>
  )
}
