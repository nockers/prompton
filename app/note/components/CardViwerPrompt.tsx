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
import { BiClipboard, BiTrashAlt } from "react-icons/bi"

type Props = {
  text: string
  imageURL: string
  createdAt: number
  onDelete(): void
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
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 2, md: 2 }}
        alignItems={"flex-start"}
      >
        <Stack flex={1}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Button
                aria-label={"copy"}
                colorScheme={"primary"}
                size={"xs"}
                leftIcon={<Icon as={BiClipboard} fontSize={14} />}
                onClick={onCopyText}
              >
                {"コピー"}
              </Button>
              <Button
                aria-label={"copy"}
                size={"xs"}
                leftIcon={<Icon as={BiTrashAlt} fontSize={14} />}
                onClick={props.onDelete}
              >
                {"削除"}
              </Button>
            </HStack>
            <Text fontSize={"xs"}>
              {new Date(props.createdAt * 1000).toDateString()}
            </Text>
          </HStack>
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
          <Image borderRadius={"lg"} w={"80px"} src={props.imageURL} alt={""} />
          <Image borderRadius={"lg"} w={"80px"} src={props.imageURL} alt={""} />
        </HStack>
      </Stack>
    </Card>
  )
}
