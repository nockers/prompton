import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, UserRequestSettingsUpdatedEvent } from "core"
import { EventStore, UserRepository } from "infrastructure"

type Props = {
  userId: string
  userIsRequestable: boolean
  userIsRequestableForFree: boolean
  userMaximumFee: number
  userMinimumFee: number
}

@injectable()
export class UpdateUserRequestSettingsCommand {
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

      const event = new UserRequestSettingsUpdatedEvent({
        id: IdFactory.create(),
        userId: user.id,
        isRequestable: props.userIsRequestable,
        isRequestableForFree: props.userIsRequestableForFree,
        maximumFee: props.userMaximumFee,
        minimumFee: props.userMinimumFee,
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
