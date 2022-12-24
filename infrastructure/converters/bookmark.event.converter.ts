import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { BookmarkEvent } from "core"
import { BookmarkDeletedEvent, BookmarkCreatedEvent, Id } from "core"
import type { PrismaBookmarkEvent } from "infrastructure/validations"
import {
  zPrismaBookmarkDeletedEvent,
  zPrismaBookmarkCreatedEvent,
} from "infrastructure/validations"

export class BookmarkEventConverter {
  static toData(event: BookmarkEvent): PrismaBookmarkEvent {
    if (event.type === BookmarkCreatedEvent.type) {
      const data: z.infer<typeof zPrismaBookmarkCreatedEvent> = {
        bookmarkId: event.bookmarkId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zPrismaBookmarkCreatedEvent.parse(data)
    }

    if (event.type === BookmarkDeletedEvent.type) {
      const data: z.infer<typeof zPrismaBookmarkDeletedEvent> = {
        bookmarkId: event.bookmarkId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zPrismaBookmarkDeletedEvent.parse(data)
    }

    return event
  }

  static toEntity(event: Event): BookmarkEvent {
    if (event.type === BookmarkCreatedEvent.type) {
      const data = zPrismaBookmarkCreatedEvent.parse(event.data)
      return new BookmarkCreatedEvent({
        id: new Id(event.id),
        bookmarkId: new Id(data.bookmarkId),
        userId: new Id(data.userId),
        postId: new Id(data.postId),
      })
    }

    if (event.type === BookmarkDeletedEvent.type) {
      const data = zPrismaBookmarkDeletedEvent.parse(event.data)
      return new BookmarkDeletedEvent({
        id: new Id(event.id),
        bookmarkId: new Id(data.bookmarkId),
        userId: new Id(data.userId),
        postId: new Id(data.postId),
      })
    }

    throw new Error()
  }
}
