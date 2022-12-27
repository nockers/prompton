import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { FriendshipDeletedEvent, Id, IdFactory } from "core"
import { EventStore, FriendshipRepository } from "infrastructure"

type Props = {
  followeeId: string
  followerId: string
}

@injectable()
export class DeleteFriendshipCommand {
  constructor(
    private eventStore: EventStore,
    private friendshipRepository: FriendshipRepository,
  ) {}

  async execute(props: Props) {
    try {
      if (props.followerId === props.followeeId) {
        return new Error("自分自身をフォローすることは出来ません。")
      }

      const friendship = await this.friendshipRepository.findByUserId(
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

      const event = new FriendshipDeletedEvent({
        id: IdFactory.create(),
        friendshipId: friendship.id,
        userId: friendship.followeeId,
        followeeId: friendship.followeeId,
        followerId: friendship.followerId,
      })

      await this.eventStore.commit(event)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
