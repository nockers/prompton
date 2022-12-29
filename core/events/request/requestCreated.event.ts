import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  requestId: z.instanceof(Id),
  paymentId: z.instanceof(Id).nullable(),
  userId: z.instanceof(Id),
  creatorId: z.instanceof(Id),
  folderId: z.instanceof(Id).nullable(),
  fileIs: z.array(z.instanceof(Id)),
  title: z.string().nullable(),
  note: z.string().nullable(),
  fee: z.number(),
  planId: z.instanceof(Id),
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

  readonly userId!: Props["userId"]

  readonly paymentId!: Props["paymentId"]

  readonly creatorId!: Props["creatorId"]

  readonly folderId!: Props["folderId"]

  readonly fileIs!: Props["fileIs"]

  readonly title!: Props["title"]

  readonly note!: Props["note"]

  readonly fee!: Props["fee"]

  readonly commission!: Props["commission"]

  readonly planId!: Props["planId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.paymentId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
