import type { LikeCreatedEvent } from "core/events/like/likeCreated.event"
import type { LikeDeletedEvent } from "core/events/like/likeDeleted.event"

export type LikeEvent = LikeCreatedEvent | LikeDeletedEvent
