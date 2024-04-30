import { useCallback, useEffect, useRef, useState } from "react"

// Define a custom hook for handling smooth scrolling
export const useSmoothScroll = () => {
  const [scrollTarget, setScrollTarget] = useState<string | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollTo = useCallback((id: string) => {
    setScrollTarget(id)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTarget) {
        const target = document.getElementById(scrollTarget)
        if (target) {
          console.log("scroll to", target)
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        setScrollTarget(null)
      }
    }

    const debouncedHandleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(handleScroll, 300) // Adjust the debounce delay as needed
    }

    window.addEventListener("scroll", debouncedHandleScroll)

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [scrollTarget])

  return scrollTo
}
