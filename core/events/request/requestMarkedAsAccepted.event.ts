import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  requestId: z.instanceof(Id),
  paymentId: z.instanceof(Id).nullable(),
  senderId: z.instanceof(Id),
  recipientId: z.instanceof(Id),
})

type Props = inferEventProps<typeof zProps>

export class RequestMarkedAsAcceptedEvent
  extends PrototypeEvent
  implements Props
{
  static readonly type = "REQUEST_MARKED_AS_ACCEPTED" as const

  get type() {
    return RequestMarkedAsAcceptedEvent.type
  }

  readonly collectionId = "REQUESTS" as const

  readonly requestId!: Props["requestId"]

  readonly senderId!: Props["senderId"]

  readonly recipientId!: Props["recipientId"]

  readonly paymentId!: Props["paymentId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.requestId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
