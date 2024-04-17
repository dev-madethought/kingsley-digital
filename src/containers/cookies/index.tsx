import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector } from "react-redux"
import Cookie from "universal-cookie"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { getWidth, Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { RootState } from "@/state/store"

import { components } from "./components"
import { getCookiesCTA, getCookiesMessage } from "./translations"

export const Cookies = () => {
  const settings = useSelector((state: RootState) => state.global.settings)
  const language = useSelector((state: RootState) => state.global.language)
  const [cookieValue, setCookieValue] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { boxShadow } = useDebug()
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

  /*
 <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
  */

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          css={{
            position: "fixed",
            bottom: 40,
            right: 40,
            width: getWidth(6),
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
            <PortableText
              value={getCookiesMessage(language, settings?.cookies) as any}
              components={components}
            />

            <Button onClick={handleAccept}>
              {getCookiesCTA(language, settings?.cookies)}
            </Button>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}
