import { ReactNode, useEffect, useRef } from "react"
import { gsap } from "gsap"

export const AnimationFadeIn = ({ children }: { children: ReactNode }) => {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const domElement = elementRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
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
    <span ref={elementRef} style={{ opacity: 0 }}>
      {children}
    </span>
  )
}
