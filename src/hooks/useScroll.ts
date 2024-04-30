import { useEffect, useRef, useState } from "react"

const useScroll = () => {
  const lastScrollY = useRef(0)

  // const [x, setX] = useState(0)
  // const [y, setY] = useState(0)
  const [direction, setDirection] = useState(-1)
  const [section, setSection] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      // calculates direction
      const currentScrollY = window.scrollY
      let nextDirection = -1
      if (currentScrollY > lastScrollY.current) {
        nextDirection = 1
      }

      // changes state
      // setX(window.scrollX)
      // setY(window.scrollY)
      setDirection(nextDirection)

      // updates last scroll position
      lastScrollY.current = currentScrollY

      // calculates section
      const sections = document.querySelectorAll("section")
      let nextSection = null
      sections.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect()
        if (
          top <= window.innerHeight * 0.5 &&
          bottom >= window.innerHeight * 0.5
        ) {
          nextSection = section.id
        }
      })
      if (nextSection) setSection(nextSection)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { /* x, y, */ direction, section }
}

export default useScroll
