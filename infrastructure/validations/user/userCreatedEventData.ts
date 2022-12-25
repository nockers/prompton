import { z } from "zod"

export const zUserCreatedEventData = z.object({
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  avatarImageURL: z.string().nullable(),
})
