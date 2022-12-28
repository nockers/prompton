import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  notificationId: z.instanceof(Id),
  userId: z.instanceof(Id),
})

type Props = inferEventProps<typeof zProps>

export class NotificationCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "NOTIFICATION_CREATED" as const

  get type() {
    return NotificationCreatedEvent.type
  }

  readonly collectionId = "NOTIFICATIONS" as const

  readonly notificationId!: Props["notificationId"]

  readonly userId!: Props["userId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.notificationId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
