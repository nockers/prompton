import { z } from "zod"

export const zRequestMarkedAsCompletedEventData = z.object({
  requestId: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
})
