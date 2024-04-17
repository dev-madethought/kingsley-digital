import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { ArrowUp } from "@/components/icons"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"

import { Icon } from "./icon"
import { Language } from "./language"
import { Newsletter } from "./newsletter"
import {
  getNewsletterAgreement,
  getNewsletterPlaceholder,
  getNewsletterTitle,
} from "./translations"

export const Footer = () => {
  const language = useSelector((state: RootState) => state.global.language)
  const settings = useSelector((state: RootState) => state.global.settings)
  const { debug, boxShadow } = useDebug()

  if (!settings) return null
  const { links, socialLinks } = settings

  return (
    <Container>
      <Grid
        as="footer"
        debug={debug}
        css={{
          flexDirection: "column",
          paddingTop: "$space$20",
          paddingBottom: "$space$20",

          "@tablet": {
            paddingTop: "$space$40",
            paddingBottom: "$space$40",
          },
        }}
      >
        <Box
          css={{
            gridColumn: "span 12",
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
          <Icon />
        </Box>

        <Box
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
            <Button key={link._key} type="secondary" href={link.url}>
              {String(link.label).toUpperCase()}
              <ArrowUp />
            </Button>
          ))}
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            boxShadow,
            "@tablet": {
              gridColumn: "1 / span 6",
            },
          }}
        >
          <Newsletter
            title={getNewsletterTitle(language, settings)}
            placeholder={getNewsletterPlaceholder(language, settings)}
            agreement={getNewsletterAgreement(language, settings)}
          />
        </Box>

        <Box
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

        <Box
          css={{
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            gridColumn: "span 12",
            boxShadow,
            "@tablet": {
              gridColumn: "19 / span 6",
            },
          }}
        >
          <Language />
          {links?.map((link: any) => (
            <Button
              key={link._id}
              type="secondary"
              href={`/${link.slug.current}`}
            >
              {String(link.title).toUpperCase()}
            </Button>
          ))}
        </Box>
      </Grid>
    </Container>
  )
}
