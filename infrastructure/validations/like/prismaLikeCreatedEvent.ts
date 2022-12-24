import { z } from "zod"

export const zPrismaLikeCreatedEvent = z.object({
  likeId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
