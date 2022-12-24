import type { PostAnnotationsUpdatedEvent } from "core/events/post/postAnnotationsUpdated.event"
import type { PostCreatedEvent } from "core/events/post/postCreated.event"
import type { PostDeletedEvent } from "core/events/post/postDeleted.event"
import type { PostUpdatedEvent } from "core/events/post/postUpdated.event"

export type PostEvent =
  | PostAnnotationsUpdatedEvent
  | PostCreatedEvent
  | PostDeletedEvent
  | PostUpdatedEvent
