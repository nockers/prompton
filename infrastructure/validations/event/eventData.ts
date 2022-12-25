import type { BookmarkEventData } from "infrastructure/validations/bookmark"
import type { FriendshipEventData } from "infrastructure/validations/friendship"
import type { LabelEventData } from "infrastructure/validations/label"
import type { LikeEventData } from "infrastructure/validations/like"
import type { NotificationEventData } from "infrastructure/validations/notification"
import type { PostEventData } from "infrastructure/validations/post"
import type { UserEventData } from "infrastructure/validations/user"

export type EventData =
  | BookmarkEventData
  | FriendshipEventData
  | LabelEventData
  | LikeEventData
  | NotificationEventData
  | PostEventData
  | UserEventData
