/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useDispatch, useSelector } from "react-redux"

import { setStep } from "@/state/reducers/intro"
import { RootState } from "@/state/store"

import { Box } from "../box"
import { LogoMark, LogoWords } from "../icons"

export const LoadingAnimation = () => {
  const dispatch = useDispatch()
  const { step } = useSelector((state: RootState) => state.intro)
  const left = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const leftAnimation = gsap.timeline()
    const rightAnimation = gsap.timeline()

    // if (animate) {
    //   console.log("animate", animate)

    //   const ease = "power2.inOut"

    //   leftAnimation.to(left.current, {
    //     duration: 1,
    //     delay: 1,
    //     left: "calc(0% + 40px)",
    //     transform: "translateX(0%)",
    //     ease,
    //   })

    //   leftAnimation.to(left.current, {
    //     duration: 0.5,
    //     top: "calc(0% + 40px)",
    //     transform: "translateX(0%)",
    //     ease,
    //     onComplete: () => {
    //       // onComplete()
    //     },
    //   })

    //   rightAnimation.to(right.current, {
    //     duration: 1,
    //     delay: 1,
    //     left: "calc(100% - 40px)",
    //     transform: "translateX(-100%)",
    //     ease,
    //   })

    //   rightAnimation.to(right.current, {
    //     duration: 0.5,
    //     top: "calc(0% + 40px)",
    //     transform: "translateX(-100%)",
    //     ease,
    //   })
    // }

    return () => {
      leftAnimation.kill()
      rightAnimation.kill()
    }
  }, [step])

  return (
    <Box
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "$background",
        zIndex: 9999999999,
      }}
    >
      <Box
        ref={left}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-100%)",
          marginRight: 5,
        }}
      >
        <LogoWords />
      </Box>

      <Box
        ref={right}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(0%)",
          marginLeft: 5,
        }}
      >
        <LogoMark />
      </Box>
    </Box>
  )
}
