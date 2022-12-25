import { z } from "zod"

export const zUserLoginUpdatedEventData = z.object({
  userId: z.string(),
  login: z.string(),
})
