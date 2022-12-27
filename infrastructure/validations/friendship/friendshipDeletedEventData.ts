import { z } from "zod"

export const zFriendshipDeletedEventData = z.object({
  friendshipId: z.string(),
  userId: z.string(),
  followeeId: z.string(),
  followerId: z.string(),
})
