import { injectable } from "tsyringe"
import type { PostEvent } from "core"
import {
  PostAnnotationsUpdatedEvent,
  PostCreatedEvent,
  PostDeletedEvent,
  PostEntity,
  PostUpdatedEvent,
} from "core"
import { PostRepository } from "infrastructure/repositories"

@injectable()
export class PostEventStore {
  constructor(private repository: PostRepository) {}

  execute(event: PostEvent) {
    if (event instanceof PostAnnotationsUpdatedEvent) {
      return this.annotationsUpdated(event)
    }

    if (event instanceof PostCreatedEvent) {
      return this.created(event)
    }

    if (event instanceof PostDeletedEvent) {
      return this.deleted(event)
    }

    if (event instanceof PostUpdatedEvent) {
      return this.updated(event)
    }

    return null
  }

  async annotationsUpdated(event: PostAnnotationsUpdatedEvent) {
    const post = await this.repository.find(event.postId)

    if (post instanceof Error) {
      return new Error()
    }

    if (post === null) {
      return new Error()
    }

    const draftPost = post
      .updateColors(event.colors)
      .updateWebColors(event.webColors)
      .updateAnnotationAdult(event.annotationAdult)
      .updateAnnotationSpoof(event.annotationSpoof)
      .updateAnnotationMedical(event.annotationMedical)
      .updateAnnotationViolence(event.annotationViolence)
      .updateLabelIds(event.labelIds)

    return this.repository.persist(draftPost)
  }

  async created(event: PostCreatedEvent) {
    const draftPost = new PostEntity({
      id: event.postId,
      title: null,
      fileId: event.fileId,
      userId: event.userId,
      prompt: null,
      colors: [],
      webColors: [],
      annotationAdult: null,
      annotationMedical: null,
      annotationRacy: null,
      annotationSpoof: null,
      annotationViolence: null,
      labelIds: [],
    })

    return this.repository.persist(draftPost)
  }

  async deleted(event: PostDeletedEvent) {
    event
    return null
  }

  async updated(event: PostUpdatedEvent) {
    event
    return null
  }
}
