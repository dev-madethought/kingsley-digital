import { styled } from "@/styles/stitches"

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat($grid$mobile, 1fr)",
  columnGap: 10,
  rowGap: 10,
  padding: "0 $20",

  "@tablet": {
    gridTemplateColumns: "repeat($grid$tablet, 1fr)",
    padding: "0 $40",
  },

  "@desktop": {
    gridTemplateColumns: "repeat($grid$desktop, 1fr)",
  },

  variants: {
    debug: {
      true: {
        borderBottom: "1px solid #ff00001a",
      },
    },
  },
})
