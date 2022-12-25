import type { BlitzPage } from "@blitzjs/auth"
import { Button, HStack, Stack } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { CardPost } from "app/components/CardPost"
import { useHomeColumnCount } from "app/hooks/useHomeColumnCount"
import { useWorksQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

export const HomePostList: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const { data, fetchMore, loading, refetch } = useWorksQuery({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: 9 * 6,
      where: null,
    },
  })

  const columnCount = useHomeColumnCount()

  const onFetchMore = () => {
    fetchMore({ variables: { offset: data!.works.length ?? 0 } })
  }

  /**
   * https://github.com/apollographql/apollo-client/issues/9819
   */
  // useEffect(() => {
  //   const refetchQueryInterval = setInterval(() => {
  //     refetch()
  //   }, 2 * 60 * 1000)
  //   return () => {
  //     clearInterval(refetchQueryInterval)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // ログイン情報が取得できたら再度データを取得する
  useEffect(() => {
    if (appContext.isLoading) return
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.isLoading])

  return (
    <Stack px={4}>
      <HStack alignItems={"flex-start"} spacing={4}>
        {toColumnArray(data?.works ?? [], columnCount).map((column, index) => (
          <Stack key={index} spacing={4}>
            {column.map((work) => (
              <CardPost
                id={work.id}
                key={work.id}
                postFileId={work.fileId}
                postPrompt={work.prompt}
                postLikeCount={work.likesCount}
                postAnnotationAdult={work.annotationAdult}
                postAnnotationMedical={work.annotationMedical}
                postAnnotationRacy={work.annotationRacy}
                postAnnotationSpoof={work.annotationSpoof}
                postAnnotationViolence={work.annotationViolence}
                postLabels={work.labels.map((label) => [
                  label.nameJA || label.name,
                  label.count,
                ])}
                postColors={work.colors}
                postWebColors={work.webColors}
                userId={work.user.id}
                userName={work.user.name}
                userAvatarImageURL={work.user.avatarImageURL}
                isLiked={work.isLiked}
                isBookmarked={work.isBookmarked}
                isFollower={work.user.isFollower}
                isEditable={work.user.id === appContext.currentUser?.uid}
              />
            ))}
          </Stack>
        ))}
      </HStack>
      <Button isLoading={loading} onClick={onFetchMore}>
        {"MORE"}
      </Button>
    </Stack>
  )
}
