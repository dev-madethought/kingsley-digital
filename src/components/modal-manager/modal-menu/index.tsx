/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Dialog } from "@/components/dialog"
import { Grid, useDebug } from "@/components/grid"
import { ArrowUp, LogoWords } from "@/components/icons"
import { Text } from "@/components/text"
import { Language } from "@/containers/footer/language"
import useScroll from "@/hooks/useScroll"
import { RootState } from "@/state/store"

import { getPrimaryLabel } from "./translations"

type ModalMenuProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const ModalMenu = ({ open, onOpenChange }: ModalMenuProps) => {
  const router = useRouter()
  const { boxShadow } = useDebug()
  const { section } = useScroll()

  const settings = useSelector((state: RootState) => state.global.settings)
  const language = useSelector((state: RootState) => state.global.language)
  const menu = useSelector((state: RootState) => state.global.menu)
  const initial = useRef(router.asPath)

  const { links, socialLinks } = settings || { links: [], socialLinks: [] }

  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value)
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

  const handleNavigation = (id: string) => {
    if (router.asPath !== "/") {
      router.push("/")
      setTimeout(() => {
        scrollTo(id)
        handleOpenChange(false)
      }, 300)
    } else {
      scrollTo(id)
      handleOpenChange(false)
    }
  }

  useEffect(() => {
    if (initial.current !== router.asPath) {
      handleOpenChange(false)
    }
  }, [router.asPath])

  const handleSocialLinks = () => {
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} isMenu slide>
      <Box
        css={{
          height: "var(--vh)",
          overflowY: "auto",
          marginRight: 20,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Container
          css={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "0 $space$20 $space$20 $space$20",
          }}
        >
          <Grid
            css={{
              paddingTop: 32,
              alignItems: "center",
            }}
          >
            <Box
              css={{
                gridColumn: "1 / span 10",
                boxShadow,

                a: {
                  color: "inherit",
                },
              }}
            >
              <LogoWords />
            </Box>
          </Grid>

          <Box
            css={{
              flexDirection: "column",
              gridColumn: "1 / span 12",
              flex: 1,
              gap: "$space$20",
            }}
          >
            <Box
              css={{
                flexDirection: "column",
                padding: "$space$80 0",
                gap: 15,
                flex: 1,

                "& > *": {
                  boxShadow,
                },
              }}
            >
              {menu?.map((item: any, i: number) => {
                const selected = section === item.id

                return (
                  <AnimationFadeIn key={item.id} delay={0.1 * i}>
                    <Button
                      key={i}
                      variant="menu"
                      onClick={() => handleNavigation(item.id)}
                    >
                      {selected && (
                        <Box
                          css={{
                            width: 4,
                            height: 4,
                            borderRadius: 4,
                            background: "$typography",
                          }}
                        />
                      )}
                      <Text headingS>{getPrimaryLabel(language, item)}</Text>
                    </Button>
                  </AnimationFadeIn>
                )
              })}
            </Box>

            <Box
              css={{
                flexDirection: "column",
                gap: "$space$10",
                textTransform: "uppercase",

                "& > *": {
                  boxShadow,
                },
              }}
            >
              {links?.map((link: any, i: number) => (
                <AnimationFadeIn key={link._id} delay={0.1 * i}>
                  <Button variant="secondary" href={`/${link.slug.current}`}>
                    {link.title}
                  </Button>
                </AnimationFadeIn>
              ))}

              {socialLinks?.map((link: any, i: number) => (
                <AnimationFadeIn key={link._key} delay={0.1 * i}>
                  <Button
                    variant="secondary"
                    href={link.url}
                    onClick={handleSocialLinks}
                  >
                    {link.label}
                    <ArrowUp />
                  </Button>
                </AnimationFadeIn>
              ))}
            </Box>

            <Box css={{ width: "100%" }}>
              <AnimationFadeIn>
                <Language />
              </AnimationFadeIn>
            </Box>
          </Box>
        </Container>
      </Box>
    </Dialog>
  )
}
