import { z } from "zod"

export const zUserRequestSettingsUpdatedEventData = z.object({
  userId: z.string(),
  isRequestable: z.boolean(),
  maximumFee: z.number(),
  minimumFee: z.number(),
})
