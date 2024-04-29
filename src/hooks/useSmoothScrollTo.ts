import { useEffect } from "react"

const useSmoothScrollTo = (targetHash = null) => {
  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = targetHash || window.location.hash

    if (!hash) return

    // Only proceed if target is a single hash tag
    const startWithHashRegex = /^#\w+/g
    if (!startWithHashRegex.test(hash)) return

    let target = document.querySelectorAll(`${hash}`)[0]

    if (!target) return

    const elementPosition = target.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }, [targetHash])
}

export default useSmoothScrollTo
