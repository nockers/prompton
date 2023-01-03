import { z } from "zod"

export const zUserRequestSettingsUpdatedEventData = z.object({
  userId: z.string(),
  isRequestable: z.boolean(),
  isRequestableForFree: z.boolean().optional(),
  maximumFee: z.number(),
  minimumFee: z.number(),
})
