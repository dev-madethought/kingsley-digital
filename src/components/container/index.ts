import { styled } from "@/styles/stitches"

export const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  columnGap: 10,
  rowGap: 10,
  padding: "0 $20",

  "@tablet": {
    gridTemplateColumns: "repeat(24, 1fr)",
    padding: "0 $40",
  },

  "@desktop": {},

  // "@large": {
  //   width: 1600,
  //   margin: "0 auto",
  // },
})

Container.displayName = "Container"
