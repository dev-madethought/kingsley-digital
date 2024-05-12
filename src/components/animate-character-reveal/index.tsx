import { Fragment, useEffect, useRef } from "react"
import { gsap } from "gsap"

export const AnimationCharacterReveal = ({ text }: { text?: string }) => {
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
              duration: 0.2,
              stagger: 0.03,
              ease: "power4.inOut",
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
        overflow: "clip",
        whiteSpace: "pre",
      }}
    >
      {text.split("").map((char, index) => (
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
