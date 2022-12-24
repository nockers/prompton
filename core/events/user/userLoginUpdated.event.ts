import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id, Username } from "core/valueObjects"

const zProps = z.object({
  userId: z.instanceof(Id),
  login: z.instanceof(Username),
})

type Props = inferEventProps<typeof zProps>

export class UserLoginUpdatedEvent extends PrototypeEvent implements Props {
  static readonly type = "USER_LOGIN_UPDATED" as const

  get type() {
    return UserLoginUpdatedEvent.type
  }

  readonly collectionId = "USERS"

  readonly userId!: Props["userId"]

  readonly login!: Props["login"]

  constructor(props: Props) {
    super({ ...props, documentId: props.userId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
