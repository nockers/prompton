import { z } from "zod"

export const zPaymentCreatedEventData = z.object({
  paymentId: z.string(),
  userId: z.string(),
  requestId: z.string().nullable(),
  purpose: z.string(),
  amount: z.number(),
  isError: z.boolean(),
  transactionId: z.string().nullable(),
})
