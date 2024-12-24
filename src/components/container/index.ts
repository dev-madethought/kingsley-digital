import { styled } from "@/styles/stitches"

export const Container = styled("div", {
  padding: "0 $20",

  "@tablet": {
    padding: "0 $40",
  },

  "@desktop": {},

  variants: {
    debug: {
      true: {
        borderBottom: "1px solid #ff00001a",
      },
    },
  },
})

Container.displayName = "Container"
