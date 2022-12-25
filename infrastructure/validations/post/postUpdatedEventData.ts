import { z } from "zod"

export const zPostUpdatedEventData = z.object({
  postId: z.string(),
  userId: z.string(),
  title: z.string().nullable(),
  prompt: z.string().nullable(),
})
