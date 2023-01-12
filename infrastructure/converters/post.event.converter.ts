import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { PostEvent } from "core"
import {
  PostPromptCreatedEvent,
  PostMarkedAsPrivateEvent,
  PostMarkedAsPublicEvent,
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
  zPostMarkedAsPublicEventData,
  zPostMarkedAsPrivateEventData,
  zPostPromptCreatedEventData,
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
        isPublic: event.isPublic,
        requestId: event.requestId?.value ?? null,
      }
      return zPostCreatedEventData.parse(data)
    }

    if (event instanceof PostPromptCreatedEvent) {
      const data: z.infer<typeof zPostPromptCreatedEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
        fileId: event.fileId.value,
        detectedSeed: event.detectedSeed,
        detectedSoftware: event.detectedSoftware?.value ?? null,
        detectedPrompt: event.detectedPrompt,
        software: event.software?.value ?? null,
        seed: event.seed ?? null,
        isPublic: event.isPublic,
        promptId: event.promptId.value,
        imageURL: event.imageURL.value,
      }
      return zPostPromptCreatedEventData.parse(data)
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

    if (event instanceof PostMarkedAsPrivateEvent) {
      const data: z.infer<typeof zPostMarkedAsPublicEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
      }
      return zPostMarkedAsPublicEventData.parse(data)
    }

    if (event instanceof PostMarkedAsPublicEvent) {
      const data: z.infer<typeof zPostMarkedAsPrivateEventData> = {
        postId: event.postId.value,
        userId: event.userId.value,
      }
      return zPostMarkedAsPrivateEventData.parse(data)
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
        requestId:
          typeof data.requestId === "string" ? new Id(data.requestId) : null,
        isPublic: data.isPublic ?? false,
      })
    }

    if (event.type === PostPromptCreatedEvent.type) {
      const data = zPostPromptCreatedEventData.parse(event.data)
      return new PostPromptCreatedEvent({
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
        seed: typeof data.seed === "string" ? data.seed : null,
        isPublic: data.isPublic ?? false,
        promptId: new Id(data.promptId),
        imageURL: new Url(data.imageURL),
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

    if (event.type === PostMarkedAsPrivateEvent.type) {
      const data = zPostMarkedAsPrivateEventData.parse(event.data)
      return new PostMarkedAsPrivateEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    if (event.type === PostMarkedAsPublicEvent.type) {
      const data = zPostMarkedAsPublicEventData.parse(event.data)
      return new PostMarkedAsPublicEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        postId: new Id(data.postId),
        userId: new Id(data.userId),
      })
    }

    throw new Error()
  }
}
