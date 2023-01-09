import { z } from "zod"

export const zPostMarkedAsPublicEventData = z.object({
  postId: z.string(),
  userId: z.string(),
})
