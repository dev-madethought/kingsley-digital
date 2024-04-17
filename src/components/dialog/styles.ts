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

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: 0,
  backgroundColor: "$black50",

  '&[data-state="open"]': {
    animation: `${fadeIn} 0.5s ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 0.5s ease-out`,
  },
})

export const Content = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  left: 0,
  overflow: "hidden",

  "&:focus": {
    outline: "none",
  },

  '&[data-state="open"]': {
    animation: `${slideIn} 0.5s ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOut} 0.5s ease-out`,
  },
})
