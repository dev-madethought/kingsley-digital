import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Cookie from "universal-cookie"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"

export const Cookies = () => {
  const [cookieValue, setCookieValue] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { border } = useDebug()
  const cookies = new Cookie()

  useEffect(() => {
    const savedCookie = cookies.get("userAcceptedCookies")
    if (savedCookie) {
      setCookieValue(savedCookie)
    }

    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAccept = () => {
    cookies.set("userAcceptedCookies", "true", { path: "/" })
    setCookieValue("true")
  }

  if (cookieValue) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <Grid
        css={{
          position: "fixed",
          bottom: 20,
          right: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 999,

          "@tablet": {
            bottom: 40,
          },
        }}
      >
        <Box
          css={{
            pointerEvents: "auto",
            gridColumn: "span 12",
            border,

            "@tablet": {
              gridColumn: "19 / span 6",
            },
          }}
        >
          <Box
            css={{
              width: "100%",
              padding: 20,
              backgroundColor: "$darker",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              alignSelf: "end",
              // border: "1px solid $background",
            }}
          >
            <Text
              css={{
                fontFamily: "$favorite",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "120%",
                letterSpacing: "0.28px",
                color: "$typography",

                a: {
                  color: "inherit",
                  textDecoration: "underline",

                  "&:hover": {
                    textDecoration: "none",
                  },
                },
              }}
            >
              WE USE{" "}
              <Button type="secondary" href="/privacy">
                COOKIES
              </Button>
            </Text>
            <Button onClick={handleAccept}>GOT IT</Button>
          </Box>
        </Box>
      </Grid>
    </motion.div>
  )
}
