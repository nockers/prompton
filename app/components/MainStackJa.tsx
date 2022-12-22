import { Box, Stack } from "@chakra-ui/react"
import Head from "next/head"
import type { FC, ReactNode } from "react"
import { HomeNotification } from "app/components/HomeNotification"
import { Config } from "interface/config"

type Props = {
  title: string | null
  description: string | null
  fileId: string | null
  spacing?: number
  children: ReactNode
}

export const MainStackJa: FC<Props> = (props) => {
  const appName = Config.siteName

  const defaultTitle = `${appName} - ${Config.siteCatchphraseJA}`

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

  const defaultDescription = Config.siteDescriptionJA

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
      <Box px={4}>
        <HomeNotification isJA={true} />
      </Box>
      <Stack
        as={"main"}
        spacing={props.spacing ?? 4}
        pb={4}
        w={"100%"}
        overflow={"hidden"}
      >
        {props.children}
      </Stack>
    </>
  )
}