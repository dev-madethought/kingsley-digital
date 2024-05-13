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
    tablet: `(min-width: 700px)`,
    desktop: `(min-width: 1024px)`,
    large: `(min-width: 1600px)`,
  },
  utils: {
    column: (value: number) => {
      // mobile
      const Msize = `calc(var(--vw) - $space$20 * 2)`
      const Mslices = `calc(($grid$mobile - 1) * $space$10)`
      const Mavailable = `calc(${Msize} - ${Mslices})`
      const Mspan = `calc(${Mavailable} / $grid$mobile)`
      const Mgutter = `calc($space$10 * (${value} - 1))`
      const Mwidth = `calc(${Mspan} * ${value} + ${Mgutter})`

      // tablet
      const Tsize = `calc(var(--vw) - $space$40 * 2)`
      const Tslices = `calc(($grid$tablet - 1) * $space$10)`
      const Tavailable = `calc(${Tsize} - ${Tslices})`
      const Tspan = `calc(${Tavailable} / $grid$tablet)`
      const Tgutter = `calc($space$10 * (${value} - 1))`
      const Twidth = `calc(${Tspan} * ${value} + ${Tgutter})`

      // desktop
      const Dsize = `calc(var(--vw) - $space$40 * 2)`
      const Dslices = `calc(($grid$desktop - 1) * $space$10)`
      const Davailable = `calc(${Dsize} - ${Dslices})`
      const Dspan = `calc(${Davailable} / $grid$desktop)`
      const Dgutter = `calc($space$10 * (${value} - 1))`
      const Dwidth = `calc(${Dspan} * ${value} + ${Dgutter})`

      return {
        width: Mwidth,

        "@tablet": {
          width: Twidth,
        },

        "@desktop": {
          width: Dwidth,
        },
      }
    },
  },
})

export const DarkTheme = {}

export const LightTheme = DarkTheme
