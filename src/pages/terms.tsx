import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"

export default function Page() {
  const { border } = useDebug()

  return (
    <Container css={{ paddingTop: 200 }}>
      <Box
        css={{
          gridColumn: "span 12",
          border,
          "@tablet": {
            gridColumn: "span 7",
          },
        }}
      >
        <Text
          css={{
            fontFamily: "Favorit",
            fontSize: 28,
            fontWeight: 400,
            lineHeight: "28px",
            letterSpacing: "0.02em",
            textAlign: "left",
            color: "$typography",
          }}
        >
          Terms & Conditions
        </Text>
      </Box>
      <Box
        css={{
          gridColumn: "span 12",
          border,
          "@tablet": {
            gridColumn: "span 8",
          },
        }}
      >
        <Box
          css={{
            flexDirection: "column",
            gap: "$20",
            color: "$typography",
            "@tablet": { gap: "$40" },
          }}
        >
          <Text>Lorem ipsum</Text>
        </Box>
      </Box>
      <Box
        css={{
          gridColumn: "span 12",
          border,
          "@tablet": {
            gridColumn: "span 1",
          },
        }}
      />
      <Box
        css={{
          gridColumn: "span 12",
          border,
          "@tablet": {
            gridColumn: "span 8",
          },
        }}
      >
        <Box
          css={{
            flexDirection: "column",
            gap: "$20",
            color: "$typography",
            opacity: 0.5,
            "@tablet": { gap: "$40" },
          }}
        >
          <Text>Lorem ipsum</Text>
        </Box>
      </Box>
    </Container>
  )
}
