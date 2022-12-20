import { Button, HStack, Stack, Text } from "@chakra-ui/react"
import axios from "axios"
import type { GetStaticProps } from "next"
import Link from "next/link"
import type { FC } from "react"
import { MainStack } from "app/components/MainStack"
import type { StrapiPosts } from "interface/types/strapiPosts"

type Props = {
  posts: {
    title: string
    publishedAt: string
    slug: string
  }[]
}

const BlogPage: FC<Props> = (props) => {
  return (
    <MainStack title={"過去の記事"} description={null} fileId={null}>
      <HStack justifyContent={"center"}>
        <Stack maxW={"xl"} w={"100%"} spacing={4}>
          {props.posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Button h={"auto"} textAlign={"left"} w={"100%"}>
                <Stack spacing={2} w={"100%"} py={4}>
                  <Text opacity={"0.8"} fontWeight="bold">
                    {post.publishedAt}
                  </Text>
                  <Text as={"h2"} fontSize={24}>
                    {post.title}
                  </Text>
                </Stack>
              </Button>
            </Link>
          ))}
        </Stack>
      </HStack>
    </MainStack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const result = await axios<StrapiPosts>({
    method: "GET",
    baseURL: process.env.STRAPI_URL,
    url: "posts",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  })

  const posts = result.data.data.map((post) => {
    return {
      slug: post.attributes.slug,
      title: post.attributes.title,
      body: post.attributes.body,
      publishedAt: post.attributes.publishedAt,
    }
  })

  return { props: { posts } }
}

export default BlogPage
