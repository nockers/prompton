import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, LabelEntity } from "core"
import { LabelRepository, PostRepository, VisionAdapter } from "infrastructure"

type Props = {
  postId: string
}

@injectable()
export class CreateLabelsCommand {
  constructor(
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

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
