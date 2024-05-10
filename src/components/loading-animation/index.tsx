/* eslint-disable react-hooks/exhaustive-deps */

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useDispatch, useSelector } from "react-redux"

import { type ContentItem, renderComponent } from "@/lib/render"
import { setFirstTime, setStep } from "@/state/reducers/intro"
import { RootState } from "@/state/store"
import { STEPS } from "@/types/intro"

import { Box } from "../box"
import { LogoMark, LogoWords } from "../icons"

const ease = "power2.inOut"
const centerX = "calc((var(--vw) - 240px) / 2)"
const centerY = "calc((var(--vh) - 320px) / 2)"
const rectWidth = "240px"
const rectHeight = "320px"
const CSSBegin = [
  `${centerX} ${centerY}`,
  `calc(${centerX} + ${rectWidth}) ${centerY}`,
  `calc(${centerX} + ${rectWidth}) calc(${centerY} + ${rectHeight})`,
  `${centerX} calc(${centerY} + ${rectHeight})`,
]

export const LoadingAnimation = ({ content }: { content?: ContentItem[] }) => {
  const dispatch = useDispatch()
  const { step } = useSelector((state: RootState) => state.intro)

  // background color covering the real page
  const background = useRef<HTMLDivElement>(null)

  // square mask revealing the design behind
  const mask = useRef<HTMLDivElement>(null)

  // gray rectangle covering the mask
  const rectangle = useRef<HTMLDivElement>(null)

  // left part of the logo
  const left = useRef<HTMLDivElement>(null)

  // right part of the logo
  const right = useRef<HTMLDivElement>(null)

  const tits = useRef<HTMLDivElement>(null)

  const generatePolygons = () => {
    const rectWidth = 240
    const rectHeight = 320
    const centerX = (window.innerWidth - rectWidth) / 2
    const centerY = (window.innerHeight - rectHeight) / 2
    const begin = [
      `${centerX}px ${centerY}px`,
      `${centerX + rectWidth}px ${centerY}px`,
      `${centerX + rectWidth}px ${centerY + rectHeight}px`,
      `${centerX}px, ${centerY + rectHeight}px`,
    ]

    const end = ["0px 0px", `100vw 0px`, `100vw 100vh`, `0px 100vh`]

    return { begin, end }
  }

  const handleSplit = () => {
    const duration = 1
    const delay = 0.5

    const timeline = gsap.timeline({
      onComplete: () => {
        handleUnmask()
      },
    })

    // left logo goes to LEFT
    timeline.to(left.current, {
      duration,
      delay,
      ease,
      left: 40,
      transform: "translateX(0%)",
    })

    // right logo goes to RIGHT
    timeline.to(
      right.current,
      {
        duration,
        delay,
        ease,
        right: 40,
        transform: "translateX(0%)",
      },
      `-=${duration + delay}`
    )

    // rectangle shows up
    timeline.to(
      rectangle.current,
      {
        duration,
        delay: delay * 0.9,
        ease: "power3.inOut",
        scaleX: 1,
      },
      `-=${duration + delay}`
    )

    // rectangle fades out
    timeline.to(
      [rectangle.current, background.current],
      {
        duration,
        ease: "power2.inOut",
        opacity: 0,
      },
      `-=${delay}`
    )

    // THIS IS THE BUG
    // timeline.to(
    //   mask.current,
    //   {
    //     duration,
    //     ease: "power2.inOut",
    //     opacity: 1,
    //   },
    //   `-=${duration}`
    // )
  }

  const handleUnmask = () => {
    const duration = 1

    const timeline = gsap.timeline({
      onComplete: () => {
        dispatch(setStep(STEPS.DONE))
        dispatch(setFirstTime(false))
      },
    })

    timeline.to([left.current, right.current], {
      duration,
      ease,
      top: 40,
      color: "white",
    })

    const { begin, end } = generatePolygons()

    timeline.fromTo(
      mask.current,
      {
        clipPath: `polygon(${begin.join(", ")})`,
      },
      {
        duration,
        ease,
        clipPath: `polygon(${end.join(", ")})`,
      },
      `-=${duration}`
    )
  }

  useEffect(() => {
    if (!content) return

    if (step === STEPS.LOADING) {
      // nothing happens, data is being loaded.
    }

    if (step === STEPS.ANIMATE) {
      handleSplit()
    }

    if (step === STEPS.DONE) {
      document.body.style.removeProperty("overflow")
    } else {
      document.body.style.overflow = "hidden"
    }
  }, [step, content])

  if (step === STEPS.DONE) {
    return null
  }

  return (
    <Box
      id="loading"
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "$background",
      }}
    >
      <Box
        id="mask"
        ref={mask}
        css={{
          clipPath: `polygon(${CSSBegin.join(", ")})`,
        }}
      >
        <Box
          css={{
            position: "relative",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {content?.map(renderComponent)}
        </Box>
      </Box>

      <Box
        id="background"
        ref={background}
        css={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "$background",
        }}
      />

      <Box
        id="rectangle"
        ref={rectangle}
        css={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: 240,
          height: 320,
          opacity: 1,
          background: "$darker",
          transform: "translateX(-50%) translateY(-50%) scale(0,1)",
        }}
      />

      <Box
        id="left"
        ref={left}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-100%)",
          paddingRight: 5,
        }}
      >
        <LogoWords />
      </Box>

      <Box
        id="right"
        ref={right}
        css={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translateX(100%)",
          paddingLeft: 5,
        }}
      >
        <LogoMark />
      </Box>
    </Box>
  )
}
