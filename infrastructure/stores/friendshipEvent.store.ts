import { injectable } from "tsyringe"
import type { FriendshipEvent } from "core"
import {
  FriendshipCreatedEvent,
  FriendshipDeletedEvent,
  FriendshipEntity,
} from "core"

import { FriendshipRepository } from "infrastructure/repositories"

@injectable()
export class FriendshipEventStore {
  constructor(private repository: FriendshipRepository) {}

  execute(event: FriendshipEvent) {
    if (event.type === FriendshipCreatedEvent.type) {
      return this.created(event)
    }

    if (event.type === FriendshipDeletedEvent.type) {
      return this.deleted(event)
    }

    return null
  }

  async created(event: FriendshipCreatedEvent) {
    const draftFriendship = new FriendshipEntity({
      id: event.friendshipId,
      followeeId: event.followeeId,
      followerId: event.followerId,
    })

    return this.repository.follow(draftFriendship)
  }

  async deleted(event: FriendshipDeletedEvent) {
    const friendship = await this.repository.find(event.friendshipId)

    if (friendship instanceof Error) {
      return friendship
    }

    if (friendship === null) {
      return new Error()
    }

    return this.repository.unfollow(friendship)
  }
}
