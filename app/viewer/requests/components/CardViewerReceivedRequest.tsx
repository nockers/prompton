import { Button, Card, HStack, Stack, Text } from "@chakra-ui/react"
import type { FC } from "react"
import { TagRequestStatus } from "app/requests/components/TagRequestStatus"

type Props = {
  fee: number
  createdAt: number
  isPending: boolean
  isAccepted: boolean
  isRejected: boolean
  isCompleted: boolean
  isCanceled: boolean
  isCanceledBySystem: boolean
  isCanceledByCreator: boolean
  isTimeout: boolean
}

export const CardViewerReceivedRequest: FC<Props> = (props) => {
  return (
    <Card
      variant={"filled"}
      borderRadius={"xl"}
      borderColor={"primary.100"}
      borderWidth={4}
    >
      <Stack p={{ base: 4, md: 4 }} spacing={2}>
        <Stack spacing={0}>
          <HStack justifyContent={"space-between"}>
            <Text opacity={0.8} fontSize={"sm"}>
              {"2020年1月1日"}
            </Text>
            <TagRequestStatus
              isPending={props.isPending}
              isAccepted={props.isAccepted}
              isRejected={props.isRejected}
              isCompleted={props.isCompleted}
              isCanceled={props.isCanceled}
              isCanceledBySystem={props.isCanceledBySystem}
              isCanceledByCreator={props.isCanceledByCreator}
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
        <HStack spacing={2} justifyContent={"flex-end"}>
          {props.isPending && (
            <Button size={"sm"} colorScheme={"gray"}>
              {"見送る"}
            </Button>
          )}
          {props.isPending && (
            <Button size={"sm"} colorScheme={"primary"}>
              {"この依頼を受ける"}
            </Button>
          )}
          {props.isRejected && (
            <Button size={"sm"} colorScheme={"primary"}>
              {"この依頼を受ける"}
            </Button>
          )}
        </HStack>
      </Stack>
    </Card>
  )
}
