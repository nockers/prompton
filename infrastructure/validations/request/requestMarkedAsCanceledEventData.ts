import { z } from "zod"

export const zRequestMarkedAsCanceledEventData = z.object({
  requestId: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
})
