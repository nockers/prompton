import { z } from "zod"

export const zLikeCreatedEventData = z.object({
  likeId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
