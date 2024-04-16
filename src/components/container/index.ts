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
})

Container.displayName = "Container"
