import { z } from "zod"

export const zPrismaFriendshipCreatedEvent = z.object({
  friendshipId: z.string(),
  userId: z.string(),
  followerId: z.string(),
})
