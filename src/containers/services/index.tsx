import { useState } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
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

const LAYOUTS = ["layout1", "layout2", "layout1", "layout3"]

export const Services = (props: ServicesProps) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)
  const [index, setIndex] = useState(-1)
  const { debug, boxShadow } = useDebug()

  const handleChange = (value: string) => {
    // const service = props.allServices?.find((s) => s._key === value)
    const nextIndex = props.allServices?.findIndex((s) => s._key === value)
    setIndex(nextIndex === undefined ? -1 : nextIndex)
  }

  const getImageLayout = (index: number) => {
    // console.log("index", index)

    const images =
      props.allServices?.[index]?.images?.map((i) => urlForImage(i)) || []
    const key = props.allServices?.[index]?._key

    const layout = LAYOUTS[index % LAYOUTS.length]

    switch (layout) {
      case "layout1":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <Box
              css={{
                column: 9,
                boxShadow,

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              <Image src={images[0]} alt="image 1" width={504} height={756} />
            </Box>
            <Box
              css={{
                column: 5,
                boxShadow,

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              <Image src={images[1]} alt="image 2" width={275} height={367} />
            </Box>
          </Box>
        )
      case "layout2":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <Box
              css={{
                column: 5,
                boxShadow,

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              <Image src={images[0]} alt="image 1" width={275} height={367} />
            </Box>

            <Box
              css={{
                column: 9,
                boxShadow,

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              <Image src={images[1]} alt="image 2" width={504} height={756} />
            </Box>
          </Box>
        )
      case "layout3":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <Box
              css={{
                column: 6,
                boxShadow,

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "bottom",
                },
              }}
            >
              <Image src={images[0]} alt="image 1" width={333} height={445} />
            </Box>

            <Box
              css={{
                column: 8,
                boxShadow,

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                  marginBottom: 100,
                },
              }}
            >
              <Image src={images[1]} alt="image 2" width={446} height={669} />
            </Box>
          </Box>
        )
      default:
        // generic image
        return (
          <Box
            css={{
              column: 9,

              img: {
                width: "100%",
                height: "auto",
                objectFit: "contain",
              },
            }}
          >
            <Image
              src={urlForImage(props.image)}
              alt="default"
              width={504}
              height={756}
              priority
            />
          </Box>
        )
    }
  }

  const handleLearnMore = () => {
    dispatch(setModal({ type: "service" }))
  }

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
                    <Button onClick={handleLearnMore}>Learn More</Button>
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
