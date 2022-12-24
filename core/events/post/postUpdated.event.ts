import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  postId: z.instanceof(Id),
  userId: z.instanceof(Id),
  title: z.string(),
  prompt: z.string(),
})

type Props = inferEventProps<typeof zProps>

export class PostUpdatedEvent extends PrototypeEvent implements Props {
  static readonly type = "POST_UPDATED" as const

  get type() {
    return PostUpdatedEvent.type
  }

  readonly collectionId = "POSTS"

  readonly postId!: Props["postId"]

  readonly userId!: Props["userId"]

  readonly title!: Props["title"]

  readonly prompt!: Props["prompt"]

  constructor(props: Props) {
    super({ ...props, documentId: props.postId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
