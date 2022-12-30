import { Tag } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  isPending: boolean
  isAccepted: boolean
  isRejected: boolean
  isCompleted: boolean
  isCanceled: boolean
  isCanceledBySystem: boolean
  isCanceledByCreator: boolean
  isTimeout: boolean
}

export const TagRequestStatus: FC<Props> = (props) => {
  if (props.isAccepted) {
    return (
      <Tag variant={"subtle"} colorScheme={"gray"}>
        {"取り組み中"}
      </Tag>
    )
  }

  if (props.isRejected) {
    return (
      <Tag variant={"subtle"} colorScheme={"purple"}>
        {"見送り"}
      </Tag>
    )
  }

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

  if (props.isCanceledBySystem) {
    return (
      <Tag variant={"subtle"} colorScheme={"red"}>
        {"キャンセル"}
      </Tag>
    )
  }

  if (props.isCanceledByCreator) {
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

  return (
    <Tag variant={"subtle"} colorScheme={"red"}>
      {"確認待ち"}
    </Tag>
  )
}
