import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { NotificationEvent } from "core"
import { NotificationCreatedEvent, Id } from "core"
import type { PrismaNotificationEvent } from "infrastructure/validations"
import { zPrismaNotificationCreatedEvent } from "infrastructure/validations"

export class NotificationEventConverter {
  static toData(event: NotificationEvent): PrismaNotificationEvent {
    if (event.type === NotificationCreatedEvent.type) {
      const data: z.infer<typeof zPrismaNotificationCreatedEvent> = {
        notificationId: event.notificationId.value,
        userId: event.userId.value,
      }
      return zPrismaNotificationCreatedEvent.parse(data)
    }

    throw new Error()
  }

  static toEntity(event: Event): NotificationEvent {
    if (event.type === NotificationCreatedEvent.type) {
      const data = zPrismaNotificationCreatedEvent.parse(event.data)
      return new NotificationCreatedEvent({
        id: new Id(event.id),
        notificationId: new Id(data.notificationId),
        userId: new Id(data.userId),
      })
    }

    throw new Error()
  }
}
