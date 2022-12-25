import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, LikeDeletedEvent } from "core"
import { EventStore, LikeRepository } from "infrastructure"

type Props = {
  userId: string
  postId: string
}

@injectable()
export class DeletePostLikeCommand {
  constructor(
    private eventStore: EventStore,
    private likeRepository: LikeRepository,
  ) {}

  async execute(props: Props) {
    try {
      const like = await this.likeRepository.findByPostId(
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

      const event = new LikeDeletedEvent({
        id: IdFactory.create(),
        likeId: like.id,
        postId: like.postId,
        userId: like.userId,
      })

      await this.eventStore.commit(event)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
