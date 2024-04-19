import { styled } from "@/styles/stitches"

export const Container = styled("div", {
  padding: "0 $20",

  "@tablet": {
    padding: "0 $40",
  },

  "@desktop": {},

  // "@large": {
  //   width: 1600,
  //   margin: "0 auto",
  // },

  variants: {
    debug: {
      true: {
        borderBottom: "1px solid #ff00001a",
      },
    },
  },
})

Container.displayName = "Container"
