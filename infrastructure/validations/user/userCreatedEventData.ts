import { z } from "zod"

export const zUserCreatedEventData = z.object({
  userId: z.string(),
  email: z.string().nullable(),
  name: z.string(),
  avatarImageURL: z.string().nullable(),
})
