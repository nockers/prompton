import type { BookmarkCreatedEvent } from "core/events/bookmark/bookmarkCreated.event"
import type { BookmarkDeletedEvent } from "core/events/bookmark/bookmarkDeleted.event"

export type BookmarkEvent = BookmarkCreatedEvent | BookmarkDeletedEvent
