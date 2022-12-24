import { z } from "zod"

export const zPrismaPostDeletedEvent = z.object({
  postId: z.string(),
  userId: z.string(),
})
