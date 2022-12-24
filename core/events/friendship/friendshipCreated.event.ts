import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  friendshipId: z.instanceof(Id),
  userId: z.instanceof(Id),
  followerId: z.instanceof(Id),
})

type Props = inferEventProps<typeof zProps>

export class FriendshipCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "FRIENDSHIP_CREATED" as const

  get type() {
    return FriendshipCreatedEvent.type
  }

  readonly collectionId = "FRIENDSHIPS"

  readonly friendshipId!: Props["friendshipId"]

  readonly userId!: Props["userId"]

  readonly followerId!: Props["followerId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.friendshipId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
