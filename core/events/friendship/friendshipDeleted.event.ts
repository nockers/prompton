import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  friendshipId: z.instanceof(Id),
  userId: z.instanceof(Id),
  followerId: z.instanceof(Id),
  followeeId: z.instanceof(Id),
})

type Props = inferEventProps<typeof zProps>

export class FriendshipDeletedEvent extends PrototypeEvent implements Props {
  static readonly type = "FRIENDSHIP_DELETED" as const

  get type() {
    return FriendshipDeletedEvent.type
  }

  readonly collectionId = "FRIENDSHIPS" as const

  readonly friendshipId!: Props["friendshipId"]

  readonly userId!: Props["userId"]

  readonly followerId!: Props["followerId"]

  readonly followeeId!: Props["followeeId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.friendshipId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
