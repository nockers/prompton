import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Biography, Id, IdFactory, Name, UserProfileUpdatedEvent } from "core"
import { EventStore, UserRepository } from "infrastructure"

type Props = {
  userId: string
  userName: string
  userAvatarFileId: string | null
  userBiography: string
}

@injectable()
export class UpdateUserProfileCommand {
  constructor(
    private eventStore: EventStore,
    private userRepository: UserRepository,
  ) {}

  async execute(props: Props) {
    try {
      const user = await this.userRepository.find(new Id(props.userId))

      if (user === null) {
        return new Error()
      }

      if (user instanceof Error) {
        return new Error()
      }

      const event = new UserProfileUpdatedEvent({
        id: IdFactory.create(),
        userId: user.id,
        name: new Name(props.userName),
        biography: new Biography(props.userBiography),
        headerImageId: null,
        avatarImageURL: null,
        avatarImageId: props.userAvatarFileId
          ? new Id(props.userAvatarFileId)
          : null,
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
