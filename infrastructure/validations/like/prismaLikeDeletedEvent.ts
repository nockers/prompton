import { z } from "zod"

export const zPrismaLikeDeletedEvent = z.object({
  likeId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
