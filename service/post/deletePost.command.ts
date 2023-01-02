import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, PostDeletedEvent } from "core"
import { EventStore, PostRepository } from "infrastructure"

type Props = {
  postId: string
}

@injectable()
export class DeletePostCommand {
  constructor(
    private postRepository: PostRepository,
    private eventStore: EventStore,
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

      const event = new PostDeletedEvent({
        id: IdFactory.create(),
        postId: post.id,
        userId: post.userId,
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
