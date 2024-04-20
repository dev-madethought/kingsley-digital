import * as Accordion from "@radix-ui/react-accordion"

import { styled } from "@/styles/stitches"

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
  borderTop: "1px solid $colors$darker",
})

export const AccordionContent = styled(Accordion.Content, {
  // border: "1px solid black",
})
