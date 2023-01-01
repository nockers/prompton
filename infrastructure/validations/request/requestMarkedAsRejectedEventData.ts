import { z } from "zod"

export const zRequestMarkedAsRejectedEventData = z.object({
  requestId: z.string(),
  recipientId: z.string(),
  senderId: z.string(),
})
