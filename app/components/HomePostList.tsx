import {
  Box,
  Button,
  Divider,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import type { FC } from "react"
import { useContext } from "react"
import { CardPost } from "app/components/CardPost"
import { useHomeColumnCount } from "app/hooks/useHomeColumnCount"
import { useWorksQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

type Props = {
  searchText?: string
}

export const HomePostList: FC<Props> = (props) => {
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
      where: {
        search: props.searchText || null,
      },
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
      <HStack pt={40} justifyContent={"center"}>
        <Spinner size={"xl"} />
      </HStack>
    )
  }

  if (data === null || data.works.length === 0) {
    return (
      <HStack justifyContent={"center"}>
        <Text>{"関連するデータは見つかりませんでした。"}</Text>
      </HStack>
    )
  }

  return (
    <Stack px={4} spacing={4}>
      <Box w={"100%"}>
        <Divider />
      </Box>
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
                isFollowee={work.user.isFollowee}
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
