import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { NotificationEvent } from "core"
import { NotificationCreatedEvent, Id } from "core"
import type { NotificationEventData } from "infrastructure/validations"
import { zNotificationCreatedEventData } from "infrastructure/validations"

export class NotificationEventConverter {
  static toData(event: NotificationEvent): NotificationEventData {
    if (event instanceof NotificationCreatedEvent) {
      const data: z.infer<typeof zNotificationCreatedEventData> = {
        notificationId: event.notificationId.value,
        userId: event.userId.value,
      }
      return zNotificationCreatedEventData.parse(data)
    }

    throw new Error()
  }

  static toEntity(event: Event): NotificationEvent {
    if (event.type === NotificationCreatedEvent.type) {
      const data = zNotificationCreatedEventData.parse(event.data)
      return new NotificationCreatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        notificationId: new Id(data.notificationId),
        userId: new Id(data.userId),
      })
    }

    throw new Error()
  }
}
