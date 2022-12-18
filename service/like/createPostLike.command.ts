import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, LikeEntity } from "core"
import { LikeRepository, PostRepository } from "infrastructure"

type Props = {
  postId: string
  userId: string
}

@injectable()
export class CreatePostLikeCommand {
  constructor(
    private postRepository: PostRepository,
    private likeRepository: LikeRepository,
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

      const draftLike = new LikeEntity({
        id: IdFactory.create(),
        postId: new Id(props.postId),
        userId: new Id(props.userId),
      })

      const transaction = await this.likeRepository.upsert(draftLike)

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
