// import Link from "next/link"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { ArrowUp } from "@/components/icons"
import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"

import { Icon } from "./icon"
import { Language } from "./language"
import { Newsletter } from "./newsletter"

export const Footer = () => {
  const { border } = useDebug()

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
        <Button type="secondary" href="https://instagram.com">
          INSTAGRAM
          <ArrowUp />
        </Button>
        <Button type="secondary" href="https://linkedin.com">
          LINKEDIN
          <ArrowUp />
        </Button>
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
          © 2024 Alder Partners
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
        <Button type="secondary" href="/privacy">
          PRIVACY POLICY
        </Button>
        <Button type="secondary" href="/terms">
          TERMS & CONDITIONS
        </Button>
      </Box>
    </Container>
  )
}
