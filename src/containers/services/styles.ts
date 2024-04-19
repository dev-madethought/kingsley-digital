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
  border: "1px solid red",
})

export const AccordionContent = styled(Accordion.Content, {
  border: "1px solid black",
})
