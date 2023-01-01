import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, PostUpdatedEvent } from "core"
import { EventStore, PostRepository } from "infrastructure"

type Props = {
  userId: string
  postId: string
  postPrompt: string | null
}

@injectable()
export class UpdatePostCommand {
  constructor(
    private eventStore: EventStore,
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

      const event = new PostUpdatedEvent({
        id: IdFactory.create(),
        postId: new Id(props.postId),
        userId: new Id(props.userId),
        prompt: props.postPrompt,
        title: post.title,
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
