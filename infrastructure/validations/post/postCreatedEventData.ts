import { z } from "zod"

export const zPostCreatedEventData = z.object({
  postId: z.string(),
  userId: z.string(),
  fileId: z.string(),
})
