import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  postId: z.instanceof(Id),
  userId: z.instanceof(Id),
  fileId: z.instanceof(Id),
})

type Props = inferEventProps<typeof zProps>

export class PostCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "POST_CREATED" as const

  get type() {
    return PostCreatedEvent.type
  }

  readonly collectionId = "POSTS" as const

  readonly postId!: Props["postId"]

  readonly userId!: Props["userId"]

  readonly fileId!: Props["fileId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.postId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
