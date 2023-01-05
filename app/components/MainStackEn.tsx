import { Stack } from "@chakra-ui/react"
import Head from "next/head"
import type { FC, ReactNode } from "react"
import { Config } from "interface/config"

type Props = {
  title: string | null
  description: string | null
  fileId: string | null
  spacing?: number
  children: ReactNode
}

export const MainStackEN: FC<Props> = (props) => {
  const appName = Config.siteName

  const defaultTitle = `${appName} - ${Config.siteCatchphraseEN}`

  const title =
    props.title !== null ? `${props.title} - ${appName}` : defaultTitle

  const ogTitle = props.title !== null ? props.title : defaultTitle

  const defaultOgImageURL = `${Config.imageUrl}/facebook.png`

  const ogImageURL =
    props.fileId !== null
      ? `${Config.imageUrl}/${props.fileId}?w=1024&h=630`
      : defaultOgImageURL

  const twitterImageURL =
    props.fileId !== null
      ? `${Config.imageUrl}/${props.fileId}?w=300&h=157`
      : defaultOgImageURL

  const defaultDescription = Config.siteDescriptionEN

  const ogDescription = props.description || defaultDescription

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={"description"} content={ogDescription} />
        <meta property={"og:title"} content={ogTitle} />
        <meta property={"og:description"} content={ogDescription} />
        <meta property={"og:image"} content={ogImageURL} />
        <meta name={"twitter:title"} content={ogTitle} />
        <meta name={"twitter:description"} content={ogDescription} />
        <meta name={"twitter:image"} content={twitterImageURL} />
      </Head>
      <Stack
        as={"main"}
        spacing={{ base: 4, md: 8 }}
        pb={8}
        overflowX={"hidden"}
      >
        {props.children}
      </Stack>
    </>
  )
}
