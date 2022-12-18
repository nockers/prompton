import { ColorModeScript } from "@chakra-ui/react"
import { Head, Html, Main, NextScript } from "next/document"
import { FC } from "react"
import { theme } from "interface/theme"

export const Document: FC = () => {
  const href =
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"

  return (
    <Html>
      <Head>
        <link rel={"preconnect"} href={"https://fonts.gstatic.com"} />
        <link href={href} rel={"stylesheet"} />
        <link rel={"icon"} href={"/favicon.ico"} />
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
