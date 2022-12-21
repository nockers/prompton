import { Box, Stack } from "@chakra-ui/react"
import Head from "next/head"
import type { FC, ReactNode } from "react"
import { PageNotification } from "app/components/PageNotification"
import { Config } from "interface/config"

type Props = {
  title: string | null
  description: string | null
  fileId: string | null
  spacing?: number
  children: ReactNode
}

export const MainStack: FC<Props> = (props) => {
  const appName = Config.siteName

  const defaultTitle = `${appName} - ${Config.siteCatchphraseEN}`

  const title =
    props.title !== null ? `${props.title} - ${appName}` : defaultTitle

  const ogTitle = props.title !== null ? props.title : defaultTitle

  const defaultOgImageURL = `${process.env.NEXT_PUBLIC_URL}/facebook.png`

  const ogImageURL =
    props.fileId !== null
      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${props.fileId}?w=1024&h=630`
      : defaultOgImageURL

  const twitterImageURL =
    props.fileId !== null
      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${props.fileId}?w=300&h=157`
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
      <Stack as={"main"} spacing={4} alignItems={"center"} pb={8}>
        <Box px={4} w={"100%"} maxW={"container.xl"}>
          <PageNotification isJA={false} />
        </Box>
        {props.children}
      </Stack>
    </>
  )
}
