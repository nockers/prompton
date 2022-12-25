import { z } from "zod"

export const zLabelCreatedEventData = z.object({
  labelId: z.string(),
  name: z.string(),
  nameJA: z.string().nullable(),
})
