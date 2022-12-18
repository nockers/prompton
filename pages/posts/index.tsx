import { Button, HStack, Stack, Text } from "@chakra-ui/react"
import axios from "axios"
import { GetStaticProps } from "next"
import Link from "next/link"
import { FC } from "react"
import { StrapiPosts } from "interface/types/strapiPosts"

type Props = {
  posts: {
    title: string
    publishedAt: string
    slug: string
  }[]
}

const PostsPage: FC<Props> = (props) => {
  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <HStack justifyContent={"center"}>
        <Stack maxW={"xl"} w={"100%"} spacing={4} py={8}>
          {props.posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
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
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log("process.env.STRAPI_URL", process.env.STRAPI_URL)

  console.log("process.env.STRAPI_URL", `${process.env.STRAPI_URL}`)

  console.log({
    method: "GET",
    baseURL: process.env.STRAPI_URL,
    url: "posts",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  })

  const result = await axios<StrapiPosts>({
    method: "GET",
    baseURL: `${process.env.STRAPI_URL}`,
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

export default PostsPage
