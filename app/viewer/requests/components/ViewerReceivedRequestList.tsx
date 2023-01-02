import { Stack, Text, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { FC } from "react"
import { CardViewerReceivedRequest } from "app/viewer/requests/components/CardViewerReceivedRequest"
import {
  useAcceptRequestMutation,
  useRejectRequestMutation,
  useViewerReceivedRequestsQuery,
} from "interface/__generated__/react"

type Props = {}

export const ViewerReceivedRequestList: FC<Props> = () => {
  const router = useRouter()

  const { data = null, refetch } = useViewerReceivedRequestsQuery()

  const [acceptRequest] = useAcceptRequestMutation()

  const [rejectRequest] = useRejectRequestMutation()

  const toast = useToast()

  const onAccept = async (requestId: string) => {
    try {
      await acceptRequest({
        variables: { input: { requestId: requestId } },
      })
      await refetch()
      toast({ status: "success", description: "リクエストを承認しました。" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onReject = async (requestId: string) => {
    try {
      await rejectRequest({
        variables: { input: { requestId: requestId } },
      })
      await refetch()
      toast({ status: "success", description: "リクエストを見送りました。" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onOpen = async (requestId: string) => {
    router.push(`/viewer/requests/${requestId}`)
  }

  if (data === null) {
    return null
  }

  const count = data?.viewer.receivedRequests.length ?? 0

  if (count === 0) {
    return (
      <Stack>
        <Text>{"まだリクエストがありません。"}</Text>
      </Stack>
    )
  }

  return (
    <Stack spacing={4}>
      {data.viewer?.receivedRequests.map((request) => (
        <CardViewerReceivedRequest
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
          onAccept={() => {
            onAccept(request.id)
          }}
          onReject={() => {
            onReject(request.id)
          }}
          onOpen={() => {
            onOpen(request.id)
          }}
        />
      ))}
    </Stack>
  )
}
