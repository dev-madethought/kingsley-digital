import { ReactNode, useEffect, useRef } from "react"
import { gsap } from "gsap"

export type AnimationFadeInProps = {
  children: ReactNode
  duration?: number
  delay?: number
}

export const AnimationFadeIn = ({
  children,
  duration = 1,
  delay = 0,
}: AnimationFadeInProps) => {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const domElement = elementRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
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
    <span ref={elementRef} style={{ opacity: 0 }}>
      {children}
    </span>
  )
}
