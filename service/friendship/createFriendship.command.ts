import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { FriendshipCreatedEvent, Id, IdFactory } from "core"
import { EventStore } from "infrastructure"

type Props = {
  followeeId: string
  followerId: string
}

@injectable()
export class CreateFriendshipCommand {
  constructor(private eventStore: EventStore) {}

  async execute(props: Props) {
    try {
      if (props.followerId === props.followeeId) {
        return new Error("自分自身をフォローすることは出来ません。")
      }

      const event = new FriendshipCreatedEvent({
        id: IdFactory.create(),
        friendshipId: IdFactory.create(),
        userId: new Id(props.followeeId),
        followerId: new Id(props.followerId),
      })

      await this.eventStore.commit(event)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
