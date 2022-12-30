import { injectable } from "tsyringe"
import type { LikeEvent } from "core"
import { LikeCreatedEvent, LikeDeletedEvent, LikeEntity } from "core"

import { LikeRepository } from "infrastructure/repositories"

@injectable()
export class LikeEventStore {
  constructor(private repository: LikeRepository) {}

  execute(event: LikeEvent) {
    if (event instanceof LikeCreatedEvent) {
      return this.created(event)
    }

    if (event instanceof LikeDeletedEvent) {
      return this.deleted(event)
    }

    return null
  }

  async created(event: LikeCreatedEvent) {
    const draftLike = new LikeEntity({
      id: event.likeId,
      postId: event.postId,
      userId: event.userId,
    })

    return this.repository.upsert(draftLike)
  }

  async deleted(event: LikeDeletedEvent) {
    const like = await this.repository.find(event.likeId)

    if (like instanceof Error) {
      return like
    }

    if (like === null) {
      return new Error()
    }

    return this.repository.delete(like)
  }
}
