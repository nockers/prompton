import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Text,
  DrawerHeader,
  DrawerBody,
  Image,
  Stack,
  Card,
  HStack,
  IconButton,
  Icon,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react"
import type { FC } from "react"
import { useState } from "react"
import { BiX } from "react-icons/bi"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import { useFileUpload } from "app/hooks/useFileUpload"
import type { PromptWorkFieldsFragment } from "interface/__generated__/react"
import { useCreatePromptWorkMutation } from "interface/__generated__/react"

type Props = {
  promptId: string
  promptText: string
  isOpen: boolean
  works: PromptWorkFieldsFragment[]
  onClose(): void
  onDelete(): void
}

export const DrawerViewerPrompt: FC<Props> = (props) => {
  const [uploadFile] = useFileUpload()

  const [isUploading, setUploading] = useState(false)

  const [createPromptWork] = useCreatePromptWorkMutation()

  const toast = useToast()

  const onUploadFiles = async (files: File[]) => {
    try {
      setUploading(true)
      const id = toast({
        title: `${files.length}件の画像を投稿しています`,
        isClosable: false,
      })
      for (const file of Array.from(files)) {
        const fileId = await uploadFile(file)
        await createPromptWork({
          variables: {
            input: {
              fileId: fileId,
              fileName: file.name,
              isPublic: false,
              promptId: props.promptId,
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

  return (
    <Drawer
      isOpen={props.isOpen}
      size={"full"}
      placement={"right"}
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <HStack justifyContent={"space-between"}>
            <Text>{"Create your account"}</Text>
            <IconButton
              size={"sm"}
              icon={<Icon as={BiX} />}
              aria-label={""}
              onClick={props.onClose}
            />
          </HStack>
        </DrawerHeader>
        <DrawerBody pt={0} pb={6}>
          <Stack spacing={4}>
            <Card variant={"filled"} p={4}>
              <Text>{props.promptText}</Text>
            </Card>
            <UploadDropzone isLoading={isUploading} onChange={onUploadFiles} />
            <Stack divider={<Divider />} spacing={4}>
              {props.works.map((work) => (
                <Stack key={work.id}>
                  <HStack justifyContent={"space-between"}>
                    <Text>{work.id}</Text>
                    <Button size={"sm"} onClick={props.onDelete}>
                      {"削除"}
                    </Button>
                  </HStack>
                  <Image
                    borderRadius={"lg"}
                    w={"100%"}
                    src={work.imageURL}
                    alt={""}
                  />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
