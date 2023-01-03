import { HStack, Stack } from "@chakra-ui/react"
import type { FC } from "react"
import { AlertIntroductionBookmark } from "app/[login]/components/AlertIntroductionBookmark"
import UserLoading from "app/[login]/loading"
import { CardUserWork } from "app/components/CardUserWork"
import { useColumnCount } from "app/hooks/useColumnCount"
import { useViewerBookmarkedWorksQuery } from "interface/__generated__/react"
import { toColumnArray } from "interface/utils/toColumnArray"

export const ViewerBookmarkedWorkList: FC = () => {
  const { data = null, loading } = useViewerBookmarkedWorksQuery({
    variables: { offset: 0, limit: 9 * 6 },
  })

  const columnCount = useColumnCount()

  if (loading) {
    return <UserLoading />
  }

  if (data === null) {
    return null
  }

  const columns = toColumnArray(data.viewer.bookmarkedWorks, columnCount)

  if (data.viewer.bookmarkedWorks.length === 0) {
    return <AlertIntroductionBookmark />
  }

  return (
    <HStack w={"100%"} justifyContent={"center"}>
      <HStack alignItems={"flex-start"} spacing={4}>
        {columns.map((column, index) => (
          <Stack key={index} spacing={4}>
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
                isLiked={false}
                isBookmarked={false}
                isFollowee={false}
              />
            ))}
          </Stack>
        ))}
      </HStack>
    </HStack>
  )
}
