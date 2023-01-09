import { Tag } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  isPending: boolean
  isAccepted: boolean
  isRejected: boolean
  isCompleted: boolean
  isCanceled: boolean
  isCanceledBySender: boolean
  isCanceledByRecipient: boolean
  isTimeout: boolean
}

export const TagRequestStatus: FC<Props> = (props) => {
  if (props.isCompleted) {
    return (
      <Tag variant={"subtle"} colorScheme={"green"}>
        {"完了"}
      </Tag>
    )
  }

  if (props.isCanceled) {
    return (
      <Tag variant={"subtle"} colorScheme={"purple"}>
        {"キャンセル"}
      </Tag>
    )
  }

  if (props.isCanceledBySender) {
    return (
      <Tag variant={"subtle"} colorScheme={"red"}>
        {"キャンセル"}
      </Tag>
    )
  }

  if (props.isCanceledByRecipient) {
    return (
      <Tag variant={"subtle"} colorScheme={"red"}>
        {"キャンセル"}
      </Tag>
    )
  }

  if (props.isTimeout) {
    return (
      <Tag variant={"subtle"} colorScheme={"red"}>
        {"期限切れ"}
      </Tag>
    )
  }

  if (props.isAccepted) {
    return (
      <Tag variant={"subtle"} colorScheme={"blue"}>
        {"取り組み中"}
      </Tag>
    )
  }

  if (props.isRejected) {
    return (
      <Tag variant={"subtle"} colorScheme={"blue"}>
        {"見送り"}
      </Tag>
    )
  }

  return (
    <Tag variant={"subtle"} colorScheme={"blue"}>
      {"送信済み"}
    </Tag>
  )
}
