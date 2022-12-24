import { z } from "zod"

export const zPrismaPostCreatedEvent = z.object({
  postId: z.string(),
  userId: z.string(),
  fileId: z.string(),
})
