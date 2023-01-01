import { Stack, Text } from "@chakra-ui/react"
import type { FC } from "react"
import { CardViewerRequest } from "app/viewer/requests/components/CardViewerRequest"
import { useViewerSentRequestsQuery } from "interface/__generated__/react"

type Props = {}

export const ViewerSentRequestList: FC<Props> = () => {
  const { data = null } = useViewerSentRequestsQuery()

  if (data === null) {
    return null
  }

  const count = data?.viewer.sentRequests.length ?? 0

  if (count === 0) {
    return (
      <Stack>
        <Text>{"まだリクエストがありません。"}</Text>
      </Stack>
    )
  }

  return (
    <Stack spacing={4}>
      {data.viewer?.sentRequests.map((request) => (
        <CardViewerRequest
          key={request.id}
          fee={request.fee}
          createdAt={request.createdAt}
          isPending={request.isPending}
          isAccepted={request.isAccepted}
          isRejected={request.isRejected}
          isCompleted={request.isCompleted}
          isCanceled={request.isCanceled}
          isCanceledBySender={request.isCanceledBySender}
          isCanceledByRecipient={request.isCanceledByRecipient}
          isTimeout={request.isTimeout}
        />
      ))}
    </Stack>
  )
}
