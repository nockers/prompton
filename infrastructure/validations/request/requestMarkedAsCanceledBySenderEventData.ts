import { z } from "zod"

export const zRequestMarkedAsCanceledBySenderEventData = z.object({
  requestId: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
})
