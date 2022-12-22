import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id } from "core"
import { BookmarkRepository } from "infrastructure"

type Props = {
  userId: string
  postId: string
}

@injectable()
export class DeletePostBookmarkCommand {
  constructor(private bookmarkRepository: BookmarkRepository) {}

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

      const transaction = await this.bookmarkRepository.delete(bookmark)

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
