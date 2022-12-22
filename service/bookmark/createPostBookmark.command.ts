import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { BookmarkEntity, Id, IdFactory } from "core"
import { BookmarkRepository, PostRepository } from "infrastructure"

type Props = {
  postId: string
  userId: string
}

@injectable()
export class CreatePostBookmarkCommand {
  constructor(
    private postRepository: PostRepository,
    private bookmarkRepository: BookmarkRepository,
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

      const draftBookmark = new BookmarkEntity({
        id: IdFactory.create(),
        postId: new Id(props.postId),
        userId: new Id(props.userId),
      })

      const transaction = await this.bookmarkRepository.upsert(draftBookmark)

      if (transaction instanceof Error) {
        return new Error()
      }

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
