import {
  extendTheme,
  theme as defaultTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react"

const primary = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
}

const baseTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: primary,
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

export const theme = extendTheme(
  baseTheme,
  withDefaultColorScheme({
    colorScheme: "primary",
    components: ["Tabs", "Switch"],
  }),
)
