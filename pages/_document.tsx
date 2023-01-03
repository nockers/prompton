import { ColorModeScript } from "@chakra-ui/react"
import { Head, Html, Main, NextScript } from "next/document"
import type { FC } from "react"
import { theme } from "interface/theme"

export const Document: FC = () => {
  const href =
    "https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500;700&display=swap"

  return (
    <Html>
      <Head>
        <link rel={"preconnect"} href={"https://fonts.googleapis.com"} />
        <link
          rel={"preconnect"}
          href={"https://fonts.gstatic.com"}
          crossOrigin={""}
        />
        <link href={href} rel={"stylesheet"} />
        <link rel={"icon"} href={"/favicon.ico"} />
        <link rel={"apple-touch-icon"} href={"/apple-touch-icon.png"} />
        <link rel={"manifest"} href={"/manifest.json"} />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
