import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  requestId: z.instanceof(Id),
  paymentId: z.instanceof(Id).nullable(),
  senderId: z.instanceof(Id),
  recipientId: z.instanceof(Id),
  folderId: z.instanceof(Id).nullable(),
  fileIds: z.array(z.instanceof(Id)),
  title: z.string().nullable(),
  note: z.string().nullable(),
  fee: z.number(),
  planId: z.instanceof(Id).nullable(),
  commission: z.number(),
})

type Props = inferEventProps<typeof zProps>

export class RequestCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "REQUEST_CREATED" as const

  get type() {
    return RequestCreatedEvent.type
  }

  readonly collectionId = "REQUESTS" as const

  readonly requestId!: Props["requestId"]

  readonly paymentId!: Props["paymentId"]

  readonly senderId!: Props["senderId"]

  readonly recipientId!: Props["recipientId"]

  readonly folderId!: Props["folderId"]

  readonly fileIds!: Props["fileIds"]

  readonly title!: Props["title"]

  readonly note!: Props["note"]

  readonly fee!: Props["fee"]

  readonly commission!: Props["commission"]

  readonly planId!: Props["planId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.requestId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
