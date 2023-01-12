import type { BlitzPage } from "@blitzjs/auth"
import {
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  Stack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import { MainLoading } from "app/components/MainLoading"
import { MainStackJA } from "app/components/MainStackJa"
import { useFileUpload } from "app/hooks/useFileUpload"
import RootLoading from "app/loading"
import { TagRequestStatus } from "app/requests/components/TagRequestStatus"
import ViewerLayout from "app/viewer/layout"

import {
  useCloseRequestMutation,
  useCreateDeliverableMutation,
  useDeleteWorkMutation,
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

  const [deleteWork] = useDeleteWorkMutation()

  const [closeRequest, { loading: isClosingRequest }] =
    useCloseRequestMutation()

  const {
    data = null,
    loading: isLoading,
    refetch,
  } = useRequestQuery({
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
              description: null,
              name: null,
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
      await refetch()
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

  const onDeleteWork = async (workId: string) => {
    try {
      if (requestId === null) return
      await deleteWork({
        variables: { input: { workId: workId } },
      })
      toast({
        title: "作品を削除しました",
        status: "success",
      })
      await refetch()
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  const onCloseRequest = async () => {
    try {
      if (requestId === null) return
      await closeRequest({
        variables: { input: { requestId: requestId } },
      })
      toast({
        title: "お疲れ様でした！リクエストを完了しました",
        status: "success",
      })
    } catch (error) {
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

  if (isClosingRequest) {
    return <MainLoading text={"リクエストを完了しています"} />
  }

  const isRecipient = data.request.recipient.id === appContext.currentUser?.uid

  const isEditable =
    isRecipient && !data.request.isCompleted && data.request.isAccepted

  const isSubmittable = isEditable && 0 < data.request.deliverables.length

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

          {isEditable && (
            <>
              <Stack spacing={4}>
                <Text>{"作品をアップロードしましょう。"}</Text>
                <HStack>
                  <UploadDropzone
                    isLoading={isUploading}
                    onChange={onUploadFiles}
                  />
                </HStack>
              </Stack>
            </>
          )}
          {isEditable && (
            <>
              {data.request.deliverables.map((post) => (
                <Stack key={post.id}>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"bold"}>{post.id}</Text>
                    <Button
                      size={"sm"}
                      colorScheme={"red"}
                      onClick={() => {
                        onDeleteWork(post.id)
                      }}
                    >
                      {"削除"}
                    </Button>
                  </HStack>
                  <Card
                    variant={"outlined"}
                    borderRadius={"xl"}
                    borderWidth={4}
                    overflow={"hidden"}
                  >
                    <Stack>
                      <Image alt={""} src={post.imageURL} />
                    </Stack>
                  </Card>
                </Stack>
              ))}
            </>
          )}
          {data.request.isCompleted && (
            <>
              {data.request.deliverables.map((post) => (
                <Stack key={post.id}>
                  <HStack justifyContent={"space-between"}>
                    <Button
                      as={"a"}
                      target={"_blank"}
                      href={post.imageURL}
                      size={"sm"}
                      rel="noreferrer"
                    >
                      {"ダウンロード"}
                    </Button>
                  </HStack>
                  <Card
                    variant={"outlined"}
                    borderRadius={"xl"}
                    borderWidth={4}
                    overflow={"hidden"}
                  >
                    <Stack>
                      <Image alt={""} src={post.imageURL} />
                    </Stack>
                  </Card>
                </Stack>
              ))}
            </>
          )}
          {isSubmittable && (
            <>
              <Divider />
              <Stack>
                <Text>
                  {"作品に問題が無ければリクエストを完了しましょう。"}
                </Text>
                <Button onClick={onCloseRequest}>
                  {"このリクエストを完了する"}
                </Button>
              </Stack>
            </>
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
