import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  bookmarkId: z.instanceof(Id),
  userId: z.instanceof(Id),
  postId: z.instanceof(Id),
})

type Props = inferEventProps<typeof zProps>

export class BookmarkCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "BOOKMARK_CREATED" as const

  get type() {
    return BookmarkCreatedEvent.type
  }

  readonly collectionId = "BOOKMARKS" as const

  readonly bookmarkId!: Props["bookmarkId"]

  readonly userId!: Props["userId"]

  readonly postId!: Props["postId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.bookmarkId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
