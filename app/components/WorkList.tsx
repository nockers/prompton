import { Button, HStack, Stack } from "@chakra-ui/react"
import type { FC } from "react"
import { CardPost } from "app/components/CardPost"
import { useColumnCount } from "app/hooks/useColumnCount"
import { useWorksQuery } from "interface/__generated__/react"
import { toColumnArray } from "interface/utils/toColumnArray"

type Props = {
  excludedWorkId: string | null
  userId: string
}

export const UserWorkList: FC<Props> = (props) => {
  const { data, fetchMore, loading } = useWorksQuery({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: 9 * 4,
      where: {
        color: null,
        labelName: null,
        userId: props.userId,
      },
    },
  })

  const columnCount = useColumnCount()

  const onFetchMore = () => {
    fetchMore({ variables: { offset: data!.works.length ?? 0 } })
  }

  const works = data?.works.filter((work) => {
    return work.id !== props.excludedWorkId
  })

  return (
    <Stack spacing={8}>
      <HStack alignItems={"flex-start"} spacing={4}>
        {toColumnArray(works ?? [], columnCount).map((column, index) => (
          <Stack spacing={4} key={index}>
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
                postThumbnailURL={work.thumbnailURL}
                userId={work.user.id}
                userName={work.user.name}
                userAvatarImageURL={work.user.avatarImageURL}
                isLiked={work.isLiked}
                isBookmarked={work.isBookmarked}
                isFollowee={work.user.isFollowee}
                isEditable={false}
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
