import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id } from "core"
import { PostRepository } from "infrastructure"

type Props = {
  userId: string
  postId: string
  postPrompt: string | null
}

@injectable()
export class UpdatePostCommand {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(props: Props) {
    try {
      const post = await this.postRepository.find(new Id(props.postId))

      if (post instanceof Error) {
        return new Error()
      }

      if (post === null) {
        return new Error()
      }

      const draftPost = post.updatePrompt(props.postPrompt)

      const transaction = await this.postRepository.persist(draftPost)

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
