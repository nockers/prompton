import type { NormalizedCacheObject } from "@apollo/client"
import type { BlitzPage } from "@blitzjs/auth"
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
  Icon,
} from "@chakra-ui/react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { BiBookmark, BiStar } from "react-icons/bi"
import UserLayout from "app/[login]/layout"
import { ButtonLinkColor } from "app/components/ButtonLinkColor"
import { ButtonLinkLabel } from "app/components/ButtonLinkLabel"
import { MainFallback } from "app/components/MainFallback"
import { MainStack } from "app/components/MainStack"
import { ShareButtonTwitter } from "app/components/ShareButtonTwitter"
import { UserWorkList } from "app/components/WorkList"
import type {
  WorkQuery,
  WorkQueryVariables,
} from "interface/__generated__/react"
import { useFollowUserMutation } from "interface/__generated__/react"
import { useUnfollowUserMutation } from "interface/__generated__/react"
import {
  useCreateWorkBookmarkMutation,
  useDeleteWorkBookmarkMutation,
} from "interface/__generated__/react"
import {
  WorkDocument,
  useCreateWorkLikeMutation,
  useDeleteWorkLikeMutation,
  useWorkQuery,
} from "interface/__generated__/react"
import { Config } from "interface/config"
import { AppContext } from "interface/contexts/appContext"
import { client } from "interface/utils/client"

type Props = {
  cache: NormalizedCacheObject
}

type Paths = {
  id: string
}

const WorkPage: BlitzPage<Props> = (props) => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  if (typeof window !== "undefined") {
    client.restore({ ...props.cache, ...client.extract() })
  }

  const { data = null, refetch: refetchWork } = useWorkQuery({
    fetchPolicy: "cache-and-network",
    skip: typeof router.query.id === "undefined",
    variables: {
      id: router.query.id?.toString() ?? "",
    },
  })

  const [followUser, { loading: isCreatingFriendship }] =
    useFollowUserMutation()

  const [unfollowUser, { loading: isDeletingFriendship }] =
    useUnfollowUserMutation()

  const [createWorkLike, { loading: isCreatingLike }] =
    useCreateWorkLikeMutation()

  const [deleteWorkLike, { loading: isDeletingLike }] =
    useDeleteWorkLikeMutation()

  const [createWorkBookmark, { loading: isCreatingBookmark }] =
    useCreateWorkBookmarkMutation()

  const [deleteWorkBookmark, { loading: isDeletingBookmark }] =
    useDeleteWorkBookmarkMutation()

  // ログイン情報が取得できたら再度データを取得する
  useEffect(() => {
    if (appContext.isLoading) return
    refetchWork()
    console.log("refetchWork")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.isLoading])

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

  const onFollowUser = async () => {
    try {
      await followUser({
        variables: { input: { userId: data!.work!.user.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onUnfollowUser = async () => {
    try {
      await unfollowUser({
        variables: { input: { userId: data!.work!.user.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onCreateLike = async () => {
    try {
      await createWorkLike({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteLike = async () => {
    try {
      await deleteWorkLike({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onCreateBookmark = async () => {
    try {
      await createWorkBookmark({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteBookmark = async () => {
    try {
      await deleteWorkBookmark({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isLoadingFriendship = isCreatingFriendship || isDeletingFriendship

  const isLoadingLike = isCreatingLike || isDeletingLike

  const isLoadingBookmark = isCreatingBookmark || isDeletingBookmark

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
      {appContext.isLoading ? "foo" : "bar"}
      <HStack justifyContent={"center"}>
        <Stack
          px={4}
          maxW={"container.xl"}
          direction={{ base: "column", lg: "row" }}
          w={"100%"}
          spacing={4}
        >
          <Box flex={1}>
            <Image
              w={"100%"}
              alt={""}
              src={`${Config.imageUrl}/${data.work.fileId}?w=1024`}
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
              <Button
                size={"sm"}
                leftIcon={<Icon as={BiBookmark} />}
                isLoading={isLoadingFriendship}
                colorScheme={data.work.user.isFollower ? "pink" : "gray"}
                onClick={
                  data.work.user.isFollower ? onUnfollowUser : onFollowUser
                }
              >
                {"フォロー"}
              </Button>
            </HStack>
            <HStack spacing={4}>
              <Button
                flex={1}
                isLoading={isLoadingBookmark}
                leftIcon={<Icon as={BiBookmark} />}
                colorScheme={data.work.isBookmarked ? "blue" : "gray"}
                onClick={
                  data.work.isBookmarked ? onDeleteBookmark : onCreateBookmark
                }
              >
                {"ブックマーク"}
              </Button>
              <Button
                flex={1}
                isLoading={isLoadingLike}
                leftIcon={<Icon as={BiStar} />}
                colorScheme={data.work.isLiked ? "blue" : "gray"}
                onClick={data.work.isLiked ? onDeleteLike : onCreateLike}
              >
                {0 < data.work.likesCount
                  ? `スキ +${data.work.likesCount}`
                  : "スキ"}
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
      <Box px={4} maxW={"container.xl"}>
        <UserWorkList
          excludedWorkId={data.work.id}
          userId={data.work.user.id}
        />
      </Box>
    </MainStack>
  )
}

WorkPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const paths = [].map(() => {
    return { params: { id: "" } }
  })

  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  if (typeof context.params?.id === "undefined") {
    throw new Error()
  }

  await client.query<WorkQuery, WorkQueryVariables>({
    query: WorkDocument,
    variables: { id: context.params!.id },
  })

  return {
    props: { cache: client.cache.extract() },
    revalidate: 60,
  }
}

export default WorkPage
