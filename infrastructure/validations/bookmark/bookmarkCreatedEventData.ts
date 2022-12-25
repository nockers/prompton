import { z } from "zod"

export const zBookmarkCreatedEventData = z.object({
  bookmarkId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
