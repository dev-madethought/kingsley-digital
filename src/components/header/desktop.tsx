import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

import { Language } from "@/containers/footer/language"
import useScroll from "@/hooks/useScroll"
import { RootState } from "@/state/store"
import { STEPS } from "@/types/intro"

import { Box } from "../box"
import { Button } from "../button"
import { Container } from "../container"
import { Grid, useDebug } from "../grid"
import { LogoMark, LogoWords } from "../icons"

import * as Styles from "./styles"
import { getPrimaryLabel, getSecondaryLabel } from "./translations"

function map(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) {
  // Calculate the mapped value
  const mappedValue =
    toMin + ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin)

  // Clamp the result to be between toMin (0) and toMax (1)
  return Math.max(toMin, Math.min(toMax, mappedValue))
}

function mapColor(value: number) {
  console.log("VALUE", value)
  // White and gray colors
  const white = { r: 255, g: 255, b: 255 }
  const gray = { r: 84, g: 84, b: 84 }

  // Interpolate the RGB values based on opacity
  const r = Math.round(white.r * (1 - value) + gray.r * value)
  const g = Math.round(white.g * (1 - value) + gray.g * value)
  const b = Math.round(white.b * (1 - value) + gray.b * value)

  return `rgb(${r}, ${g}, ${b})`
}

export const Desktop = ({
  color,
  background = false,
}: {
  color: string
  background?: boolean
}) => {
  const router = useRouter()
  const language = useSelector((state: RootState) => state.global.language)
  const menu = useSelector((state: RootState) => state.global.menu)
  const { step } = useSelector((state: RootState) => state.intro)

  const [expanded, setExpanded] = useState(false)

  const { direction, section, y } = useScroll()
  const { debug, boxShadow } = useDebug()

  const handleNavigation = (id: string) => {
    if (router.asPath !== "/") {
      router.push("/")
      setTimeout(() => {
        scrollTo(id)
      }, 300)
    } else {
      scrollTo(id)
    }
  }

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({
        block: "start",
        behavior: "smooth",
      })
    }
  }

  // changes between expand and contract layouts
  useEffect(() => {
    // if we're on hero it should be expanded
    // if we're not on hero we use direction to decide
    // if we're still on the hero, keep expanded

    let nextExpanded = true

    // if we only want to expand when we're not on the hero
    // const rect = document.getElementById("hero")?.getBoundingClientRect()
    // if (rect && rect.top * -1 > rect.height) {
    //   nextExpanded = direction === -1
    // }

    // if we want to expand when another section has a bigger % on screen
    if (section !== "hero") {
      nextExpanded = direction === -1
    }

    setExpanded(nextExpanded)
  }, [section, direction])

  const maxOffset = 200
  const opacityBackground = map(y, 0, maxOffset, 0, 0.9)
  const opacityBorder = map(y, 0, maxOffset, 0, 0.1)
  const nextColor = mapColor(map(y, 0, maxOffset, 0, 1))

  return (
    <Styles.Header
      css={{
        ...(background && {
          // gradient example
          background: `rgba(231, 230, 226, ${opacityBackground})`,
          borderBottom: `1px solid rgba(0, 0, 0, ${opacityBorder})`,
        }),
      }}
    >
      <Container debug={debug}>
        <Grid css={{ paddingTop: 40, paddingBottom: 40, color: nextColor }}>
          <Box
            css={{
              gridColumn: "1 / span 5",
              boxShadow,

              a: {
                color: "inherit",
              },
            }}
          >
            {step === STEPS.DONE && (
              <Link href="/">
                <LogoWords />
              </Link>
            )}
          </Box>

          {step === STEPS.DONE && (
            <Box
              css={{
                "@tablet": {
                  gridColumn: "7 / span 15",
                  boxShadow,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                },

                "@desktop": {
                  gridColumn: "7 / span 15",
                },
              }}
            >
              {/* BIG */}
              {expanded &&
                menu?.map((m: any, i: number) => {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Box
                        css={{
                          gap: 20,
                          color: nextColor,

                          gridColumn: "7 / span 15",
                          display: "grid",
                          gridTemplateColumns: "repeat(15, 1fr)",
                          columnGap: "10px",

                          a: {
                            color: nextColor,
                          },

                          button: {
                            color: nextColor,
                          },
                        }}
                      >
                        <Box
                          wrap
                          css={{
                            gridColumn: "span 4",
                          }}
                        >
                          <Button
                            variant="menu"
                            onClick={() => handleNavigation(m.id)}
                          >
                            {getPrimaryLabel(language, m)}
                          </Button>
                        </Box>

                        <Box
                          wrap
                          css={{
                            opacity: 0.5,
                            gridColumn: "span 4",
                          }}
                        >
                          <Button
                            variant="menu"
                            onClick={() => handleNavigation(m.id)}
                          >
                            {getSecondaryLabel(language, m)}
                          </Button>
                        </Box>

                        {i === 0 && (
                          <Box
                            css={{
                              gridColumn: "span 4",
                              position: "relative",
                            }}
                          >
                            <Box css={{ position: "absolute" }}>
                              <Language color={nextColor} />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </motion.div>
                  )
                })}

              {/* SMALL */}

              {!expanded && (
                <Box
                  css={{ gap: 5, flexDirection: "column", userSelect: "none" }}
                >
                  {/* dots */}
                  <Box css={{ gap: 16 }}>
                    {menu?.map((m: any, i: number) => {
                      const selected =
                        (section === "hero" && i === 0) || section === m.id
                      return (
                        <Box
                          key={m.id}
                          css={{
                            width: 2,
                            height: 2,
                            backgroundColor: selected ? nextColor : "$darker",
                          }}
                        />
                      )
                    })}
                  </Box>

                  {/* menu */}
                  {menu?.map((m: any, i: number) => {
                    const selected =
                      (section === "hero" && i === 0) || section === m.id

                    if (!selected) return null

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Box
                          css={{
                            gap: 20,
                            color: nextColor,

                            gridColumn: "7 / span 15",
                            display: "grid",
                            gridTemplateColumns: "repeat(15, 1fr)",
                            columnGap: "10px",

                            a: {
                              color: nextColor,
                            },

                            button: {
                              color: nextColor,
                            },
                          }}
                        >
                          <Box wrap css={{ gridColumn: "span 4" }}>
                            <Button variant="menu">
                              {getPrimaryLabel(language, m)}
                            </Button>
                          </Box>

                          <Box
                            wrap
                            css={{ opacity: 0.5, gridColumn: "span 4" }}
                          >
                            <Button variant="menu">
                              {getSecondaryLabel(language, m)}
                            </Button>
                          </Box>

                          <Box
                            css={{
                              gridColumn: "span 4",
                            }}
                          >
                            <Language color={nextColor} />
                          </Box>
                        </Box>
                      </motion.div>
                    )
                  })}
                </Box>
              )}
            </Box>
          )}

          <Box
            css={{
              gridColumn: "23 / span 2",
              boxShadow,
              justifyContent: "flex-end",

              svg: {
                flexShrink: 0,
              },
            }}
          >
            {step === STEPS.DONE && <LogoMark />}
          </Box>
        </Grid>
      </Container>
    </Styles.Header>
  )
}
