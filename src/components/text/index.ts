import { styled } from "@/styles/stitches"

export const Text = styled("p", {
  sup: {
    fontSize: "50%",
  },

  variants: {
    // TYPOGRAPHY size
    headingS: {
      true: {
        fontFamily: "$favorit",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "21.6px",
        letterSpacing: "0.02em",
        textAlign: "left",
      },
    },

    headingM: {
      true: {
        fontFamily: "$favorit",
        fontSize: "23px",
        fontWeight: 400,
        lineHeight: "23px",
        letterSpacing: "0.02em",
        textAlign: "left",
        textTransform: "uppercase",

        "@tablet": {
          fontSize: "28px",
          lineHeight: "28px",
        },
      },
    },

    headingL: {
      true: {
        fontFamily: "$favorit",
        fontSize: "40px",
        fontWeight: 400,
        lineHeight: "40px",
        textAlign: "left",

        "@tablet": {
          fontSize: "70px",
          lineHeight: "70px",
        },
      },
    },

    headingXL: {
      true: {
        fontFamily: "$favorit",
        fontSize: "52px",
        fontWeight: 400,
        lineHeight: "46.8px",
        textAlign: "left",

        "@tablet": {
          fontSize: "100px",
          lineHeight: "90px",
        },
      },
    },

    cta: {
      true: {
        fontFamily: "$favorit",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "16.8px",
        letterSpacing: "0.02em",
        textAlign: "left",
      },
    },

    cta2: {
      true: {
        // not in use
      },
    },

    body: {
      true: {
        fontFamily: "$favorit",
        fontSize: 16,
        lineHeight: "22px",
      },
    },

    body2: {
      true: {
        // not in use
      },
    },

    caption: {
      true: {
        fontFamily: "$favorit",
        fontSize: "10px",
        fontWeight: 400,
        lineHeight: "10px",
        textAlign: "left",
      },
    },

    // FACTORY SETTINGS
    wrap: {
      true: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
      },
    },

    uppercase: {
      true: {
        textTransform: "uppercase",
      },
    },
  },
})
