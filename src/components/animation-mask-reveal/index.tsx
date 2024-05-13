import { ReactNode, useEffect, useRef } from "react"
import { gsap } from "gsap"

import styles from "./styles.module.css"

export type AnimationMaskRevealProps = {
  children: ReactNode
  duration?: number
  delay?: number
}

export const AnimationMaskReveal = ({
  children,
  duration = 0.7,
  delay = 0,
}: AnimationMaskRevealProps) => {
  const maskRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const domElement = maskRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            scaleY: 0,
            duration,
            delay,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className={styles.container}>
      <span ref={maskRef} className={styles.mask} />
      {children}
    </span>
  )
}
