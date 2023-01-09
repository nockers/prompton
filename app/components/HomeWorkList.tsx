import { Button, HStack, Spinner, Stack } from "@chakra-ui/react"
import type { FC } from "react"
import { useContext } from "react"
import { CardWork } from "app/components/CardWork"
import { useHomeColumnCount } from "app/hooks/useHomeColumnCount"
import { useWorksQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

export const HomeWorkList: FC = () => {
  const appContext = useContext(AppContext)

  const {
    data = null,
    fetchMore,
    loading,
  } = useWorksQuery({
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

  if (loading && data === null) {
    return (
      <HStack py={40} justifyContent={"center"}>
        <Spinner size={"xl"} />
      </HStack>
    )
  }

  if (data === null || data.works.length === 0) {
    return null
  }

  return (
    <Stack spacing={4}>
      <HStack alignItems={"flex-start"} spacing={4} w={"100%"}>
        {toColumnArray(data?.works ?? [], columnCount).map((column, index) => (
          <Stack key={index} spacing={4} flex={1}>
            {column.map((work) => (
              <CardWork
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
                  label.nameJA || label.name,
                  label.count,
                ])}
                postColors={work.colors}
                postWebColors={work.webColors}
                postThumbnailURL={work.thumbnailURL}
                userId={work.user.id}
                userName={work.user.name}
                userAvatarImageURL={work.user.avatarImageURL}
                isLiked={work.isLiked}
                isBookmarked={work.isBookmarked}
                isFollowee={work.user.isFollowee}
                isLoggedIn={appContext.currentUser !== null}
                isEditable={work.user.id === appContext.currentUser?.uid}
              />
            ))}
          </Stack>
        ))}
      </HStack>
      <HStack justifyContent={"center"} px={4} w={"100%"}>
        <Button
          w={"100%"}
          maxW={"xs"}
          isLoading={loading}
          onClick={onFetchMore}
        >
          {"MORE"}
        </Button>
      </HStack>
    </Stack>
  )
}
