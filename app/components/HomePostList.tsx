import type { BlitzPage } from "@blitzjs/auth"
import { Button, HStack, Stack } from "@chakra-ui/react"
import { useContext } from "react"
import { CardPost } from "app/components/CardPost"
import { useColumnCount } from "app/hooks/useColumnCount"
import { useWorksQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

export const HomePostList: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const { data, fetchMore, loading } = useWorksQuery({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: 9 * 4,
      where: null,
    },
  })

  const columnCount = useColumnCount()

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

  return (
    <Stack maxW={"container.xl"} px={4}>
      <HStack alignItems={"flex-start"}>
        {toColumnArray(data?.works ?? [], columnCount).map((column, index) => (
          <Stack key={index}>
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
                  label.name,
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
