import * as Accordion from "@radix-ui/react-accordion"

import { keyframes, styled } from "@/styles/stitches"

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
})

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
})

export const AccordionRoot = styled(Accordion.Root, {
  width: "100%",
})

export const AccordionItem = styled(Accordion.Item, {
  overflow: "hidden",
  marginTop: 1,
})

export const AccordionTrigger = styled(Accordion.Trigger, {
  background: "transparent",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: 74,
  color: "$typography",
  borderTop: "1px solid $colors$darker",
  cursor: "pointer",
})

export const AccordionContent = styled(Accordion.Content, {
  display: "flex",
  gap: 10,
  overflow: "hidden",

  '&[data-state="open"]': {
    animation: `${slideDown} 250ms linear`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 100ms linear`,
  },
})
