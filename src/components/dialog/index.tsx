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
                position: "absolute",
                top: 20,
                right: 20,

                "@tablet": {
                  top: 40,
                  right: 40,
                },
              }}
            >
              <Button type="tertiary">
                <i>close</i>
              </Button>
            </Box>
          </RadixDialog.Close>
        </Styles.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
