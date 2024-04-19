import { useSelector } from "react-redux"

import * as Accordion from "@radix-ui/react-accordion"

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
  console.log("services", props)

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
            boxShadow,

            "@tablet": {
              gridColumn: "15 / span 10",
              marginTop: 113,
            },
          }}
        >
          <Styles.AccordionRoot type="single" defaultValue="item-1" collapsible>
            <Styles.AccordionItem value="item-1">
              <Styles.AccordionTrigger>Item 1</Styles.AccordionTrigger>
              <Styles.AccordionContent>
                Small text for item 1
              </Styles.AccordionContent>
            </Styles.AccordionItem>

            <Styles.AccordionItem value="item-2">
              <Styles.AccordionTrigger>Item 2</Styles.AccordionTrigger>
              <Styles.AccordionContent>
                Small text for item 2
              </Styles.AccordionContent>
            </Styles.AccordionItem>
          </Styles.AccordionRoot>
        </Box>
      </Grid>
    </Container>
  )
}
