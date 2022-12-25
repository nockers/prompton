import { z } from "zod"

export const zBookmarkDeletedEventData = z.object({
  bookmarkId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
