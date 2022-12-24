import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Biography, Id, Name, Url } from "core/valueObjects"

const zProps = z.object({
  userId: z.instanceof(Id),
  name: z.instanceof(Name),
  biography: z.instanceof(Biography),
  headerImageId: z.instanceof(Id).nullable(),
  avatarImageURL: z.instanceof(Url).nullable(),
  avatarImageId: z.instanceof(Id).nullable(),
})

type Props = inferEventProps<typeof zProps>

export class UserProfileUpdatedEvent extends PrototypeEvent implements Props {
  static readonly type = "USER_PROFILE_UPDATED" as const

  get type() {
    return UserProfileUpdatedEvent.type
  }

  readonly collectionId = "USERS"

  readonly userId!: Props["userId"]

  readonly name!: Props["name"]

  readonly biography!: Props["biography"]

  readonly headerImageId!: Props["headerImageId"]

  readonly avatarImageURL!: Props["avatarImageURL"]

  readonly avatarImageId!: Props["avatarImageId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.userId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
