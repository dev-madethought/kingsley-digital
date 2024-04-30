import { useState } from "react"
import { useSelector } from "react-redux"

import { RootState } from "@/state/store"

import { Box } from "../box"
import { Button } from "../button"
import { Container } from "../container"
import { Grid, useDebug } from "../grid"
import { LogoMark, LogoWords } from "../icons"

import * as Styles from "./styles"
import { getPrimaryLabel, getSecondaryLabel } from "./translations"

export const Header = () => {
  const { debug, boxShadow } = useDebug()
  const language = useSelector((state: RootState) => state.global.language)
  const menu = useSelector((state: RootState) => state.global.menu)
  const [active, setActive] = useState()

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          block: "start",
          behavior: "smooth",
        })
      }, 100)
    }
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = document.querySelectorAll("section") // assuming each component is wrapped in a <section> tag

  //     let id = null

  //     sections.forEach((section) => {
  //       const { top, bottom } = section.getBoundingClientRect()

  //       if (
  //         top <= window.innerHeight * 0.5 &&
  //         bottom >= window.innerHeight * 0.5
  //       ) {
  //         id = section.id
  //       }
  //     })

  //     if (id) setActive(id)
  //   }

  //   handleScroll()

  //   window.addEventListener("scroll", handleScroll)
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [])

  return (
    <Styles.Header
      css={{
        color: "white",
        // color: "$typography",
        // mixBlendMode: "difference",
      }}
    >
      <Container debug={debug}>
        <Grid css={{ paddingTop: 40 }}>
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
            }}
          >
            {menu?.map((m: any, i: number) => {
              return (
                <Box
                  key={i}
                  css={{
                    gap: 20,
                  }}
                >
                  <Button
                    variant="menu"
                    onClick={() => scrollTo(m.id)}
                    disabled={active === m.id}
                  >
                    {getPrimaryLabel(language, m)}
                  </Button>

                  <Box css={{ opacity: 0.5 }}>
                    <Button
                      variant="menu"
                      onClick={() => scrollTo(m.id)}
                      disabled={active === m.id}
                    >
                      {getSecondaryLabel(language, m)}
                    </Button>
                  </Box>
                </Box>
              )
            })}
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
