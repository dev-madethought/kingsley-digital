import { styled } from "@/styles/stitches"

export const Text = styled("p", {
  sup: {
    fontSize: "50%",
  },

  variants: {
    // D/Heading/S
    headingS: {
      true: {
        leadingTrim: "both",
        textEdge: "cap",
        fontFamily: "$favorit",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "120%",
        letterSpacing: "0.28px",
      },
    },

    // D/Heading/M
    headingM: {
      true: {
        leadingTrim: "both",
        textEdge: "cap",
        fontFamily: "$favorit",
        fontSize: 28,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "100%",
        letterSpacing: "0.56px",
        textTransform: "uppercase",
      },
    },

    // D/Heading/L
    headingL: {
      true: {
        fontFamily: "$favorit",
        fontSize: 70,
        fontWeight: 400,
        lineHeight: "70px",
      },
    },

    // D/CTA
    cta: {
      true: {
        fontFamily: "$favorit",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "16.8px",
        letterSpacing: "0.02em",
      },
    },

    body: {
      true: {
        fontSize: 16,
        lineHeight: "22px",
      },
    },

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
