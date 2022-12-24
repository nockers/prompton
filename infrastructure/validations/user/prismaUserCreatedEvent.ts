import { z } from "zod"

export const zPrismaUserCreatedEvent = z.object({
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  avatarImageURL: z.string().nullable(),
})
