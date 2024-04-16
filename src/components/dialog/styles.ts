import * as Dialog from "@radix-ui/react-dialog"

import { styled } from "@/styles/stitches"

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: 0,
  backgroundColor: "$black50",
})

export const Content = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",

  "&:focus": {
    outline: "none",
  },
})
