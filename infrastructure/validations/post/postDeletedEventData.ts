import { z } from "zod"

export const zPostDeletedEventData = z.object({
  postId: z.string(),
  userId: z.string(),
})
