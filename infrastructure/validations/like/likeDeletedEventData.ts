import { z } from "zod"

export const zLikeDeletedEventData = z.object({
  likeId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
