import { useState } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { RootState } from "@/state/store"
import { Services as ServicesProps } from "@/types/sanity"

import * as Styles from "./styles"
import {
  getPrimaryDescription,
  getSecondaryDescription,
  getServiceSinopsis,
  getServiceTitle,
  getTitle,
} from "./translations"

export const Services = (props: ServicesProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const [index, setIndex] = useState(-1)
  const { debug, boxShadow } = useDebug()

  const handleChange = (value: string) => {
    const service = props.allServices?.find((s) => s._key === value)
    const nextIndex = props.allServices?.findIndex((s) => s._key === value)
    setIndex(nextIndex === undefined ? -1 : nextIndex)
  }

  const getImageLayout = (index: number) => {
    // console.log("index", index)
    switch (index) {
      // case 0:
      //   return <Box>0</Box>
      default:
        return (
          <Box
            css={{
              column: 9,

              img: {
                width: "100%",
                height: "auto",
              },
            }}
          >
            <Image
              src={urlForImage(props.image)}
              alt="default"
              width={504}
              height={756}
            />
          </Box>
        )
    }
  }

  console.log("render", index)
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
          {getImageLayout(index)}
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
          <Styles.AccordionRoot
            type="single"
            collapsible
            onValueChange={handleChange}
          >
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
                    <Text>{getServiceTitle(language, service)}</Text>
                  </Box>
                  <Box
                    css={{
                      position: "relative",
                      // column: 1,
                      // paddingRight: 8,
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: 24,
                      height: 24,

                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        right: 6,
                        width: 13,
                        height: 1,
                        background: "$typography",
                        transition: "all 300ms ease-out",
                      },

                      "&:after": {
                        content: '""',
                        position: "absolute",
                        right: 12,
                        width: 1,
                        height: 13,
                        background: "$typography",
                        opacity: 1,
                        transition: "all 300ms ease-out",
                      },

                      "[data-state=open] &": {
                        "&:before": {
                          transform: "rotate(180deg)",
                        },

                        "&:after": {
                          opacity: 0,
                          transform: "rotate(270deg)",
                        },
                      },
                    }}
                  ></Box>
                </Styles.AccordionTrigger>
                <Styles.AccordionContent>
                  <Box css={{ column: 1 }} />
                  <Box
                    css={{
                      column: 8,
                      flexDirection: "column",
                      gap: 24,
                      paddingTop: 24,
                      paddingBottom: 64,
                    }}
                  >
                    {getServiceSinopsis(language, service)}
                    <Button>Learn More</Button>
                  </Box>
                </Styles.AccordionContent>
              </Styles.AccordionItem>
            ))}
          </Styles.AccordionRoot>
        </Box>
      </Grid>
    </Container>
  )
}
