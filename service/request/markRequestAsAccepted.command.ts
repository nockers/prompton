import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import {
  Id,
  IdFactory,
  PaymentCreatedEvent,
  RequestMarkedAsAcceptedEvent,
} from "core"
import { EventStore, RequestRepository, PaymentAdapter } from "infrastructure"

type Props = {
  userId: string
  requestId: string
}

@injectable()
export class markRequestAsAcceptedCommand {
  constructor(
    private requestRepository: RequestRepository,
    private eventStore: EventStore,
    private paymentAdapter: PaymentAdapter,
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

      const intent = await this.paymentAdapter.createCharge(
        request.senderId,
        request.fee,
      )

      if (intent instanceof Error) {
        return new Error()
      }

      const paymentId = IdFactory.create()

      const paymentEvent = new PaymentCreatedEvent({
        id: IdFactory.create(),
        amount: intent.amount,
        isError: false,
        paymentId: paymentId,
        purpose: "REQUEST_AUTHORIZE",
        transactionId: intent.id,
        userId: request.senderId,
        requestId: request.id,
      })

      await this.eventStore.commit(paymentEvent)

      const event = new RequestMarkedAsAcceptedEvent({
        id: IdFactory.create(),
        requestId: request.id,
        senderId: request.senderId,
        recipientId: request.recipientId,
        paymentId: paymentId,
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
