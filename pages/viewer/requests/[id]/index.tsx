import type { BlitzPage } from "@blitzjs/auth"
import {
  Button,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import { MainStackJA } from "app/components/MainStackJa"
import { useFileUpload } from "app/hooks/useFileUpload"
import RootLoading from "app/loading"
import { TagRequestStatus } from "app/requests/components/TagRequestStatus"
import ViewerLayout from "app/viewer/layout"

import {
  useCreateDeliverableMutation,
  useRequestQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toDateText } from "interface/utils/toDateText"

const ViewerRequestPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const requestId = router.query.id?.toString() ?? null

  const [isUploading, setUploading] = useState(false)

  const [createDeliverable] = useCreateDeliverableMutation()

  const { data = null, loading: isLoading } = useRequestQuery({
    skip: appContext.currentUser === null || requestId === null,
    variables: { id: requestId! },
  })

  const [uploadFile] = useFileUpload()

  const toast = useToast()

  const onUploadFiles = async (files: File[]) => {
    try {
      if (requestId === null) return
      setUploading(true)
      const id = toast({
        title: `${files.length}件の画像を投稿しています`,
        isClosable: false,
      })
      for (const file of Array.from(files)) {
        const fileId = await uploadFile(file)
        await createDeliverable({
          variables: {
            input: {
              requestId: requestId,
              fileId: fileId,
            },
          },
        })
      }
      toast.close(id)
      toast({
        title: "投稿が完了しました！",
        status: "success",
      })
      setUploading(false)
      // await refetch()
    } catch (error) {
      setUploading(false)
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  if (isLoading) {
    return <RootLoading />
  }

  if (data === null || data.request === null) {
    return null
  }

  const isRecipient = data.request.recipient.id === appContext.currentUser?.uid

  return (
    <MainStackJA pageTitle={"リクエスト"} pageDescription={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack
          pt={{ base: 4, md: 8 }}
          w={"100%"}
          maxW={"container.md"}
          spacing={{ base: 4, md: 8 }}
        >
          <HStack>
            <Link href={"/viewer/requests"}>
              <Button size={"sm"} leftIcon={<Icon as={BiArrowBack} />}>
                {"戻る"}
              </Button>
            </Link>
          </HStack>
          <Divider />
          <Stack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                {"リクエスト"}
              </Text>

              <TagRequestStatus
                isPending={data.request.isPending}
                isAccepted={data.request.isAccepted}
                isRejected={data.request.isRejected}
                isCompleted={data.request.isCompleted}
                isCanceled={data.request.isCanceled}
                isCanceledBySender={data.request.isCanceledBySender}
                isCanceledByRecipient={data.request.isCanceledByRecipient}
                isTimeout={data.request.isTimeout}
              />
            </HStack>
            <Text>{`${toDateText(data.request.createdAt)} 作成`}</Text>
            <Text fontSize={"sm"}>{`ID: ${data.request.id}`}</Text>
          </Stack>
          <Divider />
          <Stack spacing={2}>
            <Text>{data.request.note}</Text>
          </Stack>
          <Divider />
          {isRecipient && (
            <Stack spacing={4}>
              <Text fontWeight={"bold"}>{"納品する"}</Text>
              <HStack>
                <UploadDropzone
                  isLoading={isUploading}
                  onChange={onUploadFiles}
                />
              </HStack>
            </Stack>
          )}
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

ViewerRequestPage.getLayout = (page) => {
  return <ViewerLayout>{page}</ViewerLayout>
}

export default ViewerRequestPage
