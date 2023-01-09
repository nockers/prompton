import { Button, Card, HStack, Icon, Stack, Tag, Text } from "@chakra-ui/react"
import type { FC } from "react"
import { BiRightArrowAlt } from "react-icons/bi"
import { TagRequestStatus } from "app/requests/components/TagRequestStatus"
import { toDateText } from "interface/utils/toDateText"

type Props = {
  fee: number
  createdAt: number
  isPending: boolean
  isAccepted: boolean
  isRejected: boolean
  isCompleted: boolean
  isCanceled: boolean
  isCanceledBySender: boolean
  isCanceledByRecipient: boolean
  isTimeout: boolean
  onAccept(): void
  onReject(): void
  onOpen(): void
}

export const CardViewerReceivedRequest: FC<Props> = (props) => {
  return (
    <Card
      variant={"filled"}
      borderRadius={"xl"}
      borderColor={"primary.200"}
      borderWidth={4}
    >
      <Stack p={{ base: 4, md: 4 }} spacing={2}>
        <Stack spacing={2}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Tag variant={"subtle"} colorScheme={"primary"}>
                {"受け取った"}
              </Tag>
              <TagRequestStatus
                isPending={props.isPending}
                isAccepted={props.isAccepted}
                isRejected={props.isRejected}
                isCompleted={props.isCompleted}
                isCanceled={props.isCanceled}
                isCanceledBySender={props.isCanceledBySender}
                isCanceledByRecipient={props.isCanceledByRecipient}
                isTimeout={props.isTimeout}
              />
            </HStack>
            <Text opacity={0.8} fontSize={"sm"}>
              {toDateText(props.createdAt)}
            </Text>
          </HStack>
          <Stack spacing={0}>
            <Stack spacing={0}>
              <Text fontSize={"2xl"} fontWeight={"bold"} color={"primary.500"}>
                {`${props.fee}円`}
              </Text>
              <Text>{"Twitterのアイコンを作成してください！"}</Text>
            </Stack>
          </Stack>
          <HStack spacing={2} justifyContent={"flex-end"}>
            {props.isPending && (
              <Button size={"sm"} onClick={props.onReject}>
                {"見送る"}
              </Button>
            )}
            {props.isPending && (
              <Button
                size={"sm"}
                colorScheme={"primary"}
                onClick={props.onAccept}
              >
                {"この依頼を受ける"}
              </Button>
            )}
            <Button
              rightIcon={<Icon as={BiRightArrowAlt} />}
              size={"sm"}
              colorScheme={"primary"}
              onClick={props.onOpen}
            >
              {"確認する"}
            </Button>
          </HStack>
        </Stack>
      </Stack>
    </Card>
  )
}
