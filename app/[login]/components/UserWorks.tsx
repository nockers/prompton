import { HStack, Stack } from "@chakra-ui/react"
import type { FC } from "react"
import UserLoading from "app/[login]/loading"
import { CardUserWork } from "app/components/CardUserWork"
import { useColumnCount } from "app/hooks/useColumnCount"
import { useUserWorksQuery } from "interface/__generated__/react"
import { toColumnArray } from "interface/utils/toColumnArray"

type Props = {
  userId: string
}

export const UserWorks: FC<Props> = (props) => {
  const { data = null, loading } = useUserWorksQuery({
    variables: {
      offset: 0,
      limit: 9 * 6,
      userId: props.userId,
    },
  })

  const columnCount = useColumnCount()

  if (loading) {
    return <UserLoading />
  }

  if (data === null) {
    return null
  }

  return (
    <Stack spacing={4}>
      <HStack alignItems={"flex-start"} spacing={4} w={"100%"}>
        {toColumnArray(data.works, columnCount).map((column, index) => (
          <Stack key={index} spacing={4} flex={1}>
            {column.map((work) => (
              <CardUserWork
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
                isEditable={false}
                isLiked={false}
                isBookmarked={false}
                isFollowee={false}
              />
            ))}
          </Stack>
        ))}
      </HStack>
    </Stack>
  )
}
