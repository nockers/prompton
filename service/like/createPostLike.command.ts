import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, LikeCreatedEvent } from "core"
import { EventStore, PostRepository } from "infrastructure"

type Props = {
  postId: string
  userId: string
}

@injectable()
export class CreatePostLikeCommand {
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
        captureException("データが見つからなかった。")
        return new Error()
      }

      if (post.userId.value === props.userId) {
        return new Error("自分の投稿にはイイネできない。")
      }

      const event = new LikeCreatedEvent({
        id: IdFactory.create(),
        likeId: IdFactory.create(),
        postId: new Id(props.postId),
        userId: new Id(props.userId),
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
