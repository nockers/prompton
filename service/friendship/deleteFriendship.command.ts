import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id } from "core"
import { FriendshipRepository } from "infrastructure"

type Props = {
  followeeId: string
  followerId: string
}

@injectable()
export class DeleteFriendshipCommand {
  constructor(private friendshipRepository: FriendshipRepository) {}

  async execute(props: Props) {
    try {
      if (props.followerId === props.followeeId) {
        return new Error("自分自身をフォローすることは出来ません。")
      }

      const friendship = await this.friendshipRepository.find(
        new Id(props.followerId),
        new Id(props.followeeId),
      )

      if (friendship instanceof Error) {
        return new Error()
      }

      if (friendship === null) {
        captureException("データが見つからなかった。")
        return new Error()
      }

      const transaction = await this.friendshipRepository.unfollow(friendship)

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
