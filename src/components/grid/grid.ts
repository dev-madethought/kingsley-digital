import { styled } from "@/styles/stitches"

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat($grid$mobile, 1fr)",
  columnGap: 10,

  "@tablet": {
    gridTemplateColumns: "repeat($grid$tablet, 1fr)",
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

Grid.displayName = "Grid"

// Add CSS property support
Grid.defaultProps = {
  css: {},
}
