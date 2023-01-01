import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, RequestCreatedEvent } from "core"
import { EventStore } from "infrastructure"

type Props = {
  senderId: string
  recipientId: string
  note: string
  fee: number
  planId: string | null
}

@injectable()
export class CreateRequestCommand {
  constructor(private eventStore: EventStore) {}

  async execute(props: Props) {
    try {
      const requestId = IdFactory.create()

      const event = new RequestCreatedEvent({
        id: IdFactory.create(),
        commission: 0,
        recipientId: new Id(props.recipientId),
        senderId: new Id(props.senderId),
        fee: props.fee,
        note: props.note,
        fileIds: [],
        folderId: null,
        paymentId: null,
        planId: props.planId !== null ? new Id(props.planId) : null,
        requestId: requestId,
        title: null,
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
