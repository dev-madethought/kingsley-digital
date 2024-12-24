import { ReactNode } from "react"

import * as RadixDialog from "@radix-ui/react-dialog"

import { Box } from "../box"
import { Button } from "../button"
import { Close } from "../icons"

import * as Styles from "./styles"

interface IDialog {
  children?: ReactNode
  open?: boolean
  onOpenChange?: (value: boolean) => void
  color?: string
  isMenu?: boolean
  slide?: boolean
}

export const Dialog = ({
  children,
  open,
  onOpenChange,
  color,
  isMenu,
  slide,
}: IDialog) => {
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
          css={{ ...(color && { background: color }) }}
          menu={isMenu}
          slide={slide}
        >
          {children}
          <RadixDialog.Close asChild>
            <Box
              css={{
                position: "fixed",
                top: 20,
                right: "calc(20px + 10px)",

                "@tablet": {
                  top: 40,
                  right: "calc(40px + 10px)",
                },

                ...(isMenu && {
                  top: 32,
                  right: 20,
                }),
              }}
            >
              <Button variant="tertiary">
                <Close />
              </Button>
            </Box>
          </RadixDialog.Close>
        </Styles.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
