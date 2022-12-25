import { z } from "zod"

export const zNotificationCreatedEventData = z.object({
  notificationId: z.string(),
  userId: z.string(),
})
