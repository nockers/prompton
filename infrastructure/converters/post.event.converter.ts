import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { PostEvent } from "core"
import {
  SoftwareFactory,
  Url,
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
    if (event instanceof PostAnnotationsUpdatedEvent) {
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
        resizableImageURL: event.resizableImageURL?.value ?? null,
      }
      return zPostAnnotationsUpdatedEventData.parse(data)
    }

    if (event instanceof PostCreatedEvent) {
      const data: z.infer<typeof zPostCreatedEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
        fileId: event.fileId.value,
        detectedSeed: event.detectedSeed ?? null,
        detectedSoftware: event.detectedSoftware?.value ?? null,
        detectedPrompt: event.detectedPrompt ?? null,
        prompt: event.prompt ?? null,
        software: event.software?.value ?? null,
        seed: event.seed ?? null,
      }
      return zPostCreatedEventData.parse(data)
    }

    if (event instanceof PostDeletedEvent) {
      const data: z.infer<typeof zPostDeletedEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
      }
      return zPostDeletedEventData.parse(data)
    }

    if (event instanceof PostUpdatedEvent) {
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
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
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
        resizableImageURL: data.resizableImageURL
          ? new Url(data.resizableImageURL)
          : null,
      })
    }

    if (event.type === PostCreatedEvent.type) {
      const data = zPostCreatedEventData.parse(event.data)
      return new PostCreatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
        fileId: new Id(data.fileId),
        detectedSoftware:
          typeof data.detectedSoftware === "string"
            ? SoftwareFactory.fromFileName(data.detectedSoftware)
            : null,
        detectedPrompt:
          typeof data.detectedPrompt === "string" ? data.detectedPrompt : null,
        detectedSeed:
          typeof data.detectedSeed === "string" ? data.detectedSeed : null,
        software:
          typeof data.software === "string"
            ? SoftwareFactory.fromFileName(data.software)
            : null,
        prompt: typeof data.prompt === "string" ? data.prompt : null,
        seed: typeof data.seed === "string" ? data.seed : null,
      })
    }

    if (event.type === PostDeletedEvent.type) {
      const data = zPostDeletedEventData.parse(event.data)
      return new PostDeletedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    if (event.type === PostUpdatedEvent.type) {
      const data = zPostUpdatedEventData.parse(event.data)
      return new PostUpdatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
        title: data.title,
        prompt: data.prompt,
      })
    }

    throw new Error()
  }
}
