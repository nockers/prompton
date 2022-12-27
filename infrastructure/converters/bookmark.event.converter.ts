import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { BookmarkEvent } from "core"
import { BookmarkDeletedEvent, BookmarkCreatedEvent, Id } from "core"
import type { BookmarkEventData } from "infrastructure/validations"
import {
  zBookmarkDeletedEventData,
  zBookmarkCreatedEventData,
} from "infrastructure/validations"

export class BookmarkEventConverter {
  static toData(event: BookmarkEvent): BookmarkEventData {
    if (event.type === BookmarkCreatedEvent.type) {
      const data: z.infer<typeof zBookmarkCreatedEventData> = {
        bookmarkId: event.bookmarkId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zBookmarkCreatedEventData.parse(data)
    }

    if (event.type === BookmarkDeletedEvent.type) {
      const data: z.infer<typeof zBookmarkDeletedEventData> = {
        bookmarkId: event.bookmarkId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zBookmarkDeletedEventData.parse(data)
    }

    return event
  }

  static toEntity(event: Event): BookmarkEvent {
    if (event.type === BookmarkCreatedEvent.type) {
      const data = zBookmarkCreatedEventData.parse(event.data)
      return new BookmarkCreatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        bookmarkId: new Id(data.bookmarkId),
        userId: new Id(data.userId),
        postId: new Id(data.postId),
      })
    }

    if (event.type === BookmarkDeletedEvent.type) {
      const data = zBookmarkDeletedEventData.parse(event.data)
      return new BookmarkDeletedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        bookmarkId: new Id(data.bookmarkId),
        userId: new Id(data.userId),
        postId: new Id(data.postId),
      })
    }

    throw new Error()
  }
}
