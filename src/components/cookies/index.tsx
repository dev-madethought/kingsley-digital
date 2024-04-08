import { useEffect, useState } from "react"
import Cookie from "universal-cookie"

import { Box } from "@/components/box"

import { Button } from "../button"
import { Text } from "../text"

export const Cookies = () => {
  const [cookieValue, setCookieValue] = useState<string | null>(null)
  const cookies = new Cookie()

  useEffect(() => {
    const savedCookie = cookies.get("userAcceptedCookies")
    if (savedCookie) {
      setCookieValue(savedCookie)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAccept = () => {
    const newValue = "userAcceptedCookies"
    cookies.set("userAcceptedCookies", newValue, { path: "/" })
    setCookieValue(newValue)
  }

  if (cookieValue) {
    return null
  }

  return (
    <Box
      css={{
        width: "100%",
        padding: 20,
        backgroundColor: "$background",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "end",
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
  )
}
