import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, PostEntity } from "core"
import { PostRepository } from "infrastructure"

type Props = {
  userId: string
  postFileId: string
}

@injectable()
export class CreatePostCommand {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(props: Props) {
    try {
      const draftPost = new PostEntity({
        id: IdFactory.create(),
        title: null,
        fileId: new Id(props.postFileId),
        userId: new Id(props.userId),
      })

      const transaction = await this.postRepository.persist(draftPost)

      if (transaction instanceof Error) {
        return new Error()
      }

      return { userId: draftPost.id.value }
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
