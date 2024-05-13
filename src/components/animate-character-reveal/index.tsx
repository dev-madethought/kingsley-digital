import { Fragment, useEffect, useRef } from "react"
import { gsap } from "gsap"

export type AnimationCharacterRevealProps = {
  text?: string
  duration?: number
  delay?: number
}

export const AnimationCharacterReveal = ({
  text,
  duration = 0.5,
  delay = 0,
}: AnimationCharacterRevealProps) => {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const domElement = elementRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const spans = domElement?.querySelectorAll("span")

          if (spans && spans.length > 0) {
            gsap.from(spans, {
              y: "100%",
              duration,
              delay,
              stagger: 0.03,
              ease: "power3.inOut",
            })
          }

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
    <span
      ref={elementRef}
      style={{
        display: "inline-block",
        overflow: "clip",
        whiteSpace: "pre",
      }}
    >
      {text &&
        text.split("").map((char, index) => (
          <Fragment key={index}>
            {char !== " " ? (
              <span
                style={{
                  display: "inline-block",
                }}
              >
                {char}
              </span>
            ) : (
              <> </>
            )}
          </Fragment>
        ))}
    </span>
  )
}
