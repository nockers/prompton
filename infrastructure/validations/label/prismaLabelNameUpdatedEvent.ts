import { z } from "zod"

export const zPrismaLabelNameUpdatedEvent = z.object({
  labelId: z.string(),
  name: z.string(),
  nameJA: z.string().nullable(),
})
