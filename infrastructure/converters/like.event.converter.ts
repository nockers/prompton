import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { LikeEvent } from "core"
import { LikeDeletedEvent, LikeCreatedEvent, Id } from "core"
import type { LikeEventData } from "infrastructure/validations"
import {
  zLikeDeletedEventData,
  zLikeCreatedEventData,
} from "infrastructure/validations"

export class LikeEventConverter {
  static toData(event: LikeEvent): LikeEventData {
    if (event.type === LikeCreatedEvent.type) {
      const data: z.infer<typeof zLikeCreatedEventData> = {
        likeId: event.likeId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zLikeCreatedEventData.parse(data)
    }

    if (event.type === LikeDeletedEvent.type) {
      const data: z.infer<typeof zLikeDeletedEventData> = {
        likeId: event.likeId.value,
        userId: event.userId.value,
        postId: event.postId.value,
      }
      return zLikeDeletedEventData.parse(data)
    }

    return event
  }

  static toEntity(event: Event): LikeEvent {
    if (event.type === LikeCreatedEvent.type) {
      const data = zLikeCreatedEventData.parse(event.data)
      return new LikeCreatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        likeId: new Id(data.likeId),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    if (event.type === LikeDeletedEvent.type) {
      const data = zLikeDeletedEventData.parse(event.data)
      return new LikeDeletedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        likeId: new Id(data.likeId),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    throw new Error()
  }
}
