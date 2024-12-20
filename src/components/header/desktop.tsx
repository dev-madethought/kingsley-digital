import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
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

interface MenuItemProps {
  primaryLabel: string
  secondaryLabel: string
  onClick: () => void
  color: string
}

const MenuItem = ({
  primaryLabel,
  secondaryLabel,
  onClick,
  color,
}: MenuItemProps) => (
  <Box
    css={{
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 10,
      color,
      a: { color },
      button: { color },
    }}
  >
    <Box css={{ gridColumn: "1 / span 3" }}>
      <Button variant="menu" onClick={onClick}>
        {primaryLabel}
      </Button>
    </Box>
    <Box css={{ gridColumn: "4 / span 3", opacity: 0.5 }}>
      <Button variant="menu" onClick={onClick}>
        {secondaryLabel}
      </Button>
    </Box>
  </Box>
)

export const Desktop = ({ color }: { color: string }) => {
  const router = useRouter()
  const language = useSelector((state: RootState) => state.global.language)
  const menu = useSelector((state: RootState) => state.global.menu)
  const { step } = useSelector((state: RootState) => state.intro)

  const [expanded, setExpanded] = useState(false)

  const { direction, section } = useScroll()
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

  return (
    <Styles.Header>
      <Container debug={debug}>
        <Grid css={{ paddingTop: 40, color }}>
          <Box
            css={{
              gridColumn: "span 12",
              boxShadow,

              "@tablet": {
                gridColumn: "1 / span 5",
              },

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
                gridColumn: "span 12",
                boxShadow,

                "@tablet": {
                  gridColumn: "7 / span 6",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                },
              }}
            >
              {/* BIG */}
              {expanded && (
                <AnimatePresence>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {menu?.map((m: any, i: number) => {
                      return (
                        <MenuItem
                          key={i}
                          primaryLabel={getPrimaryLabel(language, m)}
                          secondaryLabel={getSecondaryLabel(language, m)}
                          onClick={() => handleNavigation(m.id)}
                          color={color}
                        />
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* SMALL */}
              {!expanded && (
                <>
                  {/* dots */}
                  <Box
                    css={{
                      gridColumn: "1 / span 6",
                      display: "flex",
                      gap: 16,
                      marginBottom: 5,
                      color: "$typography",
                    }}
                  >
                    {menu?.map((m: any, i: number) => {
                      const selected =
                        (section === "hero" && i === 0) || section === m.id
                      return (
                        <Box
                          key={m.id}
                          css={{
                            width: 2,
                            height: 2,
                            backgroundColor: selected ? color : "$darker",
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
                      <>
                        {selected && (
                          <MenuItem
                            primaryLabel={getPrimaryLabel(language, m)}
                            secondaryLabel={getSecondaryLabel(language, m)}
                            onClick={() => handleNavigation(m.id)}
                            color={color}
                          />
                        )}
                      </>
                    )
                  })}
                </>
              )}
            </Box>
          )}

          {expanded && (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Box
                  css={{
                    alignItems: "start",
                    button: { color },
                  }}
                >
                  <Language />
                </Box>
              </motion.div>
            </AnimatePresence>
          )}

          <Box
            css={{
              gridColumn: "span 12",
              boxShadow,
              justifyContent: "center",

              "@tablet": {
                gridColumn: "23 / span 2",
                justifyContent: "flex-end",
              },

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
