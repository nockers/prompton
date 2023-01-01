import { z } from "zod"

export const zRequestMarkedAsCanceledByRecipientEventData = z.object({
  requestId: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
})
