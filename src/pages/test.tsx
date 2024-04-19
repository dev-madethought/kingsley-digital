import { useEffect } from "react"

import { Box } from "@/components/box"

export default function Page() {
  useEffect(() => {
    alert(
      [
        "clientWidth",
        document.documentElement.clientWidth,
        "innerWidth",
        window.innerWidth,
        "clientHeight",
        document.documentElement.clientHeight,
        "innerHeight",
        window.innerHeight,
      ].join(",")
    )
  }, [])
  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        boxShadow: "inset 0px 0px 0px 1px black",
        overflow: "scroll",
      }}
    >
      This is a test
    </Box>
  )
}

// document.documentElement.clientWidth
