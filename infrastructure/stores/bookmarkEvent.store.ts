import { injectable } from "tsyringe"
import type { BookmarkEvent } from "core"
import { BookmarkRepository } from "infrastructure/repositories"

@injectable()
export class BookmarkEventStore {
  constructor(private repository: BookmarkRepository) {}

  execute(event: BookmarkEvent) {
    this.repository
    event
    return null
  }
}
