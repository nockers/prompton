import { z } from "zod"

export const zPrismaBookmarkDeletedEvent = z.object({
  bookmarkId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
