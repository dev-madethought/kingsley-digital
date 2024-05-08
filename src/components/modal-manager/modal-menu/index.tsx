/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Dialog } from "@/components/dialog"
import { Grid, useDebug } from "@/components/grid"
import { ArrowUp, LogoMark } from "@/components/icons"
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
    <Dialog open={open} onOpenChange={handleOpenChange} isMenu>
      <Box
        css={{
          height: "var(--vh)",
          overflowY: "auto",
          marginRight: 20,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Container>
          <Grid>
            <Box
              css={{
                flexDirection: "column",
                gridColumn: "1 / span 12",
                height: "var(--vh)",
              }}
            >
              {/* LOGO and cclose */}
              <Box
                css={{
                  paddingTop: 32,
                  paddingBottom: 80,

                  svg: {
                    height: 24,
                  },
                }}
              >
                <LogoMark />
              </Box>

              <Box
                css={{
                  flexDirection: "column",
                  gap: 20,
                  flexGrow: 1,

                  "& > *": {
                    boxShadow,
                  },
                }}
              >
                {menu?.map((item: any, i: number) => {
                  const selected =
                    (section === "hero" && i === 0) || section === item.id
                  return (
                    <Button
                      key={i}
                      variant="tertiary"
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
                  )
                })}
              </Box>

              <Box
                css={{
                  flexDirection: "column",
                  gap: 16,

                  "& > *": {
                    boxShadow,
                  },
                }}
              >
                {links?.map((link: any) => (
                  <Button
                    key={link._id}
                    variant="secondary"
                    href={`/${link.slug.current}`}
                  >
                    {String(link.title).toUpperCase()}
                  </Button>
                ))}

                {socialLinks?.map((link: any) => (
                  <Button
                    key={link._key}
                    variant="secondary"
                    href={link.url}
                    onClick={handleSocialLinks}
                  >
                    {String(link.label).toUpperCase()}
                    <ArrowUp />
                  </Button>
                ))}

                <Box css={{ width: "100%" }}>
                  <Language />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </Dialog>
  )
}
