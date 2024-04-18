import { createStitches } from "@stitches/react"

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  getCssText,
  config,
} = createStitches({
  theme: {
    fonts: {
      favorit: '"Favorit"',
      favorithangul: '"FavoritHangul"',
    },
    space: {
      10: "10px",
      20: "20px",
      40: "40px",
    },
    transitions: {
      fast: "all 0.125s linear",
      medium: "all 0.25s linear",
      slow: "all 0.3s linear",
    },
    colors: {
      red: "#B90C0C",
      typography: "#545454",
      background: "#E7E6E2",
      darker: "#CCCCC6",
      white: "#ffffff",
      black: "#1E1E1E",
      white50: "#ffffff80",
      black50: "#54545480",
      bg: "#f5f5f5",
    },
    radii: {
      16: "16px",
      6: "6px",
      4: "4px",
    },
    grid: {
      color: "#ff00001a",
      mobile: 12,
      tablet: 24,
      desktop: 24,
    },
  },
  media: {
    tablet: `(min-width: 640px)`,
    desktop: `(min-width: 1280px)`,
    large: `(min-width: 1600px)`,
  },
})

export const DarkTheme = {}

export const LightTheme = DarkTheme
