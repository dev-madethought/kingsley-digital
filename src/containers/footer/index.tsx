import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { ArrowUp } from "@/components/icons"
import { LogoFull } from "@/components/icons"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"

import { Language } from "./language"

export const Footer = () => {
  const language = useSelector((state: RootState) => state.global.language)
  const settings = useSelector((state: RootState) => state.global.settings)
  const { debug, boxShadow } = useDebug()

  if (!settings) return null
  const { links, socialLinks } = settings

  return (
    <Container debug={debug}>
      <Grid
        as="footer"
        css={{
          flexDirection: "column",
          paddingTop: "$space$40",
          paddingBottom: "$space$40",
        }}
      >
        <Box
          css={{
            gridColumn: "span 12",
            paddingBottom: 250,
            boxShadow,
            svg: {
              width: "100%",
            },

            "@tablet": {
              gridColumn: "1 / span 13",
              paddingBottom: 250,
            },
          }}
        >
          <LogoFull />
        </Box>

        <Box
          tablet
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            boxShadow,
            "@tablet": {
              gridColumn: "19 / span 6",
            },
          }}
        >
          {socialLinks?.map((link: any) => (
            <Button key={link._key} variant="secondary" href={link.url}>
              {String(link.label).toUpperCase()}
              <ArrowUp />
            </Button>
          ))}
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            marginBottom: 40,
            boxShadow,

            "@tablet": {
              marginBottom: 0,
              gridColumn: "1 / span 8",
            },

            "@desktop": {
              marginBottom: 0,
              gridColumn: "1 / span 6",
            },
          }}
        >
          <Box
            // tablet
            css={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",

              "@tablet": {
                alignItems: "flex-start",
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
          </Box>
        </Box>

        <Box
          tablet
          css={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "9 / span 8",
            },
          }}
        >
          <Text cta css={{ color: "$typography", textAlign: "center" }}>
            © {new Date().getFullYear()} Alder Partners
          </Text>
        </Box>

        <Box
          mobile
          css={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "11 / span 4",
            },
          }}
        >
          <Text cta css={{ color: "$typography" }}>
            © {new Date().getFullYear()} Alder Partners
          </Text>
        </Box>
      </Grid>
    </Container>
  )
}
