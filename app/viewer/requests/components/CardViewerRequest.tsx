import { Card, HStack, Stack, Text } from "@chakra-ui/react"
import type { FC } from "react"
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
}

export const CardViewerRequest: FC<Props> = (props) => {
  return (
    <Card
      variant={"filled"}
      borderRadius={"xl"}
      borderColor={"primary.100"}
      borderWidth={4}
    >
      <Stack p={{ base: 4, md: 4 }} spacing={0}>
        <HStack justifyContent={"space-between"}>
          <Text opacity={0.8} fontSize={"sm"}>
            {toDateText(props.createdAt)}
          </Text>
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
        <Stack spacing={0}>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"primary.500"}>
            {`${props.fee}円`}
          </Text>
          <Text>{"Twitterのアイコンを作成してください！"}</Text>
        </Stack>
      </Stack>
    </Card>
  )
}
