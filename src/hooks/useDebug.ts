import { useEffect, useState } from "react"

function useDebug() {
  const [debugMode, setDebugMode] = useState(false)

  useEffect(() => {
    const debugCookie = document.cookie.split("; ").find((row) => {
      const cookie = row.split("=")
      return cookie[0] === "debug" && cookie[1] === "true"
    })
    if (debugCookie) {
      setDebugMode(true)
    }

    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("debug") === "true") {
      setDebugMode(true)
    }
  }, [])

  return { debugMode, border: debugMode ? "1px dashed black" : "none" }
}

export default useDebug
