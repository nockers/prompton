import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { FriendshipEvent } from "core"
import { FriendshipDeletedEvent, FriendshipCreatedEvent, Id } from "core"
import type { FriendshipEventData } from "infrastructure/validations"
import {
  zFriendshipDeletedEventData,
  zFriendshipCreatedEventData,
} from "infrastructure/validations"

export class FriendshipEventConverter {
  static toData(event: FriendshipEvent): FriendshipEventData {
    if (event instanceof FriendshipCreatedEvent) {
      const data: z.infer<typeof zFriendshipCreatedEventData> = {
        friendshipId: event.friendshipId.value,
        userId: event.userId.value,
        followeeId: event.followeeId.value,
        followerId: event.followerId.value,
      }
      return zFriendshipCreatedEventData.parse(data)
    }

    if (event instanceof FriendshipDeletedEvent) {
      const data: z.infer<typeof zFriendshipDeletedEventData> = {
        friendshipId: event.friendshipId.value,
        userId: event.userId.value,
        followeeId: event.followeeId.value,
        followerId: event.followerId.value,
      }
      return zFriendshipDeletedEventData.parse(data)
    }

    return event
  }

  static toEntity(event: Event): FriendshipEvent {
    if (event.type === FriendshipCreatedEvent.type) {
      const data = zFriendshipCreatedEventData.parse(event.data)
      return new FriendshipCreatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        friendshipId: new Id(data.friendshipId),
        userId: new Id(data.userId),
        followeeId: new Id(data.followeeId),
        followerId: new Id(data.followerId),
      })
    }

    if (event.type === FriendshipDeletedEvent.type) {
      const data = zFriendshipDeletedEventData.parse(event.data)
      return new FriendshipDeletedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        friendshipId: new Id(data.friendshipId),
        userId: new Id(data.userId),
        followeeId: new Id(data.followeeId),
        followerId: new Id(data.followerId),
      })
    }

    throw new Error()
  }
}
