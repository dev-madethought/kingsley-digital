import { useEffect, useState } from "react"

import { AnimateRectMask } from "@/components/animate-rect-mask"
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"

import { Sentence } from "./sentence"

// text reveal animation: https://brad-carter.medium.com/how-to-animate-a-text-reveal-effect-in-react-with-framer-motion-ae8ddd296f0d
// video mask animation: https://bertchcapital.com/
export const Hero = () => {
  const [expanded, setExpanded] = useState(false)
  const { border } = useDebug()

  useEffect(() => {
    // animation on timeout
    const timeout = setTimeout(() => setExpanded(true), 300)
    return () => {
      clearTimeout(timeout)
    }

    // animation on scroll
    // const handleScroll = () => {
    //   setExpanded(true)
    //   window.removeEventListener("scroll", handleScroll)
    // }
    // window.addEventListener("scroll", handleScroll)
    // return () => {
    //   window.removeEventListener("scroll", handleScroll)
    // }
  }, [])

  return (
    <Box css={{ position: "relative" }}>
      <AnimateRectMask expanded={expanded}>
        <video
          src={"/hero.mp4"}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Container
          css={{
            position: "absolute",
            top: "100vh",
            left: 0,
            width: "100vw",
            transform: "translateY(calc(-100% - 40px))",
            zIndex: 999,
          }}
        >
          <Sentence />
        </Container>
      </AnimateRectMask>

      <Container
        css={{
          position: "relative",
          justifyContent: "end",
          paddingTop: "calc(100vh + 150px)",
          paddingBottom: 115,
          color: "white",
          zIndex: 0,
        }}
      >
        {/* <Box
          css={{
            gridColumn: "span 12",
            border,
            "@tablet": {
              gridColumn: "span 12",
            },
          }}
        /> */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            marginBottom: 32,
            border,
            "@tablet": {
              gridColumn: "13/17",
              marginBottom: 0,
            },
          }}
        >
          <Text uppercase>We are alder</Text>
          <Text uppercase css={{ opacity: 0.5 }}>
            서울 남한
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
          <Box css={{ flexDirection: "column", gap: 20 }}>
            <Text>
              Alder is a boutique multi-family office established in 2023. We
              cast our vision far into the future to unlock sustainable,
              long-term growth that can be passed down for generations. This is
              our privilege.
            </Text>
            <Text css={{ opacity: 0.5 }}>
              종교와 정치는 분리된다. 모든 국민은 행위시의 법률에 의하여 범죄를
              구성하지 아니하는 행위로 소추되지 아니하며.종교와 정치는 분리된다.
              모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로
              소추되지 아니하며.
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
