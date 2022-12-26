import { extendTheme, theme as defaultTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: defaultTheme.colors.blue,
    secondary: defaultTheme.colors.cyan,
    background: {
      light: defaultTheme.colors.white,
      dark: defaultTheme.colors.gray[800],
    },
  },
  fonts: {
    body: ["'M PLUS 1p'", "system-ui", "sans-serif"].join(","),
    heading: ["'M PLUS 1p'", "system-ui", "sans-serif"].join(","),
    mono: ["Menlo", "monospace"].join(","),
  },
  styles: {
    global: {
      html: {
        overscrollBehaviorY: "none",
        overflowY: "auto",
      },
      "*": {
        WebkitTapHighlightColor: "transparent",
      },
    },
  },
})
