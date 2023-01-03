import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Email, Id, Name, Url } from "core/valueObjects"

const zProps = z.object({
  userId: z.instanceof(Id),
  email: z.instanceof(Email).nullable(),
  name: z.instanceof(Name),
  avatarImageURL: z.instanceof(Url).nullable(),
})

type Props = inferEventProps<typeof zProps>

export class UserCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "USER_CREATED" as const

  get type() {
    return UserCreatedEvent.type
  }

  readonly collectionId = "USERS" as const

  readonly userId!: Props["userId"]

  readonly email!: Props["email"]

  readonly name!: Props["name"]

  readonly avatarImageURL!: Props["avatarImageURL"]

  constructor(props: Props) {
    super({ ...props, documentId: props.userId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
