import { z } from "zod"

export const zPrismaBookmarkCreatedEvent = z.object({
  bookmarkId: z.string(),
  userId: z.string(),
  postId: z.string(),
})
