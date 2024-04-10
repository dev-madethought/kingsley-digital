import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { ArrowUp } from "@/components/icons"
import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"
import { RootState } from "@/state/store"

import { Icon } from "./icon"
import { Language } from "./language"
import { Newsletter } from "./newsletter"

export const Footer = () => {
  const footer = useSelector((state: RootState) => state.global.footer)
  const { border } = useDebug()

  const { links, socialLinks } = footer
  console.log("footer data", footer)

  return (
    <Container
      as="footer"
      css={{
        flexDirection: "column",
        width: "100vw",
        padding: "$20",
        "@tablet": {
          padding: "$40",
        },
      }}
    >
      <Box
        css={{
          gridColumn: "span 12",
          border,
          "@tablet": {
            gridColumn: "span 13",
            paddingBottom: 250,
          },
        }}
      >
        <Icon />
      </Box>
      <Box
        css={{
          gridColumn: "span 12",
          border,
          "@tablet": {
            gridColumn: "span 5",
          },
        }}
      />
      <Box
        css={{
          gridColumn: "span 12",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          border,
          "@tablet": {
            gridColumn: "span 6",
          },
          flexDirection: "column",
        }}
      >
        {socialLinks.map((link: any) => (
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
          border,
          "@tablet": {
            gridColumn: "span 6",
          },
        }}
      >
        <Newsletter />
      </Box>
      <Box
        css={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gridColumn: "span 12",
          border,
          "@tablet": {
            gridColumn: "span 12",
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
          border,
          "@tablet": {
            gridColumn: "span 6",
          },
        }}
      >
        <Language />
        {links.map((link: any) => (
          <Button
            key={link._id}
            type="secondary"
            href={`/${link.slug.current}`}
          >
            {String(link.title).toUpperCase()}
          </Button>
        ))}
      </Box>
    </Container>
  )
}
