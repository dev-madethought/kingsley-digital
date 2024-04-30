import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import useScroll from "@/hooks/useScroll"
import { RootState } from "@/state/store"

import { Box } from "../box"
import { Button } from "../button"
import { Container } from "../container"
import { Grid, useDebug } from "../grid"
import { LogoMark, LogoWords } from "../icons"
import { Text } from "../text"

import * as Styles from "./styles"
import { getPrimaryLabel, getSecondaryLabel } from "./translations"

export const Desktop = ({ color }: { color: string }) => {
  const language = useSelector((state: RootState) => state.global.language)
  const menu = useSelector((state: RootState) => state.global.menu)

  const [expanded, setExpanded] = useState(false)

  const { direction, section } = useScroll()
  const { debug, boxShadow } = useDebug()

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
              gridColumn: "1 / span 2",
              boxShadow,
            }}
          >
            <LogoWords />
          </Box>
          <Box
            css={{
              gridColumn: "4 / span 19",
              boxShadow,
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {/* BIG */}
            {expanded &&
              menu?.map((m: any, i: number) => {
                return (
                  <Box
                    key={i}
                    css={{
                      gap: 20,
                      color,

                      a: {
                        color,
                      },

                      button: {
                        color,
                      },
                    }}
                  >
                    <Button variant="menu" onClick={() => scrollTo(m.id)}>
                      {getPrimaryLabel(language, m)}
                    </Button>
                    <Box css={{ opacity: 0.5 }}>
                      <Button variant="menu" onClick={() => scrollTo(m.id)}>
                        {getSecondaryLabel(language, m)}
                      </Button>
                    </Box>
                  </Box>
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
                    <Box key={i}>
                      {selected && (
                        <Box
                          css={{
                            gap: 20,
                          }}
                        >
                          <Text cta css={{ color, textTransform: "uppercase" }}>
                            {getPrimaryLabel(language, m)}
                          </Text>
                          <Box css={{ opacity: 0.5 }}>
                            <Text
                              cta
                              css={{ color, textTransform: "uppercase" }}
                            >
                              {getSecondaryLabel(language, m)}
                            </Text>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )
                })}
              </Box>
            )}
          </Box>

          <Box
            css={{
              gridColumn: "23 / span 2",
              boxShadow,
              justifyContent: "flex-end",
            }}
          >
            <LogoMark />
          </Box>
        </Grid>
      </Container>
    </Styles.Header>
  )
}
