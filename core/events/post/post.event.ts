import type { PostAnnotationsUpdatedEvent } from "core/events/post/postAnnotationsUpdated.event"
import type { PostCreatedEvent } from "core/events/post/postCreated.event"
import type { PostDeletedEvent } from "core/events/post/postDeleted.event"
import type { PostMarkedAsPrivateEvent } from "core/events/post/postMarkedAsPrivate.event"
import type { PostMarkedAsPublicEvent } from "core/events/post/postMarkedAsPublic.event"
import type { PostPromptCreatedEvent } from "core/events/post/postPromptCreated.event"
import type { PostUpdatedEvent } from "core/events/post/postUpdated.event"

export type PostEvent =
  | PostAnnotationsUpdatedEvent
  | PostCreatedEvent
  | PostDeletedEvent
  | PostUpdatedEvent
  | PostMarkedAsPrivateEvent
  | PostMarkedAsPublicEvent
  | PostPromptCreatedEvent
