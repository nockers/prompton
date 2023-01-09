import { HStack, Stack, useToast } from "@chakra-ui/react"
import type { FC } from "react"
import { useContext, useState } from "react"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import UserLoading from "app/[login]/loading"
import { CardUserWork } from "app/components/CardUserWork"
import { useColumnCount } from "app/hooks/useColumnCount"
import { useFileUpload } from "app/hooks/useFileUpload"
import {
  useCreateWorkMutation,
  useViewerWorksQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

export const ViewerWorkList: FC = () => {
  const appContext = useContext(AppContext)

  const [isLoading, setLoading] = useState(false)

  const [createWork] = useCreateWorkMutation()

  const {
    data = null,
    loading,
    refetch,
  } = useViewerWorksQuery({ variables: { offset: 0, limit: 9 * 6 } })

  const [uploadFile] = useFileUpload()

  const columnCount = useColumnCount()

  const toast = useToast()

  const onUploadFiles = async (files: File[]) => {
    try {
      setLoading(true)
      const id = toast({
        title: `${files.length}件の画像を投稿しています`,
        isClosable: false,
      })
      for (const file of Array.from(files)) {
        const fileId = await uploadFile(file)
        await createWork({
          variables: {
            input: {
              fileId: fileId,
              fileName: file.name,
            },
          },
        })
      }
      toast.close(id)
      toast({
        title: "投稿が完了しました！",
        status: "success",
      })
      setLoading(false)
      await refetch()
    } catch (error) {
      console.error(error)
      setLoading(false)
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  if (loading) {
    return <UserLoading />
  }

  if (data === null) {
    return null
  }

  const columns = toColumnArray(data.viewer.works, columnCount)

  return (
    <Stack spacing={4}>
      <HStack>
        <UploadDropzone isLoading={isLoading} onChange={onUploadFiles} />
      </HStack>
      <HStack alignItems={"flex-start"} spacing={4} w={"100%"}>
        {columns.map((column, index) => (
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
    </Stack>
  )
}
