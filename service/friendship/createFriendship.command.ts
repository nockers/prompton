import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { FriendshipEntity, Id, IdFactory } from "core"
import { FriendshipRepository } from "infrastructure"

type Props = {
  followeeId: string
  followerId: string
}

@injectable()
export class CreateFriendshipCommand {
  constructor(private friendshipRepository: FriendshipRepository) {}

  async execute(props: Props) {
    try {
      if (props.followerId === props.followeeId) {
        return new Error("自分自身をフォローすることは出来ません。")
      }

      const draftFriendship = new FriendshipEntity({
        followeeId: new Id(props.followeeId),
        followerId: new Id(props.followerId),
        id: IdFactory.create(),
      })

      const transaction = await this.friendshipRepository.follow(
        draftFriendship,
      )

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
