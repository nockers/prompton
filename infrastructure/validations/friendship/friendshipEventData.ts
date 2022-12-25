import type { z } from "zod"
import type { zFriendshipCreatedEventData } from "infrastructure/validations/friendship/friendshipCreatedEventData"
import type { zFriendshipDeletedEventData } from "infrastructure/validations/friendship/friendshipDeletedEventData"

export type FriendshipEventData =
  | z.infer<typeof zFriendshipCreatedEventData>
  | z.infer<typeof zFriendshipDeletedEventData>
