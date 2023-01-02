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
  useToast,
} from "@chakra-ui/react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import UserLayout from "app/[login]/layout"
import { ButtonBookmark } from "app/components/ButtonBookmark"
import { ButtonDelete } from "app/components/ButtonDelete"
import { ButtonFollow } from "app/components/ButtonFollow"
import { ButtonLike } from "app/components/ButtonLike"
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
import {
  useDeleteWorkMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useCreateWorkBookmarkMutation,
  useDeleteWorkBookmarkMutation,
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

  const [deleteWork, { loading: isDeleting }] = useDeleteWorkMutation()

  const toast = useToast()

  // ログイン情報が取得できたら再度データを取得する
  useEffect(() => {
    if (appContext.isLoading) return
    refetchWork()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.isLoading])

  const onLinkColor = (color: string) => {
    router.push(`/colors/${color.replace("#", "")}`)
  }

  const onLinkLabel = (label: string) => {
    router.push(`/labels/${label}`)
  }

  const onOpenUser = () => {
    router.push(`/${data?.work?.user.id?.toString()}`)
  }

  const onShareWithTwitter = async () => {
    const text = `${data?.work?.user.name}さんの作品 #AIイラスト #nijijourney #midjourney #AIart`
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
      toast({ status: "success", description: "フォローしました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onUnfollowUser = async () => {
    try {
      await unfollowUser({
        variables: { input: { userId: data!.work!.user.id } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onCreateLike = async () => {
    try {
      await createWorkLike({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onDeleteLike = async () => {
    try {
      await deleteWorkLike({
        variables: { input: { workId: data!.work!.id } },
      })
      // await refetchWork()
      toast({ status: "success", description: "削除しました。" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onCreateBookmark = async () => {
    try {
      await createWorkBookmark({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onDeleteBookmark = async () => {
    try {
      await deleteWorkBookmark({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onDeleteWork = async () => {
    try {
      await deleteWork({
        variables: { input: { workId: data!.work!.id } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
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

  if (data.work.isDeleted) {
    return <Text>{"削除済み"}</Text>
  }

  const isSelf = data.work.user.id === appContext.currentUser?.uid

  return (
    <MainStack
      title={`${data.work.user.name}さんの作品`}
      description={data.work.prompt || `${data.work.id}`}
      fileId={data.work.fileId}
    >
      <HStack justifyContent={"center"} w={"100%"} pt={{ base: 4, md: 8 }}>
        <Stack
          px={{ base: 4, md: 8 }}
          maxW={"container.xl"}
          direction={{ base: "column", lg: "row" }}
          w={"100%"}
          spacing={{ base: 4, md: 8 }}
        >
          <Box flex={1} w={"100%"}>
            <Image
              w={"100%"}
              alt={""}
              src={`${Config.imageUrl}/${data.work.fileId}?w=1024`}
              fallbackSrc={`${Config.imageUrl}/${data.work.fileId}?w=512`}
              borderRadius={4}
            />
          </Box>
          <Stack w={{ base: "100%", lg: "xs" }} spacing={4}>
            <Stack spacing={4}>
              <HStack spacing={4}>
                <Avatar
                  size={"md"}
                  src={data.work.user.avatarImageURL ?? ""}
                  cursor={"pointer"}
                  onClick={onOpenUser}
                />
                <Box flex={1}>
                  <Box onClick={onOpenUser} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>{data.work.user.name}</Text>
                  </Box>
                </Box>
                {!isSelf && (
                  <ButtonFollow
                    size={"sm"}
                    isLoading={isLoadingFriendship}
                    isActive={data.work.user.isFollowee}
                    isDisabled={appContext.currentUser === null}
                    onFollow={onFollowUser}
                    onUnfollow={onUnfollowUser}
                  />
                )}
              </HStack>
              <Stack>
                <HStack spacing={2}>
                  <ButtonBookmark
                    flex={1}
                    isLoading={isLoadingBookmark}
                    isActive={data.work.isBookmarked}
                    isDisabled={appContext.currentUser === null}
                    onCreate={onCreateBookmark}
                    onDelete={onDeleteBookmark}
                  />
                  <ButtonLike
                    flex={1}
                    count={data.work.likesCount}
                    isLoading={isLoadingLike}
                    isActive={data.work.isLiked}
                    isDisabled={isSelf || appContext.currentUser === null}
                    onCreate={onCreateLike}
                    onDelete={onDeleteLike}
                  />
                </HStack>
                <ShareButtonTwitter w={"100%"} onClick={onShareWithTwitter} />
                {isSelf && (
                  <ButtonDelete
                    w={"100%"}
                    isLoading={isDeleting}
                    onClick={onDeleteWork}
                  />
                )}
              </Stack>
            </Stack>
            <Box bg={"blackAlpha.400"} p={4} rounded={"lg"}>
              <Text>{data.work.prompt ?? "No prompt"}</Text>
            </Box>
            <Stack>
              <Wrap>
                {data.work.labels.map((label) => (
                  <WrapItem key={label.id}>
                    <ButtonLinkLabel
                      label={label.nameJA || label.name}
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
          </Stack>
        </Stack>
      </HStack>
      <Box px={{ base: 4, md: 8 }}>
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
