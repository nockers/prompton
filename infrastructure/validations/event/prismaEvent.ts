import type { PrismaBookmarkEvent } from "infrastructure/validations/bookmark"
import type { PrismaFriendshipEvent } from "infrastructure/validations/friendship"
import type { PrismaLabelEvent } from "infrastructure/validations/label"
import type { PrismaLikeEvent } from "infrastructure/validations/like"
import type { PrismaNotificationEvent } from "infrastructure/validations/notification"
import type { PrismaPostEvent } from "infrastructure/validations/post"
import type { PrismaUserEvent } from "infrastructure/validations/user"

export type PrismaEvent =
  | PrismaBookmarkEvent
  | PrismaFriendshipEvent
  | PrismaLabelEvent
  | PrismaLikeEvent
  | PrismaNotificationEvent
  | PrismaPostEvent
  | PrismaUserEvent
