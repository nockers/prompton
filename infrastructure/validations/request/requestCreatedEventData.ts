import { z } from "zod"

export const zRequestCreatedEventData = z.object({
  requestId: z.string(),
  paymentId: z.string().nullable(),
  senderId: z.string(),
  recipientId: z.string(),
  folderId: z.string().nullable(),
  fileIds: z.array(z.string()),
  title: z.string().nullable(),
  note: z.string().nullable(),
  fee: z.number(),
  planId: z.string().nullable(),
  commission: z.number(),
})
