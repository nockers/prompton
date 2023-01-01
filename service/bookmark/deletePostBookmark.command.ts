import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { BookmarkDeletedEvent, Id, IdFactory } from "core"
import { BookmarkRepository, EventStore } from "infrastructure"

type Props = {
  userId: string
  postId: string
}

@injectable()
export class DeletePostBookmarkCommand {
  constructor(
    private eventStore: EventStore,
    private bookmarkRepository: BookmarkRepository,
  ) {}

  async execute(props: Props) {
    try {
      const bookmark = await this.bookmarkRepository.find(
        new Id(props.userId),
        new Id(props.postId),
      )

      if (bookmark instanceof Error) {
        return new Error()
      }

      if (bookmark === null) {
        captureException("データが見つからなかった。")
        return new Error()
      }

      const event = new BookmarkDeletedEvent({
        id: IdFactory.create(),
        bookmarkId: bookmark.id,
        postId: bookmark.postId,
        userId: bookmark.userId,
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
