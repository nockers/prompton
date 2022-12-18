import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id } from "core"
import { LikeRepository } from "infrastructure"

type Props = {
  userId: string
  postId: string
}

@injectable()
export class DeletePostLikeCommand {
  constructor(private likeRepository: LikeRepository) {}

  async execute(props: Props) {
    try {
      const like = await this.likeRepository.find(
        new Id(props.userId),
        new Id(props.postId),
      )

      if (like instanceof Error) {
        return new Error()
      }

      if (like === null) {
        captureException("データが見つからなかった。")
        return new Error()
      }

      const transaction = await this.likeRepository.delete(like)

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
