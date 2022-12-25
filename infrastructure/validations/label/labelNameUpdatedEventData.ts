import { z } from "zod"

export const zLabelNameUpdatedEventData = z.object({
  labelId: z.string(),
  name: z.string(),
  nameJA: z.string().nullable(),
})
