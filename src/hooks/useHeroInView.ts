import { useEffect, useState } from "react"

const useHeroInView = () => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("section#hero")

      if (heroSection) {
        const { top, bottom } = heroSection.getBoundingClientRect()
        const isVisible = top <= window.innerHeight && bottom >= 0
        setIsInView(isVisible)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return isInView
}

export default useHeroInView
