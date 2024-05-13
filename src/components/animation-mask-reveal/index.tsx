import { ReactNode, useEffect, useRef } from "react"
import { gsap } from "gsap"

import styles from "./styles.module.css"

export const AnimationMaskReveal = ({ children }: { children: ReactNode }) => {
  const maskRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const domElement = maskRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            scaleY: 0,
            duration: 1,
            ease: "power3.inOut",
          })
          observer.unobserve(entry.target)
        }
      })
    })

    if (domElement) {
      observer.observe(domElement)
    }

    return () => {
      if (domElement) {
        observer.unobserve(domElement)
      }
    }
  }, [])

  return (
    <span className={styles.container}>
      <span ref={maskRef} className={styles.mask} />
      {children}
    </span>
  )
}
