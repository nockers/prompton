import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  likeId: z.instanceof(Id),
  userId: z.instanceof(Id),
  postId: z.instanceof(Id),
})

type Props = inferEventProps<typeof zProps>

export class LikeDeletedEvent extends PrototypeEvent implements Props {
  static readonly type = "LIKE_DELETED" as const

  get type() {
    return LikeDeletedEvent.type
  }

  readonly collectionId = "LIKES" as const

  readonly likeId!: Props["likeId"]

  readonly userId!: Props["userId"]

  readonly postId!: Props["postId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.likeId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
