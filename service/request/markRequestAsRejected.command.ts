import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, RequestMarkedAsRejectedEvent } from "core"
import { EventStore, RequestRepository } from "infrastructure"

type Props = {
  userId: string
  requestId: string
}

@injectable()
export class markRequestAsRejectedCommand {
  constructor(
    private requestRepository: RequestRepository,
    private eventStore: EventStore,
  ) {}

  async execute(props: Props) {
    try {
      const request = await this.requestRepository.find(new Id(props.requestId))

      if (request instanceof Error) {
        return new Error()
      }

      if (request === null) {
        return new Error()
      }

      if (request.recipientId.value !== props.userId) {
        return new Error()
      }

      const event = new RequestMarkedAsRejectedEvent({
        id: IdFactory.create(),
        requestId: request.id,
        senderId: request.senderId,
        recipientId: request.recipientId,
      })

      await this.eventStore.commit(event)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
