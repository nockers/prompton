import { injectable } from "tsyringe"
import type { BookmarkEvent } from "core"
import {
  BookmarkDeletedEvent,
  BookmarkEntity,
  BookmarkCreatedEvent,
} from "core"
import { BookmarkRepository } from "infrastructure/repositories"

@injectable()
export class BookmarkEventStore {
  constructor(private repository: BookmarkRepository) {}

  execute(event: BookmarkEvent) {
    if (event.type === BookmarkCreatedEvent.type) {
      return this.created(event)
    }

    if (event.type === BookmarkDeletedEvent.type) {
      return this.deleted(event)
    }

    return null
  }

  async created(event: BookmarkCreatedEvent) {
    const draftBookmark = new BookmarkEntity({
      id: event.bookmarkId,
      postId: event.postId,
      userId: event.userId,
    })

    return this.repository.upsert(draftBookmark)
  }

  async deleted(event: BookmarkDeletedEvent) {
    return this.repository.delete(event.bookmarkId)
  }
}
