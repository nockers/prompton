import { HStack, Stack } from "@chakra-ui/react"
import type { FC } from "react"
import { useContext } from "react"
import { AlertIntroductionLike } from "app/[login]/components/AlertIntroductionLike"
import UserLoading from "app/[login]/loading"
import { CardUserWork } from "app/components/CardUserWork"
import { useColumnCount } from "app/hooks/useColumnCount"
import { useViewerLikedWorksQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

export const ViewerLikedWorkList: FC = () => {
  const appContext = useContext(AppContext)

  const { data = null, loading } = useViewerLikedWorksQuery({
    variables: { offset: 0, limit: 9 * 6 },
  })

  const columnCount = useColumnCount()

  if (loading) {
    return <UserLoading />
  }

  if (data === null) {
    return null
  }

  const columns = toColumnArray(data.viewer.likedWorks, columnCount)

  if (data.viewer.likedWorks.length === 0) {
    return <AlertIntroductionLike />
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
                  label.name,
                  label.nameJA || label.name,
                  label.count,
                ])}
                postColors={work.colors}
                postWebColors={work.webColors}
                postThumbnailURL={work.thumbnailURL}
                isEditable={work.user.id === appContext.currentUser?.uid}
                isLiked={false}
                isBookmarked={false}
                isFollowee={false}
                isLoggedIn={appContext.currentUser !== null}
              />
            ))}
          </Stack>
        ))}
      </HStack>
    </HStack>
  )
}
