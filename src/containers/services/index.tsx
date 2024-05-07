import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, stagger } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
import { setService } from "@/state/reducers/service"
import { RootState } from "@/state/store"
import { Services as ServicesProps } from "@/types/sanity"

import * as Styles from "./styles"
import {
  getLearnMoreButton,
  getPrimaryDescription,
  getSecondaryDescription,
  getServiceSinopsis,
  getServiceTitle,
  getTitle,
} from "./translations"

const LAYOUTS = ["layout1", "layout2", "layout1", "layout3"]

const motionProps = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
      duration: 0.5,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.3 },
  },
  style: { width: "100%" },
}

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
            <motion.div key="layout11" {...motionProps}>
              <Box
                css={{
                  column: 9,
                  position: "relative",

                  img: {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "top",
                  },
                }}
              >
                {image1 && (
                  <Image src={image1} alt="image 1" width={504} height={756} />
                )}
              </Box>
            </motion.div>

            <motion.div key="layout12" {...motionProps}>
              <Box
                tablet
                css={{
                  column: 5,
                  position: "relative",

                  img: {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "top",
                  },
                }}
              >
                {image2 && (
                  <Image src={image2} alt="image 2" width={275} height={367} />
                )}
              </Box>
            </motion.div>
          </Box>
        )
      case "layout2":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <motion.div key="layout21" {...motionProps}>
              <Box
                tablet
                css={{
                  column: 5,
                  position: "relative",

                  img: {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "top",
                  },
                }}
              >
                {image1 && (
                  <Image src={image1} alt="image 1" width={275} height={367} />
                )}
              </Box>
            </motion.div>

            <motion.div key="layout22" {...motionProps}>
              <Box
                css={{
                  column: 9,
                  position: "relative",

                  img: {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "top",
                  },
                }}
              >
                {image2 && (
                  <Image src={image2} alt="image 2" width={504} height={756} />
                )}
              </Box>
            </motion.div>
          </Box>
        )
      case "layout3":
        return (
          <Box css={{ gap: 10 }} key={key}>
            <motion.div key="layout31" {...motionProps}>
              <Box
                tablet
                css={{
                  "@tablet": {
                    column: 6,

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
                  <Image src={image1} alt="image 1" width={333} height={445} />
                )}
              </Box>
            </motion.div>

            <motion.div key="layout32" {...motionProps}>
              <Box
                css={{
                  column: 9,

                  img: {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "top",
                  },

                  "@tablet": {
                    column: 8,

                    img: {
                      marginBottom: 100,
                    },
                  },
                }}
              >
                {image2 && (
                  <Image src={image2} alt="image 2" width={446} height={669} />
                )}
              </Box>
            </motion.div>
          </Box>
        )

      default:
        // generic image
        return (
          <Box
            css={{
              column: 9,
              position: "relative",

              img: {
                width: "100%",
                height: "auto",
                objectFit: "contain",
              },
            }}
          >
            <motion.div key="layoutdefault1" {...motionProps}>
              <Image
                src={urlForImage(props.image)}
                alt="default"
                width={504}
                height={756}
              />
            </motion.div>
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
        paddingTop: 166,
        paddingBottom: 56,

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
            alignItems: "flex-end",
            marginBottom: 40,
            boxShadow,

            "@tablet": {
              alignItems: "flex-start",
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
            gridColumn: "span 11",
            boxShadow,

            "@tablet": {
              gridColumn: "1 / span 6",
            },
          }}
        >
          {getPrimaryDescription(language, props)}
        </Box>

        <Box
          tablet
          css={{
            "@tablet": {
              boxShadow,
              opacity: 0.5,
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
            marginTop: 113,
            marginBottom: 48,

            "@tablet": {
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
                    }}
                  >
                    {getServiceSinopsis(language, service)}
                    <Button onClick={handleLearnMore}>
                      {getLearnMoreButton(language, settings?.buttons)}
                    </Button>
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
