import { createStitches } from "@stitches/react"

// grid settings
export const GRID = {
  mobile: {
    columns: 12,
    gap: 10,
    padding: 20,
  },
  tablet: {
    columns: 24,
    gap: 10,
    padding: 40,
  },
  desktop: {
    columns: 24,
    gap: 10,
    padding: 40,
  },
}

// breakpoints
export const MEDIA = {
  tablet: 640,
  desktop: 1280,
  large: 1600,
}

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
      favorite: '"Favorit"',
      favorithangul: '"FavoritHangul"',
    },
    space: {
      10: "10px",
      40: "40px",
      20: "20px",
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
      mobile: GRID.mobile.columns,
      tablet: GRID.tablet.columns,
      desktop: GRID.desktop.columns,
    },
  },
  media: {
    tablet: `(min-width: ${MEDIA.tablet}px)`,
    desktop: `(min-width: ${MEDIA.desktop}px)`,
    large: `(min-width: ${MEDIA.large}px)`,
  },
})

export const DarkTheme = {}

export const LightTheme = DarkTheme
