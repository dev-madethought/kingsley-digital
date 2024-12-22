import { useState } from "react"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { AnimationMaskReveal } from "@/components/animation-mask-reveal"
import { Box } from "@/components/box"
// import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid, useDebug } from "@/components/grid"
import Heading from "@/components/heading"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { TranslatedRow } from "@/components/translated-row"
import { urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
import { setService } from "@/state/reducers/service"
import { RootState } from "@/state/store"
import { Services as ServicesProps } from "@/types/sanity"

import * as Styles from "./styles"
import {
  // getLearnMoreButton,
  getServiceDescription,
  getServiceTitle,
} from "./translations"

const LAYOUTS = ["layout1", "layout2", "layout1", "layout3"]

export const Services = (props: ServicesProps) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)
  const settings = useSelector((state: RootState) => state.global.settings)
  const [index, setIndex] = useState(-1)
  const { debug, boxShadow } = useDebug()

  const handleChange = (value: string) => {
    const service = props.allServices?.find((s) => s._key === value)
    dispatch(setService({ ...service }))

    const nextIndex = props.allServices?.findIndex((s) => s._key === value)
    setIndex(nextIndex === undefined ? -1 : nextIndex)
  }

  const getImageLayout = (index: number) => {
    const images =
      props.allServices?.[index]?.images?.map((i) => urlForImage(i)) || []
    const key = props.allServices?.[index]?._key

    const layout = LAYOUTS[index % LAYOUTS.length]

    const image1 = images?.[0]
    const image2 = images?.[1]

    switch (layout) {
      case "layout1":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <Box
              css={{
                column: 9,
                position: "relative",
                alignItems: "flex-start",

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              {image1 && (
                <AnimationMaskReveal>
                  <Image src={image1} alt="image 1" width={504} height={756} />
                </AnimationMaskReveal>
              )}
            </Box>

            <Box
              desktop
              css={{
                column: 5,
                position: "relative",
                alignItems: "flex-start",

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              {image2 && (
                <AnimationMaskReveal delay={0.125}>
                  <Image src={image2} alt="image 2" width={275} height={367} />
                </AnimationMaskReveal>
              )}
            </Box>
          </Box>
        )
      case "layout2":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <Box
              desktop
              css={{
                column: 5,
                position: "relative",
                alignItems: "flex-start",

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              {image1 && (
                <AnimationMaskReveal>
                  <Image src={image1} alt="image 1" width={275} height={367} />
                </AnimationMaskReveal>
              )}
            </Box>

            <Box
              css={{
                column: 9,
                position: "relative",
                alignItems: "flex-start",

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },
              }}
            >
              {image2 && (
                <AnimationMaskReveal delay={0.125}>
                  <Image src={image2} alt="image 2" width={504} height={756} />
                </AnimationMaskReveal>
              )}
            </Box>
          </Box>
        )
      case "layout3":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <Box
              desktop
              css={{
                "@desktop": {
                  position: "relative",
                  column: 6,
                  alignItems: "flex-start",

                  img: {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    marginTop: 300,
                  },
                },
              }}
            >
              {image1 && (
                <AnimationMaskReveal>
                  <Image src={image1} alt="image 1" width={333} height={445} />
                </AnimationMaskReveal>
              )}
            </Box>

            <Box
              css={{
                position: "relative",
                alignItems: "flex-start",
                column: 9,

                img: {
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top",
                },

                "@tablet": {
                  column: 8,
                  // marginBottom: 100,

                  img: {
                    marginBottom: 100,
                  },
                },
              }}
            >
              {image2 && (
                <AnimationMaskReveal delay={0.125}>
                  <Image src={image2} alt="image 2" width={446} height={669} />
                </AnimationMaskReveal>
              )}
            </Box>
          </Box>
        )

      default:
        // generic image
        return (
          <Box
            css={{
              position: "relative",
              alignItems: "flex-start",
              column: 9,

              img: {
                width: "100%",
                height: "auto",
                objectFit: "contain",
              },
            }}
          >
            <AnimationMaskReveal>
              <Image
                src={urlForImage(props.image)}
                alt="default"
                width={504}
                height={756}
              />
            </AnimationMaskReveal>
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
        paddingTop: 166,
        paddingBottom: 56,

        "@tablet": {
          paddingTop: 172,
          paddingBottom: 108,
        },
      }}
    >
      <Grid>
        <Heading props={props} language={language} translationKey="title" />

        <TranslatedRow props={props} translationKey="description" />

        {/* IMAGES */}
        <Box
          css={{
            gridColumn: "span 10",
            marginTop: 113,
            marginBottom: 48,

            "@tablet": {
              marginBottom: 0,
              gridColumn: "1 / span 9",
            },

            "@desktop": {
              marginBottom: 0,
              gridColumn: "1 / span 14",
            },
          }}
        >
          <AnimatePresence>{getImageLayout(index)}</AnimatePresence>
        </Box>

        {/* ACCORDION */}
        <Box
          css={{
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "10 / span 15",
              marginTop: 113,
            },

            "@desktop": {
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
                    <Text headingS>{getServiceTitle(language, service)}</Text>
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
                  />
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

                      "@tablet": {
                        column: 12,
                        paddingBottom: 48,
                      },

                      "@desktop": {
                        column: 8,
                        paddingBottom: 64,
                      },
                    }}
                  >
                    {/* {getServiceSinopsis(language, service)} */}
                    <AnimationFadeIn>
                      <PortableText
                        value={getServiceDescription(language, service) as any}
                        components={components}
                      />
                    </AnimationFadeIn>
                    {/* <Button onClick={handleLearnMore}>
                      {getLearnMoreButton(language, settings?.buttons)}
                    </Button> */}
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
