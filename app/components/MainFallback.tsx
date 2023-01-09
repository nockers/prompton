import Head from "next/head"
import type { FC } from "react"
import { MainLoading } from "app/components/MainLoading"

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
      <MainLoading />
    </>
  )
}
