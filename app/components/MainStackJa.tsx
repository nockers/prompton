import type { StackProps } from "@chakra-ui/react"
import { Stack } from "@chakra-ui/react"
import Head from "next/head"
import type { FC, ReactNode } from "react"
import { Config } from "interface/config"

type Props = StackProps & {
  pageTitle: string | null
  pageDescription: string | null
  fileId: string | null
  children: ReactNode
}

export const MainStackJA: FC<Props> = (props) => {
  const {
    pageTitle: title,
    pageDescription: description,
    fileId,
    children,
    ...stackProps
  } = props

  const siteName = Config.siteName

  const defaultTitle = `${siteName} - ${Config.siteCatchphraseJA}`

  const pageTitle = title !== null ? `${title} - ${siteName}` : defaultTitle

  const ogTitle = title !== null ? title : defaultTitle

  const defaultOgImageURL = `${Config.imageUrl}/facebook.png`

  const ogImageURL =
    fileId !== null
      ? `${Config.imageUrl}/${fileId}?w=1024&h=630`
      : defaultOgImageURL

  const twitterImageURL =
    fileId !== null
      ? `${Config.imageUrl}/${fileId}?w=300&h=157`
      : defaultOgImageURL

  const defaultDescription = Config.siteDescriptionJA

  const ogDescription = description || defaultDescription

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
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
        minH={"100vh"}
        {...stackProps}
      >
        {children}
      </Stack>
    </>
  )
}
