import type { BookmarkEvent } from "core/events/bookmark"
import type { FriendshipEvent } from "core/events/friendship"
import type { LabelEvent } from "core/events/label"
import type { LikeEvent } from "core/events/like"
import type { NotificationEvent } from "core/events/notification"
import type { PaymentEvent } from "core/events/payment"
import type { PostEvent } from "core/events/post"
import type { RequestEvent } from "core/events/request"
import type { UserEvent } from "core/events/user"

export type DomainEvent =
  | BookmarkEvent
  | FriendshipEvent
  | LabelEvent
  | LikeEvent
  | NotificationEvent
  | PaymentEvent
  | PostEvent
  | RequestEvent
  | UserEvent
