import { Stack, useToast } from "@chakra-ui/react"
import type { FC } from "react"
import { AlertIntroductionFollow } from "app/[login]/components/AlertIntroductionFollow"
import { CardFollowee } from "app/[login]/components/CardFollowee"
import UserLoading from "app/[login]/loading"
import {
  useUnfollowUserMutation,
  useViewerFolloweesQuery,
} from "interface/__generated__/react"

export const ViewerFolloweeList: FC = () => {
  const {
    data = null,
    loading,
    refetch,
  } = useViewerFolloweesQuery({
    variables: { offset: 0, limit: 9 * 6 },
  })

  const [unfollowUser] = useUnfollowUserMutation()

  const toast = useToast()

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

  return (
    <Stack w={"100%"} px={4}>
      {data.viewer.followees.length === 0 && <AlertIntroductionFollow />}
      {data.viewer.followees.map((followee) => (
        <CardFollowee
          key={followee.id}
          userId={followee.id}
          userAvatarURL={followee.avatarImageURL}
          userName={followee.name}
          onUnfollow={() => {
            onUnfollow(followee.id)
          }}
        />
      ))}
    </Stack>
  )
}
