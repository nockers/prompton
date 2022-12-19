import { Spinner, Stack } from "@chakra-ui/react"
import Head from "next/head"
import type { FC } from "react"

export const MainFallback: FC = () => {
  const defaultOgImageURL = "https://prompton.io/facebook.png"

  return (
    <>
      <Head>
        <title>{"ページを生成しています.."}</title>
        <meta property="og:title" content={""} />
        <meta property="og:description" content={""} />
        <meta property="og:image" content={defaultOgImageURL} />
        <meta name={"twitter:description"} content={""} />
        <meta name={"twitter:image"} content={defaultOgImageURL} />
      </Head>
      <Stack
        as={"main"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        pt={40}
      >
        <Spinner size={"xl"} />
      </Stack>
    </>
  )
}
