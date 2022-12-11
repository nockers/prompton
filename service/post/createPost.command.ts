import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, LabelEntity, PostEntity } from "core"
import { LabelRepository, PostRepository, VisionAdapter } from "infrastructure"

type Props = {
  userId: string
  postFileId: string
}

@injectable()
export class CreatePostCommand {
  constructor(
    private labelRepository: LabelRepository,
    private visionAdapter: VisionAdapter,
    private postRepository: PostRepository,
  ) {}

  async execute(props: Props) {
    try {
      const colors = await this.visionAdapter.getProperties(props.postFileId)

      if (colors instanceof Error) {
        return new Error()
      }

      if (colors instanceof Error) {
        return new Error()
      }

      const annotation = await this.visionAdapter.getSafeSearchAnnotation(
        props.postFileId,
      )

      if (annotation instanceof Error) {
        return new Error()
      }

      const labelTexts = await this.visionAdapter.getLabels(props.postFileId)

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

      const draftPost = new PostEntity({
        id: IdFactory.create(),
        title: null,
        fileId: new Id(props.postFileId),
        userId: new Id(props.userId),
        prompt: null,
        colors: colors,
        annotationAdult: annotation.adult,
        annotationMedical: annotation.medical,
        annotationRacy: annotation.racy,
        annotationSpoof: annotation.spoof,
        annotationViolence: annotation.violence,
        labelIds: labels.map((label) => {
          return label.id
        }),
      })

      const transaction = await this.postRepository.persist(draftPost)

      if (transaction instanceof Error) {
        return new Error()
      }

      return { postId: draftPost.id.value }
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
