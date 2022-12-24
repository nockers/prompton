import { z } from "zod"

export const zPrismaFriendshipDeletedEvent = z.object({
  friendshipId: z.string(),
  userId: z.string(),
  followerId: z.string(),
})
