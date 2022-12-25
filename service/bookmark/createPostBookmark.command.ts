import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { BookmarkCreatedEvent, Id, IdFactory } from "core"
import { EventStore, PostRepository } from "infrastructure"

type Props = {
  postId: string
  userId: string
}

@injectable()
export class CreatePostBookmarkCommand {
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

      const event = new BookmarkCreatedEvent({
        id: IdFactory.create(),
        bookmarkId: IdFactory.create(),
        postId: new Id(props.postId),
        userId: new Id(props.userId),
      })

      await this.eventStore.commit(event)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
