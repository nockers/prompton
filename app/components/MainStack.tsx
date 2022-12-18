import { Stack } from "@chakra-ui/react"
import Head from "next/head"
import { FC, ReactNode } from "react"

type Props = {
  title: string | null
  description: string | null
  fileId: string | null
  children: ReactNode
}

export const MainStack: FC<Props> = (props) => {
  const appName = "Prompton"

  const defaultTitle = `${appName} - AIデザイナーに制作依頼`

  const title =
    props.title !== null ? `${props.title} - ${appName}` : defaultTitle

  const defaultOgImageURL = "https://prompton.io/facebook.png"

  const ogImageURL =
    props.fileId !== null
      ? `/api/images/${props.fileId}?w=1024&h=630`
      : defaultOgImageURL

  const twitterImageURL =
    props.fileId !== null
      ? `/api/images/${props.fileId}?w=300&h=157`
      : defaultOgImageURL

  const defaultDescription =
    "Prompton（プロンプトン）はAIデザイナーを支援する作品投稿サイトです。AIで生成した作品を投稿したり制作の依頼を引き受けられます。"

  const ogDescription = props.description || defaultDescription

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImageURL} />
        <meta name={"twitter:description"} content={ogDescription} />
        <meta name={"twitter:image"} content={twitterImageURL} />
      </Head>
      <Stack as={"main"} px={4} spacing={4} pb={4}>
        {props.children}
      </Stack>
    </>
  )
}
