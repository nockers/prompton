import type { FriendshipCreatedEvent } from "core/events/friendship/friendshipCreated.event"
import type { FriendshipDeletedEvent } from "core/events/friendship/friendshipDeleted.event"

export type FriendshipEvent = FriendshipCreatedEvent | FriendshipDeletedEvent
