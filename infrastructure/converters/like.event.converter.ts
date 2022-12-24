import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { LikeEvent } from "core"
import { LikeDeletedEvent, LikeCreatedEvent, Id } from "core"
import type { PrismaLikeEvent } from "infrastructure/validations"
import {
  zPrismaLikeDeletedEvent,
  zPrismaLikeCreatedEvent,
} from "infrastructure/validations"

export class LikeEventConverter {
  static toData(event: LikeEvent): PrismaLikeEvent {
    if (event.type === LikeCreatedEvent.type) {
      const data: z.infer<typeof zPrismaLikeCreatedEvent> = {
        likeId: event.likeId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zPrismaLikeCreatedEvent.parse(data)
    }

    if (event.type === LikeDeletedEvent.type) {
      const data: z.infer<typeof zPrismaLikeDeletedEvent> = {
        likeId: event.likeId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zPrismaLikeDeletedEvent.parse(data)
    }

    return event
  }

  static toEntity(event: Event): LikeEvent {
    if (event.type === LikeCreatedEvent.type) {
      const data = zPrismaLikeCreatedEvent.parse(event.data)
      return new LikeCreatedEvent({
        id: new Id(event.id),
        likeId: new Id(data.likeId),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    if (event.type === LikeDeletedEvent.type) {
      const data = zPrismaLikeDeletedEvent.parse(event.data)
      return new LikeDeletedEvent({
        id: new Id(event.id),
        likeId: new Id(data.likeId),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    throw new Error()
  }
}
