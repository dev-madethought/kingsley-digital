import { useEffect, useState } from "react"

function useDebug() {
  const [debug, setDebug] = useState(false)

  useEffect(() => {
    const debugCookie = document.cookie.split("; ").find((row) => {
      const cookie = row.split("=")
      return cookie[0] === "debug" && cookie[1] === "true"
    })
    if (debugCookie) {
      setDebug(true)
    }

    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("debug") === "true") {
      setDebug(true)
    }
  }, [])

  return { debug, border: debug ? "1px dashed black" : "none" }
}

export { useDebug }
