import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Email, Id, IdFactory, Name, Url, UserCreatedEvent } from "core"
import { EventStore } from "infrastructure"

type Props = {
  userId: string
  userName: string
  userAvatarURL: string | null
  userEmail: string | null
}

@injectable()
export class CreateUserCommand {
  constructor(private eventStore: EventStore) {}

  async execute(props: Props) {
    try {
      const event = new UserCreatedEvent({
        id: IdFactory.create(),
        avatarImageURL:
          props.userAvatarURL !== null ? new Url(props.userAvatarURL) : null,
        email: props.userEmail ? new Email(props.userEmail) : null,
        name: new Name(props.userName),
        userId: new Id(props.userId),
      })

      await this.eventStore.commit(event)

      return { userId: event.id.value }
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
