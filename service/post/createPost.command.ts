import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, PostCreatedEvent } from "core"
import {
  EventStore,
  LabelRepository,
  PostRepository,
  VisionAdapter,
} from "infrastructure"

type Props = {
  userId: string
  postFileId: string
}

@injectable()
export class CreatePostCommand {
  constructor(
    private eventStore: EventStore,
    private labelRepository: LabelRepository,
    private visionAdapter: VisionAdapter,
    private postRepository: PostRepository,
  ) {}

  async execute(props: Props) {
    try {
      const postId = IdFactory.create()

      const event = new PostCreatedEvent({
        id: IdFactory.create(),
        postId: postId,
        fileId: new Id(props.postFileId),
        userId: new Id(props.userId),
      })

      await this.eventStore.commit(event)

      return { postId }
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
