import { z } from "zod"

export const zPrismaLabelCreatedEvent = z.object({
  labelId: z.string(),
  name: z.string(),
  nameJA: z.string().nullable(),
})
