import { styled } from "@/styles/stitches"

export const Container = styled("div", {
  margin: "0 $20",

  "@tablet": {
    margin: "0 $40",
  },

  "@desktop": {},

  // "@large": {
  //   width: 1600,
  //   margin: "0 auto",
  // },
})

Container.displayName = "Container"
