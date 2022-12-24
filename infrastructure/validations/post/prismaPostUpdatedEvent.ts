import { z } from "zod"

export const zPrismaPostUpdatedEvent = z.object({
  postId: z.string(),
  userId: z.string(),
  title: z.string(),
  prompt: z.string(),
})
