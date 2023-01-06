import {
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react"
import axios from "axios"
import type { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import type { FC } from "react"
import { BiChevronLeft } from "react-icons/bi"
import { MarkdownDocument } from "app/components/BoxMarkdown"
import { MainFallback } from "app/components/MainFallback"
import { MainStackJA } from "app/components/MainStackJa"
import { Env } from "infrastructure/env"
import type { StrapiPosts } from "interface/types/strapiPosts"

type Props = {
  title: string
  publishedAt: string
  body: string
  slug: string
}

type Paths = {
  slug: string
}

const BlogPostPage: FC<Props> = (props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <MainFallback />
  }

  return (
    <MainStackJA
      pageTitle={props.title}
      pageDescription={props.body}
      fileId={null}
    >
      <HStack justifyContent={"center"}>
        <Stack maxW={"xl"} w={"100%"} spacing={8} py={4}>
          <Stack spacing={1}>
            <Text opacity={"0.8"} fontWeight="bold">
              {props.publishedAt}
            </Text>
            <Heading as={"h1"}>{props.title}</Heading>
          </Stack>
          <Stack spacing={4}>
            <MarkdownDocument>{props.body}</MarkdownDocument>
          </Stack>
          <Divider />
          <HStack>
            <Link href={"/blog"}>
              <Button leftIcon={<Icon as={BiChevronLeft} />}>
                {"過去の記事"}
              </Button>
            </Link>
          </HStack>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const result = await axios<StrapiPosts>({
    method: "GET",
    baseURL: Env.strapiApiUrl,
    url: "posts",
    headers: {
      Authorization: `Bearer ${Env.strapiApiKey}`,
    },
  })

  const paths = result.data.data.map((post) => {
    return { params: { slug: post.attributes.slug + "" } }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  if (typeof context.params?.slug === "undefined") {
    throw new Error()
  }

  const result = await axios<StrapiPosts>({
    method: "GET",
    baseURL: Env.strapiApiUrl,
    url: `posts?filters[slug][$eq]=${context.params.slug}`,
    headers: {
      Authorization: `Bearer ${Env.strapiApiKey}`,
    },
  })

  const [post = null] = result.data.data

  if (post === null) {
    throw new Error()
  }

  return {
    props: {
      slug: post.attributes.slug,
      title: post.attributes.title,
      body: post.attributes.body,
      publishedAt: post.attributes.publishedAt,
    },
  }
}

export default BlogPostPage
