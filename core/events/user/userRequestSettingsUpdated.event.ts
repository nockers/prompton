import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  userId: z.instanceof(Id),
  isRequestable: z.boolean(),
  maximumFee: z.number(),
  minimumFee: z.number(),
})

type Props = inferEventProps<typeof zProps>

export class UserRequestSettingsUpdatedEvent
  extends PrototypeEvent
  implements Props
{
  static readonly type = "USER_REQUEST_SETTINGS_UPDATED" as const

  get type() {
    return UserRequestSettingsUpdatedEvent.type
  }

  readonly collectionId = "USERS" as const

  readonly userId!: Props["userId"]

  readonly isRequestable!: Props["isRequestable"]

  readonly maximumFee!: Props["maximumFee"]

  readonly minimumFee!: Props["minimumFee"]

  constructor(props: Props) {
    super({ ...props, documentId: props.userId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
