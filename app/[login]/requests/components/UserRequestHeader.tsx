import {
  HStack,
  Stack,
  Text,
  Avatar,
  Skeleton,
  SkeletonCircle,
  useToast,
  Button,
} from "@chakra-ui/react"
import type { FC } from "react"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUserQuery,
} from "interface/__generated__/react"

type Props = {
  userId: string
}

export const UserRequestHeader: FC<Props> = (props) => {
  const { data = null, loading } = useUserQuery({
    variables: { id: props.userId },
  })

  const [followUser, { loading: isCreatingFriendship }] =
    useFollowUserMutation()

  const [unfollowUser, { loading: isDeletingFriendship }] =
    useUnfollowUserMutation()

  const toast = useToast()

  const onFollowUser = async () => {
    try {
      await followUser({
        variables: { input: { userId: props.userId } },
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
        variables: { input: { userId: props.userId } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const user = data?.user ?? null

  const isLoadingFriendship = isCreatingFriendship || isDeletingFriendship

  return (
    <HStack
      spacing={4}
      borderRadius={"lg"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <SkeletonCircle size={"16"} isLoaded={!loading && user !== null}>
        <Avatar size={"lg"} src={user?.avatarImageURL || ""} />
      </SkeletonCircle>
      <Stack flex={1} spacing={1}>
        <Skeleton isLoaded={!loading && user !== null}>
          <Text fontSize={"xs"} fontWeight={"bold"} opacity={0.8} minW={40}>
            {`@${user?.id.slice(0, 8)}`}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!loading && user !== null}>
          <Text fontSize={"2xl"} lineHeight={1} fontWeight={"bold"}>
            {user?.name ?? "-"}
          </Text>
        </Skeleton>
      </Stack>
      <Button
        size={"sm"}
        isLoading={isLoadingFriendship}
        colorScheme={data?.user?.isFollowee ? "primary" : "gray"}
        onClick={data?.user?.isFollowee ? onUnfollowUser : onFollowUser}
      >
        {data?.user?.isFollowee ? "フォロー中" : "フォロー"}
      </Button>
    </HStack>
  )
}
