import { z } from "zod"

export const zUserProfileUpdatedEventData = z.object({
  userId: z.string(),
  name: z.string(),
  biography: z.string(),
  headerImageId: z.string().nullable(),
  avatarImageURL: z.string().nullable(),
  avatarImageId: z.string().nullable(),
})
