import {
  Box,
  Button,
  Card,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react"
import type { FC } from "react"
import { BiClipboard, BiEdit, BiTrashAlt } from "react-icons/bi"

type Props = {
  text: string
  imageURL: string
  createdAt: number
  onDelete(): void
  onEdit(): void
}

export const CardViewerPrompt: FC<Props> = (props) => {
  const { onCopy } = useClipboard(props.text)

  const toast = useToast()

  const onCopyText = () => {
    toast({ description: "プロンプトをコピーしました" })
    onCopy()
  }

  return (
    <Card variant={"filled"} p={2} borderRadius={"xl"}>
      <Stack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"xs"} fontWeight={"bold"}>
            {new Date(props.createdAt * 1000).toLocaleString()}
          </Text>
          <HStack>
            <Button
              aria-label={"copy"}
              size={"xs"}
              leftIcon={<Icon as={BiTrashAlt} fontSize={14} />}
              onClick={props.onDelete}
            >
              {"削除"}
            </Button>
            <Button
              aria-label={"copy"}
              size={"xs"}
              leftIcon={<Icon as={BiEdit} fontSize={14} />}
              onClick={props.onEdit}
            >
              {"編集"}
            </Button>
            <Button
              aria-label={"copy"}
              colorScheme={"primary"}
              size={"xs"}
              leftIcon={<Icon as={BiClipboard} fontSize={14} />}
              onClick={onCopyText}
            >
              {"コピー"}
            </Button>
          </HStack>
        </HStack>
        <HStack alignItems={"flex-start"}>
          <Stack flex={1} w={"100%"}>
            <Box bg={"blackAlpha.200"} px={1} borderRadius={"md"}>
              <Text
                display={"inline"}
                whiteSpace={"pre-wrap"}
                wordBreak={"break-all"}
              >
                {props.text}
              </Text>
            </Box>
          </Stack>
          <HStack>
            <Image
              borderRadius={"lg"}
              w={"80px"}
              src={props.imageURL}
              alt={""}
            />
            <Image
              borderRadius={"lg"}
              w={"80px"}
              src={props.imageURL}
              alt={""}
            />
          </HStack>
        </HStack>
      </Stack>
    </Card>
  )
}
