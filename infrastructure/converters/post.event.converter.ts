import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { PostEvent } from "core"
import {
  PostAnnotationsUpdatedEvent,
  PostCreatedEvent,
  PostDeletedEvent,
  PostUpdatedEvent,
  Id,
} from "core"
import {
  zPostAnnotationsUpdatedEventData,
  zPostDeletedEventData,
  zPostUpdatedEventData,
  zPostCreatedEventData,
} from "infrastructure/validations"

export class PostEventConverter {
  static toData(event: PostEvent) {
    if (event.type === PostAnnotationsUpdatedEvent.type) {
      const data: z.infer<typeof zPostAnnotationsUpdatedEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
        colors: event.colors,
        webColors: event.webColors,
        annotationAdult: event.annotationAdult,
        annotationMedical: event.annotationMedical,
        annotationRacy: event.annotationRacy,
        annotationSpoof: event.annotationSpoof,
        annotationViolence: event.annotationViolence,
        labelIds: event.labelIds.map((id) => id.value),
      }
      return zPostAnnotationsUpdatedEventData.parse(data)
    }

    if (event.type === PostCreatedEvent.type) {
      const data: z.infer<typeof zPostCreatedEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
        fileId: event.fileId.value,
      }
      return zPostCreatedEventData.parse(data)
    }

    if (event.type === PostDeletedEvent.type) {
      const data: z.infer<typeof zPostDeletedEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
      }
      return zPostDeletedEventData.parse(data)
    }

    if (event.type === PostUpdatedEvent.type) {
      const data: z.infer<typeof zPostUpdatedEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
        title: event.title,
        prompt: event.prompt,
      }
      return zPostUpdatedEventData.parse(data)
    }

    return event
  }

  static toEntity(event: Event): PostEvent {
    if (event.type === PostAnnotationsUpdatedEvent.type) {
      const data = zPostAnnotationsUpdatedEventData.parse(event.data)
      return new PostAnnotationsUpdatedEvent({
        id: new Id(event.id),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
        colors: data.colors,
        webColors: data.webColors,
        annotationAdult: data.annotationAdult,
        annotationMedical: data.annotationMedical,
        annotationRacy: data.annotationRacy,
        annotationSpoof: data.annotationSpoof,
        annotationViolence: data.annotationViolence,
        labelIds: data.labelIds.map((id) => new Id(id)),
      })
    }

    if (event.type === PostCreatedEvent.type) {
      const data = zPostCreatedEventData.parse(event.data)
      return new PostCreatedEvent({
        id: new Id(event.id),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
        fileId: new Id(data.fileId),
      })
    }

    if (event.type === PostDeletedEvent.type) {
      const data = zPostDeletedEventData.parse(event.data)
      return new PostDeletedEvent({
        id: new Id(event.id),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    if (event.type === PostUpdatedEvent.type) {
      const data = zPostUpdatedEventData.parse(event.data)
      return new PostUpdatedEvent({
        id: new Id(event.id),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
        title: data.title,
        prompt: data.prompt,
      })
    }

    throw new Error()
  }
}
