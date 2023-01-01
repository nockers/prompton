import { z } from "zod"

export const zRequestMarkedAsAcceptedEventData = z.object({
  requestId: z.string(),
  paymentId: z.string().nullable(),
  senderId: z.string(),
  recipientId: z.string(),
})
