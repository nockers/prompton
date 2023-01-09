import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, RequestMarkedAsCanceledBySenderEvent } from "core"
import { EventStore, RequestRepository } from "infrastructure"

type Props = {
  requestId: string
}

@injectable()
export class MarkRequestAsCanceledBySenderCommand {
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

      const event = new RequestMarkedAsCanceledBySenderEvent({
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
