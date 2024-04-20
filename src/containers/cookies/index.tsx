import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector } from "react-redux"
import Cookie from "universal-cookie"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { RootState } from "@/state/store"

import { components } from "./components"
import { getCookiesCTA, getCookiesMessage } from "./translations"

export const Cookies = () => {
  const settings = useSelector((state: RootState) => state.global.settings)
  const language = useSelector((state: RootState) => state.global.language)
  const [isVisible, setIsVisible] = useState(false)
  const cookies = new Cookie()

  useEffect(() => {
    const savedCookie = cookies.get("userAcceptedCookies")

    const timeout = setTimeout(() => {
      if (!savedCookie) {
        setIsVisible(true)
      }
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAccept = () => {
    cookies.set("userAcceptedCookies", "true", { path: "/" })
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          css={{
            position: "fixed",
            bottom: "$space$20",
            right: "$space$20",
            column: 12,

            "@tablet": {
              bottom: "$space$40",
              right: "$space$40",
            },

            "@desktop": {
              column: 6,
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: "100%" }}
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
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  )
}
