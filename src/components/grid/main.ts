import { styled } from "@/styles/stitches"

export const Main = styled("main", {
  variants: {
    debug: {
      true: {
        position: "relative",

        "&::after": {
          position: "absolute",
          content: '""',
          backgroundImage: `repeating-linear-gradient(
            to right,
            $grid$color,
            $grid$color calc((100% / $grid$mobile) - $space$10),
            transparent calc((100% / $grid$mobile) - $space$10),
            transparent calc(100% / $grid$mobile)
          )`,
          backgroundPosition: "left top",
          backgroundSize: `calc(100% + $space$10) 100%`,
          inset: "0 $space$20",
          pointerEvents: "none",
          zIndex: 9999999,
        },

        "@tablet": {
          "&::after": {
            backgroundImage: `repeating-linear-gradient(
            to right,
            $grid$color,
            $grid$color calc((100% / $grid$tablet) - $space$10),
            transparent calc((100% / $grid$tablet) - $space$10),
            transparent calc(100% / $grid$tablet)
          )`,
            inset: "0 $space$40",
          },
        },

        "@desktop": {
          "&::after": {
            backgroundImage: `repeating-linear-gradient(
            to right,
            $grid$color,
            $grid$color calc((100% / $grid$desktop) - $space$10),
            transparent calc((100% / $grid$desktop) - $space$10),
            transparent calc(100% / $grid$desktop)
          )`,
            inset: "0 $space$40",
          },
        },
      },
    },
  },
})
