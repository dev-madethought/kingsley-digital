import * as Dialog from "@radix-ui/react-dialog"

import { keyframes, styled } from "@/styles/stitches"

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const slideIn = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0%)" },
})

const slideOut = keyframes({
  from: { transform: "translateX(0%)" },
  to: { transform: "translateX(100%)" },
})

const dropIn = keyframes({
  from: { transform: "translateY(-100%)" },
  to: { transform: "translateY(0%)" },
})

const dropOut = keyframes({
  from: { transform: "translateY(0%)" },
  to: { transform: "translateY(-100%)" },
})

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: 0,
  backgroundColor: "$black50",

  '&[data-state="open"]': {
    animation: `${fadeIn} 0.25s ease-in-out`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 0.25s ease-in-out`,
  },
  zIndex: 9999,
})

export const Content = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  background: "$background",
  zIndex: 9999,

  "&:focus": {
    outline: "none",
  },

  '&[data-state="open"]': {
    animation: `${slideIn} 0.25s ease-in-out`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOut} 0.25s ease-in-out`,
  },

  variants: {
    menu: {
      true: {
        left: 0,
        background: "$background",
      },
    },

    slide: {
      true: {
        '&[data-state="open"]': {
          animation: `${dropIn} 0.25s ease-in-out`,
        },

        '&[data-state="closed"]': {
          animation: `${dropOut} 0.25s ease-in-out`,
        },
      },
    },
  },
})
