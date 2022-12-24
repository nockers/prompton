import { z } from "zod"

export const zPrismaNotificationCreatedEvent = z.object({
  notificationId: z.string(),
  userId: z.string(),
})
