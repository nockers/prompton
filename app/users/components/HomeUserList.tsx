import { Stack, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { FC } from "react"
import { useContext, useEffect } from "react"
import UserLoading from "app/[login]/loading"
import { CardUser } from "app/users/components/CardUser"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUsersQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

export const HomeUserList: FC = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const {
    data = null,
    loading,
    refetch,
  } = useUsersQuery({
    variables: { offset: 0, limit: 9 * 6 },
  })

  const [unfollowUser] = useUnfollowUserMutation()

  const [followUser] = useFollowUserMutation()

  const toast = useToast()

  // ログイン情報が取得できたら再度データを取得する
  useEffect(() => {
    if (appContext.isLoading) return
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.isLoading])

  if (loading && data === null) {
    return <UserLoading />
  }

  if (data === null) {
    return null
  }

  const onUnfollow = async (userId: string) => {
    try {
      await unfollowUser({ variables: { input: { userId } } })
      await refetch()
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onFollow = async (userId: string) => {
    try {
      await followUser({ variables: { input: { userId } } })
      await refetch()
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onRoute = (userId: string) => {
    router.push(`/${userId}`)
  }

  return (
    <Stack w={"100%"} px={4}>
      {data.users.map((user) => (
        <CardUser
          key={user.id}
          userId={user.id}
          userAvatarURL={user.avatarImageURL}
          userName={user.name}
          isFollowee={user.isFollowee}
          onFollow={() => {
            onFollow(user.id)
          }}
          onUnfollow={() => {
            onUnfollow(user.id)
          }}
          onRoute={() => {
            onRoute(user.id)
          }}
        />
      ))}
    </Stack>
  )
}
