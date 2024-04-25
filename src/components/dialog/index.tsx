import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

import * as RadixDialog from "@radix-ui/react-dialog"

import { Box } from "../box"
import { Button } from "../button"

import * as Styles from "./styles"

interface IDialog {
  children?: ReactNode
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const Dialog = ({ children, open, onOpenChange }: IDialog) => {
  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(!open)
    }
  }

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <Styles.Overlay />
        <Styles.Content
          onEscapeKeyDown={handleClose}
          onPointerDownOutside={handleClose}
        >
          {children}
          <RadixDialog.Close asChild>
            <Box
              css={{
                position: "fixed",
                top: 20,
                right: "calc(20px - 10px)",

                "@tablet": {
                  top: 40,
                  right: "calc(40px + 10px)",
                },
              }}
            >
              <Button variant="tertiary">
                <i>close</i>
              </Button>
            </Box>
          </RadixDialog.Close>
        </Styles.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
