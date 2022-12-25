import type { z } from "zod"
import type { zNotificationCreatedEventData } from "infrastructure/validations/notification/notificationCreatedEventData"

export type NotificationEventData = z.infer<
  typeof zNotificationCreatedEventData
>
