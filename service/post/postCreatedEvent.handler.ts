import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import type { PostCreatedEvent } from "core"
import { IdFactory, LabelEntity, PostAnnotationsUpdatedEvent } from "core"
import {
  EventStore,
  LabelRepository,
  PostRepository,
  VisionAdapter,
} from "infrastructure"
import { toWebColor } from "infrastructure/utils/toWebColor"

@injectable()
export class PostCreatedEventHandler {
  constructor(
    private eventStore: EventStore,
    private labelRepository: LabelRepository,
    private visionAdapter: VisionAdapter,
    private postRepository: PostRepository,
  ) {}

  async execute(event: PostCreatedEvent) {
    try {
      const post = await this.postRepository.find(event.postId)

      if (post instanceof Error) {
        return new Error()
      }

      if (post === null) {
        captureException("data not found.")
        return new Error()
      }

      const colors = await this.visionAdapter.getProperties(post.fileId.value)

      if (colors instanceof Error) {
        return new Error()
      }

      const allWebColors = colors.map((color) => {
        return toWebColor(color)
      })

      const webColors = Array.from(new Set(allWebColors))

      const annotation = await this.visionAdapter.getSafeSearchAnnotation(
        post.fileId.value,
      )

      if (annotation instanceof Error) {
        return new Error()
      }

      const labelTexts = await this.visionAdapter.getLabels(post.fileId.value)

      if (labelTexts instanceof Error) {
        return new Error()
      }

      for (const labelText of labelTexts) {
        const label = new LabelEntity({
          id: IdFactory.create(),
          name: labelText,
        })
        await this.labelRepository.persist(label)
      }

      const labels = await this.labelRepository.findManyByNames(labelTexts)

      if (labels instanceof Error) {
        return new Error()
      }

      const nextEvent = new PostAnnotationsUpdatedEvent({
        id: IdFactory.create(),
        postId: post.id,
        userId: post.userId,
        colors: colors,
        webColors: webColors,
        annotationAdult: annotation.adult,
        annotationMedical: annotation.medical,
        annotationRacy: annotation.racy,
        annotationSpoof: annotation.spoof,
        annotationViolence: annotation.violence,
        labelIds: labels.map((label) => {
          return label.id
        }),
      })

      await this.eventStore.commit(nextEvent)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
