import { useState } from "react"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { AnimationMaskReveal } from "@/components/animation-mask-reveal"
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Grid, useDebug } from "@/components/grid"
import Heading from "@/components/heading"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { TranslatedRow } from "@/components/translated-row"
import { urlForImage } from "@/sanity/lib/image"
import { setService } from "@/state/reducers/service"
import { RootState } from "@/state/store"
import { Services as ServicesProps } from "@/types/sanity"

import * as Styles from "./styles"
import { getServiceDescription, getServiceTitle } from "./translations"

const LAYOUTS = ["layout1"]

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

  console.log(index)

  const getImageLayout = (index: number) => {
    // Return default generic image when no service is selected
    if (index === -1) {
      return (
        <Box
          css={{
            position: "relative",
            alignItems: "flex-start",
            column: 12,

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

    const images =
      props.allServices?.[index]?.images?.map((i) => urlForImage(i)) || []
    const key = props.allServices?.[index]?._key
    const image1 = images?.[0]
    const image2 = images?.[1]

    return (
      <Box css={{ gap: 10 }} key={key}>
        <Box
          css={{
            column: 7,
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
            column: 6,
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
  }

  return (
    <Container
      debug={debug}
      css={{
        paddingTop: "$space$40",
        paddingBottom: 56,

        "@tablet": {
          paddingTop: 172,
          paddingBottom: 108,
        },
      }}
    >
      <Grid css={{ rowGap: "$space$40" }}>
        {/* IMAGES */}
        <Box
          mobile
          css={{
            gridColumn: "1 / -1",
            height: "100vw",
            marginLeft: "calc(-1*$space$20)",
            paddingBottom: "$space$20",
          }}
        >
          <AnimationMaskReveal>
            <Image
              style={{
                aspectRatio: 1,
                maxWidth: "none",
                width: "100vw",
                height: "auto",
              }}
              src={urlForImage(props.image)}
              alt="default"
              width={500}
              height={500}
            />
          </AnimationMaskReveal>
        </Box>

        <Heading props={props} language={language} translationKey="title" />

        <TranslatedRow props={props} translationKey="description" />

        {/* IMAGES */}
        <Box
          tablet
          css={{
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
            gridColumn: "1  / -1",
            boxShadow,

            "@tablet": {
              gridColumn: "10 / span 15",
            },

            "@desktop": {
              gridColumn: "15 / span 10",
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
