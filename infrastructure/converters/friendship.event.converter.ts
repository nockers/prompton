import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { FriendshipEvent } from "core"
import { FriendshipDeletedEvent, FriendshipCreatedEvent, Id } from "core"
import type { PrismaFriendshipEvent } from "infrastructure/validations"
import {
  zPrismaFriendshipDeletedEvent,
  zPrismaFriendshipCreatedEvent,
} from "infrastructure/validations"

export class FriendshipEventConverter {
  static toData(event: FriendshipEvent): PrismaFriendshipEvent {
    if (event.type === FriendshipCreatedEvent.type) {
      const data: z.infer<typeof zPrismaFriendshipCreatedEvent> = {
        friendshipId: event.friendshipId.value,
        userId: event.userId.value,
        followerId: event.followerId.value,
      }
      return zPrismaFriendshipCreatedEvent.parse(data)
    }

    if (event.type === FriendshipDeletedEvent.type) {
      const data: z.infer<typeof zPrismaFriendshipDeletedEvent> = {
        friendshipId: event.friendshipId.value,
        userId: event.userId.value,
        followerId: event.followerId.value,
      }
      return zPrismaFriendshipDeletedEvent.parse(data)
    }

    return event
  }

  static toEntity(event: Event): FriendshipEvent {
    if (event.type === FriendshipCreatedEvent.type) {
      const data = zPrismaFriendshipCreatedEvent.parse(event.data)
      return new FriendshipCreatedEvent({
        id: new Id(event.id),
        friendshipId: new Id(data.friendshipId),
        userId: new Id(data.userId),
        followerId: new Id(data.followerId),
      })
    }

    if (event.type === FriendshipDeletedEvent.type) {
      const data = zPrismaFriendshipDeletedEvent.parse(event.data)
      return new FriendshipDeletedEvent({
        id: new Id(event.id),
        friendshipId: new Id(data.friendshipId),
        userId: new Id(data.userId),
        followerId: new Id(data.followerId),
      })
    }

    throw new Error()
  }
}
