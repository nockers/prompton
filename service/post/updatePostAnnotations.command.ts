import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, LabelEntity, PostAnnotationsUpdatedEvent } from "core"
import {
  EventStore,
  LabelRepository,
  PostRepository,
  VisionAdapter,
} from "infrastructure"
import { toWebColor } from "infrastructure/utils/toWebColor"

type Props = {
  postId: string
}

@injectable()
export class UpdatePostAnnotationsCommand {
  constructor(
    private eventStore: EventStore,
    private labelRepository: LabelRepository,
    private visionAdapter: VisionAdapter,
    private postRepository: PostRepository,
  ) {}

  async execute(props: Props) {
    try {
      const post = await this.postRepository.find(new Id(props.postId))

      if (post instanceof Error) {
        return new Error()
      }

      if (post === null) {
        return new Error()
      }

      const colors = await this.visionAdapter.getProperties(post.fileId.value)

      if (colors instanceof Error) {
        return new Error()
      }

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
          nameJA: null,
        })
        await this.labelRepository.persist(label)
      }

      const labels = await this.labelRepository.findManyByNames(labelTexts)

      if (labels instanceof Error) {
        return new Error()
      }

      const event = new PostAnnotationsUpdatedEvent({
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

      await this.eventStore.commit(event)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
