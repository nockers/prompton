import { injectable } from "tsyringe"
import type { PostEvent } from "core"
import {
  PostPromptCreatedEvent,
  PostMarkedAsPrivateEvent,
  PostMarkedAsPublicEvent,
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

    if (event instanceof PostPromptCreatedEvent) {
      return this.promptCreated(event)
    }

    if (event instanceof PostDeletedEvent) {
      return this.deleted(event)
    }

    if (event instanceof PostUpdatedEvent) {
      return this.updated(event)
    }

    if (event instanceof PostMarkedAsPrivateEvent) {
      return this.markedAsPrivate(event)
    }

    if (event instanceof PostMarkedAsPublicEvent) {
      return this.markedAsPublic(event)
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
      .updateAnnotationRacy(event.annotationRacy)
      .updateLabelIds(event.labelIds)
      .updateResizableImageURL(event.resizableImageURL)

    return this.repository.persist(draftPost)
  }

  async created(event: PostCreatedEvent) {
    const draftPost = new PostEntity({
      id: event.postId,
      title: null,
      description: null,
      fileId: event.fileId,
      userId: event.userId,
      promptId: null,
      inputtedPrompt: event.prompt,
      detectedPrompt: event.detectedPrompt,
      software: event.software,
      detectedSoftware: event.detectedSoftware,
      seed: event.seed,
      detectedSeed: event.detectedSeed,
      colors: [],
      webColors: [],
      annotationAdult: null,
      annotationMedical: null,
      annotationRacy: null,
      annotationSpoof: null,
      annotationViolence: null,
      imageURL: null,
      labelIds: [],
      isPublic: event.isPublic,
      isPublicPrompt: false,
      requestId: event.requestId,
    })

    return this.repository.persist(draftPost)
  }

  async promptCreated(event: PostPromptCreatedEvent) {
    const draftPost = new PostEntity({
      id: event.postId,
      title: null,
      description: null,
      fileId: event.fileId,
      userId: event.userId,
      promptId: event.promptId,
      inputtedPrompt: null,
      detectedPrompt: event.detectedPrompt,
      software: event.software,
      detectedSoftware: event.detectedSoftware,
      seed: event.seed,
      detectedSeed: event.detectedSeed,
      colors: [],
      webColors: [],
      annotationAdult: null,
      annotationMedical: null,
      annotationRacy: null,
      annotationSpoof: null,
      annotationViolence: null,
      imageURL: event.imageURL,
      labelIds: [],
      isPublic: event.isPublic,
      isPublicPrompt: false,
      requestId: null,
    })

    return this.repository.persist(draftPost)
  }

  async deleted(event: PostDeletedEvent) {
    const post = await this.repository.find(event.postId)

    if (post instanceof Error) {
      return new Error()
    }

    if (post === null) {
      return new Error()
    }

    return this.repository.delete(event.postId)
  }

  async updated(event: PostUpdatedEvent) {
    event
    return null
  }

  async markedAsPrivate(event: PostMarkedAsPrivateEvent) {
    const post = await this.repository.find(event.postId)

    if (post instanceof Error) {
      return new Error()
    }

    if (post === null) {
      return new Error()
    }

    const draftPost = post.makePrivate()

    return this.repository.persist(draftPost)
  }

  async markedAsPublic(event: PostMarkedAsPublicEvent) {
    const post = await this.repository.find(event.postId)

    if (post instanceof Error) {
      return new Error()
    }

    if (post === null) {
      return new Error()
    }

    const draftPost = post.makePublic()

    return this.repository.persist(draftPost)
  }
}
