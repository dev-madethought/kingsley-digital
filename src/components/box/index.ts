import { styled } from "@/styles/stitches"

export const Box = styled("div", {
  display: "flex",

  variants: {
    grid: {
      true: {
        display: "grid",
      },
    },
    vertical: {
      true: {
        alignItems: "center",
      },
    },

    horizontal: {
      true: {
        justifyContent: "center",
      },
    },

    mobile: {
      true: {
        "@tablet": {
          display: "none",
        },
      },
    },

    tablet: {
      true: {
        display: "none",

        "@tablet": {
          display: "flex",
        },
      },
    },

    desktop: {
      true: {
        display: "none",

        "@desktop": {
          display: "flex",
        },
      },
    },

    wrap: {
      true: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
      },
    },
  },
})

Box.displayName = "Box"
