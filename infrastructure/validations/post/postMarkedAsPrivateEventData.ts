import { z } from "zod"

export const zPostMarkedAsPrivateEventData = z.object({
  postId: z.string(),
  userId: z.string(),
})
