import { NormalizedCacheObject } from "@apollo/client"
import { BlitzPage } from "@blitzjs/auth"
import {
  Stack,
  Image,
  Text,
  HStack,
  WrapItem,
  Wrap,
  Avatar,
  Box,
  Button,
} from "@chakra-ui/react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import UserLayout from "app/[login]/layout"
import { ButtonLinkColor } from "app/components/ButtonLinkColor"
import { ButtonLinkLabel } from "app/components/ButtonLinkLabel"
import { HomePostList } from "app/components/HomePostList"
import { MainFallback } from "app/components/MainFallback"
import { MainStack } from "app/components/MainStack"
import { ShareButtonTwitter } from "app/components/ShareButtonTwitter"
import {
  PostDocument,
  PostQuery,
  PostQueryVariables,
  useCreatePostLikeMutation,
  useDeletePostLikeMutation,
  useFollowUserMutation,
  usePostQuery,
} from "interface/__generated__/react"
import { client } from "interface/utils/client"

type Props = {
  cache: NormalizedCacheObject
}

type Paths = {
  id: string
}

const WorkPage: BlitzPage<Props> = (props) => {
  const router = useRouter()

  if (typeof window !== "undefined") {
    client.restore({ ...props.cache, ...client.extract() })
  }

  const { data = null } = usePostQuery({
    fetchPolicy: "cache-and-network",
    pollInterval: 4000,
    skip: typeof router.query.id === "undefined",
    variables: {
      id: router.query.id?.toString() ?? "",
    },
  })

  const [createPostLike] = useCreatePostLikeMutation()

  const [deletePostLike] = useDeletePostLikeMutation()

  const [followUser] = useFollowUserMutation()

  const onLinkColor = (color: string) => {
    router.push(`/colors/${color.replace("#", "")}`)
  }

  const onLinkLabel = (label: string) => {
    router.push(`/labels/${label}`)
  }

  const onOpenUser = () => {}

  const onShareWithTwitter = async () => {
    const text = `${data?.work?.user.name}さんの作品`
    if (window.navigator.share) {
      await window.navigator.share({
        title: text,
        url: location.href,
      })
      return
    }
    const search = new URLSearchParams([
      ["text", text],
      ["url", location.href],
    ])
    window.open(
      "http://twitter.com/share?" + search.toString(),
      "sharewindow",
      "width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!",
    )
  }

  const onCreateLike = async () => {
    try {
      await createPostLike({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteLike = async () => {
    try {
      await deletePostLike({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onFollowUser = async () => {
    try {
      await followUser({
        variables: { input: { userId: data!.work!.user!.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (router.isFallback) {
    return <MainFallback />
  }

  if (data === null || data.work === null) {
    return null
  }

  return (
    <MainStack
      title={`${data.work.user.name}さんの作品`}
      description={data.work.prompt || `${data.work.id}`}
      fileId={data.work.fileId}
    >
      <HStack justifyContent={"center"}>
        <Stack
          maxW={"8xl"}
          direction={{ base: "column", lg: "row" }}
          w={"100%"}
          spacing={4}
        >
          <Box flex={1}>
            <Image
              w={"100%"}
              alt={""}
              src={`/api/images/${data.work.fileId}?w=1024`}
              borderRadius={4}
            />
          </Box>
          <Stack w={{ base: "100%", lg: "xs" }} spacing={4}>
            <HStack spacing={4}>
              <Avatar
                size={"md"}
                src={data.work.user.avatarImageURL ?? ""}
                onClick={onOpenUser}
              />
              <Box flex={1} onClick={onOpenUser}>
                <Text fontWeight={"bold"}>{data.work.user.name}</Text>
              </Box>
              <Button size={"sm"} onClick={onFollowUser}>
                {"フォロー"}
              </Button>
            </HStack>
            <HStack spacing={4}>
              <Button flex={1}>{"ブックマーク"}</Button>
              <Button
                flex={1}
                onClick={data.work.isLike ? onDeleteLike : onCreateLike}
                colorScheme={data.work.isLike ? "blue" : "gray"}
              >
                {0 < data.work.likesCount
                  ? `いいね +${data.work.likesCount}`
                  : "いいね"}
              </Button>
            </HStack>
            <Box bg={"blackAlpha.400"} p={4} rounded={"lg"}>
              <Text>{data.work.prompt ?? "No prompt"}</Text>
            </Box>
            <Stack>
              <Wrap>
                {data.work.labels.map((label) => (
                  <WrapItem key={label.id}>
                    <ButtonLinkLabel
                      label={label.name}
                      count={label.count}
                      onClick={() => {
                        onLinkLabel(label.name)
                      }}
                    />
                  </WrapItem>
                ))}
                {data.work.webColors.map((color) => (
                  <WrapItem key={color}>
                    <ButtonLinkColor
                      color={color}
                      onClick={() => {
                        onLinkColor(color)
                      }}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
            <Box>
              <ShareButtonTwitter onClick={onShareWithTwitter} />
            </Box>
          </Stack>
        </Stack>
      </HStack>
      <HomePostList />
    </MainStack>
  )
}

WorkPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export const getStaticPaths: GetStaticPaths<Paths> = async (a) => {
  const paths = [].map((_) => {
    return { params: { id: "" } }
  })

  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  if (typeof context.params?.id === "undefined") {
    throw new Error()
  }

  await client.query<PostQuery, PostQueryVariables>({
    query: PostDocument,
    variables: { id: context.params!.id },
  })

  return {
    props: { cache: client.cache.extract() },
    revalidate: 60,
  }
}

export default WorkPage
