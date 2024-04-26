import {
  DarkTheme,
  globalCss as createGlobalCss,
  LightTheme,
} from "@/styles/stitches"

export const globalCss = createGlobalCss({
  // Reset
  "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, hr, a, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strong, sub, sup, tt, var, b, u, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, button, video":
    {
      margin: 0,
      padding: 0,
    },

  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section":
    {
      display: "block",
    },

  "h1, h2, h3, h4, h5, h6": { fontSize: "100%" },

  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
  },

  "strong, b, mark": {
    fontStyle: "inherit",
    fontWeight: "bold",
  },

  "em, i, cite, q, address, dfn, var": {
    fontStyle: "normal",
    fontWeight: "inherit",
  },

  " abbr[title], dfn[title]": {
    borderBottom: "1px dotted",
    cursor: "help",
  },

  ins: { borderBottom: "1px solid" },

  "a, u, ins": { textDecoration: "none" },

  "del, s": { textDecoration: "line-through" },

  "pre, code, samp, kbd": { fontFamily: "monospace" },

  small: { fontSize: "0.75em" },

  img: {
    border: "none",
    fontSize: 0,
    color: "transparent",
    display: "block",
    maxWidth: "100%",
  },

  "input,select, textarea": { font: "inherit" },

  "h1, h2, h3, h4, h5": { fontWeight: "normal" },

  select: {
    textAlign: "left",
  },

  ":root": {
    // theme
    "@media (prefers-color-scheme: dark)": { ...DarkTheme },
    "@media (prefers-color-scheme: light)": { ...LightTheme },
    '&[data-theme="dark"]': { ...DarkTheme },
    '&[data-theme="light"]': { ...LightTheme },

    // grid system
    "--vw": "100vw",
    "--vh": "100vh",
  },

  // webfonts
  "@font-face": [
    {
      fontFamily: '"Favorit"',
      src: 'url("/fonts/Favorit-Medium.woff2") format("woff2"), url("/fonts/Favorit-Medium.woff") format("woff")',
      fontWeight: 500,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
    {
      fontFamily: '"Favorit"',
      src: 'url("/fonts/Favorit-Italic.woff2") format("woff2"), url("/fonts/Favorit-Italic.woff") format("woff")',
      fontWeight: "normal",
      fontStyle: "italic",
      fontDisplay: "swap",
    },
    {
      fontFamily: '"Favorit"',
      src: 'url("/fonts/Favorit-Regular.woff2") format("woff2"), url("/fonts/Favorit-Regular.woff") format("woff")',
      fontWeight: "normal",
      fontStyle: "normal",
      fontDisplay: "swap",
    },

    {
      fontFamily: "FavoritHangul",
      src: 'url("favorit_hangul-webfont.woff2") format("woff2"), url("favorit_hangul-webfont.woff") format("woff")',
      fontWeight: "normal",
      fontStyle: "normal",
    },
  ],

  // Globals
  html: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
  },

  body: {
    fontFamily: '"Favorit"',
    fontWeight: 400,
    fontSize: 16,
    backgroundColor: "$colors$bg",
    color: "$colors$typography",
  },

  "*": {
    boxSizing: "border-box",
    "-moz-osx-font-smoothing": "grayscale",
    "-webkit-font-smoothing": "antialiased",
  },

  i: {
    display: "block",
    fontFamily: "Material Icons",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: 24,
    lineHeight: 1,
    textTransform: "none",
    letterSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "nowrap",
    direction: "ltr",
    userSelect: "none",
  },
})
