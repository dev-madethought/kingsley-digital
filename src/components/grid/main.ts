import { styled } from "@/styles/stitches"

export const Main = styled("main", {
  // "--vw": "100vw",
  // "--vh": "100vh",
  // "--width": "calc(var(--vw) - $space$20 * 2)",
  // "--slices": "calc(($grid$mobile - 1) * $space$10)",
  // "--available": "calc(var(--width) - var(--slices))",
  // "--span": "calc(var(--available) / $grid$mobile)",

  // "@tablet": {
  //   "--width": "calc(var(--vw) - $space$40 * 2)",
  //   "--slices": "calc(($grid$tablet - 1) * $space$10)",
  //   "--span": "calc(var(--available) / $grid$tablet)",
  // },

  // "@desktop": {
  //   "--width": "calc(var(--vw) - $space$40 * 2)",
  //   "--slices": "calc(($grid$desktop - 1) * $space$10)",
  //   "--span": "calc(var(--available) / $grid$desktop)",
  // },

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
